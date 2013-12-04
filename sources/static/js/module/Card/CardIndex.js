Vaultier.CardRoute = Ember.Route.extend(
    {

        model: function (params, transition) {
            var model = this.get('store').find('Card', params.card);
            return model;
        },

        afterModel: function (card) {
            Service.Environment.current().set('card', card);
        },

        serialize: function (model) {
            var slug = model.get('slug')
            if (!slug || slug=='') {
                slug = false
            }

            return {
                card: slug ? slug :  model.get('pk')
            }
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Secret.index')
    }
})
