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
            var slug = model.get('slug')
            if (!slug || slug=='') {
                slug = false
            }
            return {
                vault: slug ? slug :  model.get('pk')
            }
        }

    });

Vaultier.VaultIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Cards.index')
    }
})
