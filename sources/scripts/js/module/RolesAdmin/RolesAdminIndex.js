Vaultier.RolesAdminIndexRoute = Ember.Route.extend(
    {

        inviteObject: null,

        model: function (params, transition) {
            // setup invite data
            this.setProperties(this.setupInviteData(params))

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.get('inviteObject.perms.invite')
            }.bind(this), true)) {
                return;
            }

            // do lookup
            var blocks = this.setupBlocks();
            var workspace = this.modelFor('Workspace');
            var vault = this.modelFor('Vault');
            var card = this.modelFor('Card');

            var store = this.get('store')

            var queries = {
                workspace: null,
                workspaceRoles: null,
                vault: null,
                vaultRoles: null,
                card: null,
                cardRoles: null
            };

            if (blocks.workspace) {
                queries.workspace = workspace
                queries.workspaceRoles = store.find('Role', {
                    to_workspace: workspace.get('id')
                })
            }

            if (blocks.vault) {
                queries.vault = vault
                queries.vaultRoles = store.find('Role', {
                    to_vault: vault.get('id')
                })
            }

            if (blocks.card) {
                queries.card = card
                queries.cardRoles = store.find('Role', {
                    to_card: card.get('id')
                })
            }

            var models = Ember.RSVP.hash(queries);

            return models;
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupBlocks: function () {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupInviteRoute: function (models) {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupInviteData: function (params) {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupRoleLevels: function () {
            return Vaultier.Role.proto().roles.toArray();
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupBreadcrumbs: function () {
            throw 'Please override this in your route'
        },

        setupController: function (ctrl, models) {
            var blocks = [];


            if (models.card) {
                blocks.push(Ember.Object.create({
                    url: null,
                    type: 'card',
                    object: models.card,
                    roles: models.cardRoles
                }));
            }

            if (models.vault) {
                blocks.push(Ember.Object.create({
                    type: 'vault',
                    url: this.get('router').generate('Vault.rolesAdminIndex', models.vault),
                    object: models.vault,
                    roles: models.vaultRoles
                }));
            }

            if (models.workspace) {
                blocks.push(Ember.Object.create({
                    type: 'workspace',
                    url: this.get('router').generate('Workspace.rolesAdminIndex', models.workspace),
                    object: models.workspace,
                    roles: models.workspaceRoles
                }));
            }


            ctrl.set('content', blocks)

            // setup roles
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('controller', this);

            // set invite route
            ctrl.setProperties(this.setupInviteRoute(models));

            // set breadcrumbs
            ctrl.set('breadcrumbs', this.setupBreadcrumbs(models))
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminIndex', {controller: this.get('controller')})
        },


        actions: {
            deleteRole: function (role, block) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = role
                        .deleteRecord()
                        .then(function () {
                            block.roles.removeObject(role);
                            $.notify('User \'s permission has been removed.', 'success');
                        })
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error)
                        }.bind(this))

                    ApplicationLoader.promise(promise)
                });


            },

            changeRole: function (role, block) {
                var promise = role
                    .saveRecord()
                    .then(function () {
                        $.notify('User \'s permission has been updated.', 'success');
                    })
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error)
                    }.bind(this))

                ApplicationLoader.promise(promise)
            }
        }



    });

Vaultier.RolesAdminIndexController = Ember.Controller.extend({
    currentObject: null,
    blocks: function () {
        var shownIndex = 0;
        return this.get('content').map(function (item, index) {
            var isHidden = item.roles.get('length') === 0 && index > 0;
            if (!isHidden) {
                shownIndex++;
            }
            if (index < 1) {
                this.set('currentObject', item.get('object'));
            }
            var isSecond = !isHidden && shownIndex === 2;

            item.setProperties({
                index: index,
                isSecond: isSecond,
                isHidden: isHidden,
                readOnly: index > 0
            });
            var roles = Utils.RolesProxy.create({
                content: item.roles
            });
            roles.filterCreateRolesByObjectScope(this.get('currentObject'));
            item.set('roles', roles.toArray());
            return item;
        }.bind(this));
    }.property('content.@each')
});


Vaultier.RolesAdminIndexView = Ember.View.extend({
    templateName: 'RolesAdmin/RolesAdminIndex',
    layoutName: 'Layout/LayoutStandard',

    AnimatedItemWrapper: Ember.View.extend({
        Item: Ember.View.extend({
            tagName: 'div',
            Select: Vaultier.SelectBox.extend({
                setDefaultValue: function() {
                    this.selectize.setValue(get(this, 'data.level'));
                },

                changeData: function (obj) {
                    var roleType = Vaultier.Role.proto().roles.getByValue(obj.value);
                    set(this, 'selection', roleType);
                    set(this, 'data.level', obj.value);
                    if (this.init) {
                        get(this, 'controller').send('changeRole', get(this, 'data'));
                    }
                }
            })
        }),
        animateOut: function (done) {
            EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
        }
    })

});

