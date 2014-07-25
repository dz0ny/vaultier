Vaultier.VaultsIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, queryParams) {
            var workspace = this.modelFor('Workspace');
            var store = this.get('store');

            // retrieve vaults
            var vaults = store.find('Vault', {workspace: workspace.get('id')});

            // load memberships
            var memberships = store
                .find('Role', {to_workspace: workspace.get('id') })
                .then(function (memberships) {
                    return memberships.toArray()
                });

            // return promise for all requests
            return Ember.RSVP.hash({
                vaults: vaults,
                memberships: memberships
            });
        },

        setupController: function (ctrl, model) {
            // set model
            ctrl.set('content', model.vaults);
            ctrl.set('memberships', model.memberships);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
            )
        }

    });

Vaultier.VaultsIndexController = Ember.ArrayController.extend({
    breadcrumbs: null
});


Vaultier.VaultsIndexView = Ember.View.extend({
    templateName: 'Vault/VaultsIndex',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/VaultsIndexItem'
});
