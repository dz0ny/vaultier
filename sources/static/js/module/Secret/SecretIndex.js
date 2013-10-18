Vaultier.SecretRoute = Ember.Route.extend({

    model: function (params) {
        return this.get('store').find('Vault', params.vault)
    },

    afterModel: function (vault) {
        Service.Environment.current().set('vault', vault);
    },

    serialize: function (vault) {
        return {
            vault: vault.get('id')
        }
    }

});

Vaultier.SecretIndexRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        ctrl.set('content', model);


        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Secret');
        this.set('vault', vault);
        ctrl.set('vault', vault);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addText('List of secrets')
        )
    },

    model: function (params, queryParams) {
        var store = this.get('store');
        return store.find('Secret');
    }
});


Vaultier.SecretIndexController = Ember.ArrayController.extend({
    workspace: null,
    vault: null,
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createSecret: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.SecretIndexView = Ember.View.extend({
    templateName: 'Secret/SecretIndex',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.SecretListController
});


Vaultier.SecretIndexItemView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItem'
});
