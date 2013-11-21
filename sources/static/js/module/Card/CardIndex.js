Vaultier.CardRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {

        model: function (params, transition) {
            var model = this.get('store').find('Card', params.card);
            model.then(null, this.handleErrors(transition));
            return model;
        },

        afterModel: function (card) {
            Service.Environment.current().set('card', card);
        },

        serialize: function (card) {
            return {
                card: card.get('id')
            }
        }
    });

Vaultier.CardIndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Secret.index')
    }
})
