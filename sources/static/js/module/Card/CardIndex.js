Vaultier.CardRoute = Ember.Route.extend(
    {

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var model = this.get('store')
                .find('Card', params.card)
                .then(function (model) {
                    if (model.get('vault') != vault.get('id')) {
                        var error = new Error();
                        error.status = 404
                        throw error
                    }
                    return model
                })

            return model;
        },

        actions: {
            deleteCard: function (card) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = card
                        .deleteRecord()
                        .then(
                            function () {
                                $.notify('Your card has been successfully deleted.', 'success');
                                this.transitionTo('Cards.index', this.get('vault'));
                            }.bind(this),
                            function (error) {
                                card.rollback();
                                $.notify('Oooups! Something went wrong.', 'error');
                            }.bind(this)
                        );
                    ApplicationLoader.promise(promise)
                }.bind(this));
            }
        },

        afterModel: function (card) {
            Service.Environment.current().set('card', card);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                card: model.get('slug')
            }
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Secret.index')
    }
})
