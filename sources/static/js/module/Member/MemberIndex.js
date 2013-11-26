Vaultier.MemberIndexRoute = Ember.Route.extend(
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
                    url: this.get('router').generate('Vault.memberIndex', models.vault),
                    object: models.vault,
                    roles: models.vaultRoles
                }));
            }

            if (models.workspace) {
                blocks.push(Ember.Object.create({
                    type: 'workspace',
                    url: this.get('router').generate('Workspace.memberIndex', models.workspace),
                    object: models.workspace,
                    roles: models.workspaceRoles
                }));
            }


            ctrl.set('content', blocks)

            // setup roles
            ctrl.set('roleLevels', this.setupRoleLevels());

            // set invite route
            ctrl.setProperties(this.setupInviteRoute(models));

            // set breadcrumbs
            ctrl.set('breadcrumbs', this.setupBreadcrumbs(models))
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('MemberIndex', {controller: this.get('controller')})
        },


        actions: {
            deleteRole: function (role, block) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    role.deleteRecord();
                    role.save().then(
                        function () {
                            block.roles.removeObject(role);
                            $.notify('User \'s permission has been removed.', 'success');
                        },
                        function () {
                            $.notify('Oooups! Something went wrong.', 'error');
                        }
                    )
                });


            },

            changeRole: function (role, block) {
                role.save().then(
                    function () {
                        $.notify('User \'s permission has been updated.', 'success');
                    },
                    function () {
                        role.rollback();
                        $.notify('Oooups! Something went wrong.', 'error');
                    }
                )
            }
        }



    });

Vaultier.MemberIndexController = Ember.Controller.extend({
    blocks: function () {
        return this.get('content').map(function (item, index) {
            item.setProperties({
                index: index,
                isSecond: index == 1,
                isHidden: item.roles.get('length') == 0 && index > 0,
                readOnly: index > 0
            })

            return item
        });
    }.property('content.@each')
});

Vaultier.MemberIndexView = Ember.View.extend({
    templateName: 'Member/MemberIndex',
    layoutName: 'Layout/LayoutStandard',


    Item: Ember.View.extend({
        tagName: 'tr',
        Select: Ember.Select.extend({

            didInsertElement: function () {
                this.addObserver('value', this, function () {
                    this.get('controller').send('changeRole', this.get('role'), this.get('block'));
                })
            }
        })
    })

});

