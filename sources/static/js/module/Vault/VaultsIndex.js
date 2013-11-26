Vaultier.VaultsIndexRoute = Ember.Route.extend({

    workspace: null,

    model: function (params, queryParams) {
        var workspace = this.modelFor('Workspace');

        // retrieve vaults
        var store = this.get('store');
        return store.find('Vault', {workspace: workspace.get('id')});
    },

    setupController: function (ctrl, vaults) {
        ctrl.set('content', vaults);

        // retrieve workspace
        var workspace = this.modelFor('Workspace');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addText('Dashboard')
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
