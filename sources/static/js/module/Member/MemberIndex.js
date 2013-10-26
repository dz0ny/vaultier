Vaultier.MemberIndexRoute = Ember.Route.extend({

    model: function (params, transition) {
        var workspace = this.modelFor('Vault');
        var card = null;
        var vault = null;

        var store = this.get('store')

        var queries = {
            workspace: null,
            workspaceRoles: null,
            vault: null,
            vaultRoles: null,
            card: null,
            cardRoles: null
        };

        if (workspace) {
            queries.workspace = workspace
            queries.workspaceRoles = store.find('Role', {
                to_workspace: workspace.get('id')
            })

        }
        // add more queries

        var models = Ember.RSVP.hash(queries);

        return models;
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

        if (models.workspace) {
            blocks.push(Ember.Object.create({
                type: 'workspace',
                object: models.workspace,
                roles: models.workspaceRoles
            }));

            ctrl.set('blocks', blocks)
        }

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
    workspaces: null,
    vaults: null,
    cards: null
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

    }),

    didInsertElement: function () {
        $(document).ready(function () {
            $('body [data-toggle=tooltip]').tooltip();
        })
    }
});
