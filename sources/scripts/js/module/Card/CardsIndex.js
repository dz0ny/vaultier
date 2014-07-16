Vaultier.CardsIndexRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var workspace = this.modelFor('Workspace');
            var store = this.get('store');

            // load cards
            var cards = store.find('Card', {vault: vault.get('id')});

            // load memberships
            var memberships = Ember.RSVP
                .hash({
                    to_workspace: store.find('Role', {to_workspace: workspace.get('id') }),
                    to_vault: store.find('Role', {to_vault: vault.get('id')})
                })
                .then(function (memberships) {
                    return [].concat(memberships.to_workspace.toArray(), memberships.to_vault.toArray());
                });

             // return promise for all requests
            return Ember.RSVP.hash({
                cards: cards,
                memberships: memberships
            });
        },

        setupController: function (ctrl, model) {
            var environment = this.get('environment');
            // set model
            ctrl.set('content', model.cards);
            ctrl.set('memberships', model.memberships);

            // retrieve workspace
            var workspace = this.modelFor('Workspace');
            this.set('workspace', workspace);
            ctrl.set('workspace', workspace);
            environment.set('workspace', workspace);

            // retrieve vault
            var vault = this.modelFor('Vault');
            this.set('vault', vault);
            ctrl.set('vault', vault);
            environment.set('vault', vault);

            // set breadcrumbs
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addWorkspace()
                    .addVault()
            );
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