Vaultier.VaultRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {
            var promise = this.get('store').find('Workspace', params.workspace);
            promise.then(null, this.handleErrors(transition))

            return promise;
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

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addText('List of vaults')
        )


    }

});


Vaultier.VaultIndexController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    breadcrumbs: null,
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
