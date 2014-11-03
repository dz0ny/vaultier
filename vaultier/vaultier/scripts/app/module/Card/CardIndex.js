Vaultier.CardRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {
        beforeModel: function () {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var model = this.get('store')
                .find('Card', params.card)
                .then(function (model) {
                    if (model.get('vault') != vault.get('id')) {
                        var error = new Error();
                        error.status = 404;
                        throw error;
                    }
                    return model;
                });

            return model;
        },

        actions: {
            deleteCard: function (card) {
                var parentVault = this.modelFor('Vault');
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = card
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your card has been deleted successfully.', 'success');

                                this.transitionTo('Cards.index', parentVault);
                            }.bind(this),
                            function (error) {
                                card.rollback();
                                $.notify('Ooops! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationKernel.UI.showLoaderUponPromise(promise);
                }.bind(this));
            }
        },

        afterModel: function (card) {
            this.get('environment').set('card', card);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model;
            }

            return {
                card: model.get('slug')
            };
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Secret.index');
    }
});
