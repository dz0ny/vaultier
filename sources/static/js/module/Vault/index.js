Vaultier.VaultIndexRoute = Ember.Route.extend({



    actions: {
        create: function () {
            var record = this.get('store').createRecord('vault');
            var controller = this.controllerFor('VaultCreate');

            controller.openModal({
                record: record,
                route: this
            })
        }
    },
    setupController: function (ctrl) {
        ctrl.set('breadcrumbs',
            Vaultier.utils.Breadcrumbs.create()
                .addCurrentWorkspace()
                .addLink('VaultIndex', 'List of vaults')
        )
    },

    model: function (params, queryParams) {
        return Vaultier.Services.Context.ContextService.current().executeRoute(this, params, queryParams).then(function () {
            var store = this.get('store');
            return store.find('Vault');
        }.bind(this));
    }
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
    templateName: 'Vault/Index',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.VaultListController
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/IndexItem'
});
