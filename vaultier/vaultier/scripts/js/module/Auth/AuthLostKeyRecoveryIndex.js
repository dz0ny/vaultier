'use strict';

Vaultier.AuthLostKeyRecoveryRoute = Ember.Route.extend({

    model: function (params, transition) {
        var lostkey = this.get('store')
            .find('LostKey', {id: params.id, hash: params.hash})
            .then(function(response){
                response.set('hash', params.hash);
                return response;
            });

        return lostkey;
    },

    afterModel: function (model, transition) {
        this.transitionTo('AuthLostKeyRecovery.reset');
    }
});
