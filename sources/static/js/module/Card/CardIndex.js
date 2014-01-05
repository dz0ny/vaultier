Vaultier.CardRoute = Ember.Route.extend(
    {

        model: function (params, transition) {
            var vault = this.modelFor('Vault');
            var model = this.get('store')
                .find('Card', params.card)
                .then(function (model) {
                    if (model.get('vault') != vault.get('pk')) {
                        var error = new Error();
                        error.status = 404
                        throw error
                    }
                    return model
                })

            return model;
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
                card: model.get('id')
            }
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('Secret.index')
    }
})
