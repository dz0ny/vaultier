Vaultier.CardRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {
            var model = this.get('store').find('Vault', params.vault)
            model.then(null, this.handleErrors(transition));
            return model;
        },

        afterModel: function (vault) {
            Service.Environment.current().set('vault', vault);
        },

        serialize: function (vault) {
            return {
                vault: vault.get('id')
            }
        },

        renderTemplate: function() {
            console.log('a');
            this.render('error404');
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

    model: function (params, transition, queryParams) {
        var store = this.get('store');
        return store.find('Card');
    },

    actions: {
        deleteVault: function (vault) {
            vault.deleteRecord();

            vault.save().then(
                function () {
                    $.notify('Your vault has been successfully deleted.', 'success');
                    this.transitionTo('Vault.index', this.get('workspace').get('id'));
                }.bind(this),
                function (error) {
                    card.rollback();
                    $.notify('Oooups! Something went wrong.', 'error');
                }.bind(this)
            );
        }

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