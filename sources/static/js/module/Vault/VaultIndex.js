Vaultier.VaultRoute = Ember.Route.extend({

    model: function (params) {
        return this.get('store').find('Workspace', params.workspace)
    },

    afterModel: function (workspace) {
        Service.Environment.current().set('workspace', workspace);
    },

    deactivate: function () {
        Service.Environment.current().set('workspace', null);
    },

    serialize: function (model) {
        return {
            workspace: model.get('id')
        }
    }

});

Vaultier.VaultIndexRoute = Ember.Route.extend({

    workspace: null,

    model: function (params, queryParams) {
        // retrieve vaults
        var store = this.get('store');
        return store.find('Vault');
    },

    setupController: function (ctrl, vaults) {
        ctrl.set('content', vaults);

        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);
    },

});


Vaultier.VaultIndexController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createVault: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.VaultIndexView = Ember.View.extend({
    templateName: 'Vault/VaultIndex',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.VaultListController
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/VaultIndexItem'
});
