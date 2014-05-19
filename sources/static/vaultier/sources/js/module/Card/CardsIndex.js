Vaultier.CardsIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var store = this.get('store');
            return store.find('Card', {vault: vault.get('id')});
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);

            // retrieve vault
            var vault = this.modelFor('Vault');
            this.set('vault', vault);
            ctrl.set('vault', vault);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addWorkspace()
                    .addVault()
            )
        }


    });


Vaultier.CardsIndexController = Ember.ArrayController.extend({
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


Vaultier.CardsIndexView = Ember.View.extend({
    templateName: 'Card/CardsIndex',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.CardListController
});


Vaultier.CardsIndexItemView = Ember.View.extend({
    templateName: 'Card/CardsIndexItem'
});