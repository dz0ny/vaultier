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

        // set invite route
        ctrl.setProperties(this.setupInviteRoute(models));

        // set breadcrumbs
        ctrl.set('breadcrumbs', this.setupBreadcrumbs(models))
    },

    renderTemplate: function () {
        // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
        this.render('MemberIndex', {controller: this.get('controller')})
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

    didInsertElement: function () {
        $(document).ready(function () {
            $('body [data-toggle=tooltip]').tooltip();
        })
    }
});

