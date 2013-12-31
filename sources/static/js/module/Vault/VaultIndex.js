Vaultier.VaultRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var model = this.get('store').find('Vault', params.vault )
            return model;
        },

        afterModel: function (vault) {
            Service.Environment.current().set('vault', vault);
        },

        serialize: function (model) {
            // primitives
            if (typeof model == 'string' || typeof model == 'number') {
                return model
            }

            return {
                vault: model.get('id')
            }
        }

    });

Vaultier.VaultIndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('Cards.index')
    }
})
