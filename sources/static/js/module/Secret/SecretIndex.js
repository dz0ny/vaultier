Vaultier.SecretRoute = Ember.Route.extend({

    model: function (params) {
        return this.get('store').find('Card', params.card)
    },

    afterModel: function (card) {
        Service.Environment.current().set('card', card);
    },

    serialize: function (card) {
        return {
            card: card.get('id')
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

        // retrieve card
        var card = this.modelFor('card');
        this.set('card', card);
        ctrl.set('card', card);
        // set breadcrumbs
        ctrl.set('breadcrumbs',
            Vaultier.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addWorkspace()
                .addVault()
                .addCard()
                .addText('Detail')
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
    card: null,

});


Vaultier.SecretIndexView = Ember.View.extend({
    templateName: 'Secret/SecretIndex',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.SecretIndexItemView = Ember.View.extend({
    templateName: 'Secret/SecretIndexItem'
});
