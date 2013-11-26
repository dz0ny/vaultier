Vaultier.VaultRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var model = this.get('store').find('Vault', params.vault )
            return model;
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

Vaultier.VaultIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Cards.index')
    }
})
