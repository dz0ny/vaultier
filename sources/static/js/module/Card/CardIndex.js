Vaultier.CardRoute = Ember.Route.extend({

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

Vaultier.CardIndexRoute = Ember.Route.extend({

    setupController: function (ctrl, model) {
        ctrl.set('content', model);


        // retrieve workspace
        var workspace = this.modelFor('Vault');
        this.set('workspace', workspace);
        ctrl.set('workspace', workspace);

        // retrieve vault
        var vault = this.modelFor('Card');
        this.set('vault', vault);
        ctrl.set('vault', vault);

        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addText('List of cards')
        )
    },

    model: function (params, queryParams) {
        var store = this.get('store');
        return store.find('Card');
    }
});


Vaultier.CardIndexController = Ember.ArrayController.extend({
    workspace: null,
    vault: null,
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createCard: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.CardIndexView = Ember.View.extend({
    templateName: 'Card/CardIndex',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.CardListController
});


Vaultier.CardIndexItemView = Ember.View.extend({
    templateName: 'Card/CardIndexItem'
});
