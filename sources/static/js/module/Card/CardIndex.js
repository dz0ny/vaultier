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
        this._super(ctrl, model);
//
//        ctrl.set('env', Vaultier.Services.Context.ContextService.current());
//
//        ctrl.set('breadcrumbs',
//            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
//                .addHome()
//                .addCurrentWorkspace()
//                .addLink('CardIndex', 'List of cards', {workspace: '_env'})
//        )
    },

    model: function (params, queryParams) {
        var store = this.get('store');
        return store.find('Card');
    }
});


Vaultier.CardIndexController = Ember.ArrayController.extend({
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
