Po.NS('Utils');

/**
 * @deprecated
 */
Utils.ErrorAwareRouteMixin = Ember.Mixin.create({

    transitionToLogin: function (transition) {
        // todo: develop route, which user will go after login, this route will redirect to transition or index
//        this.controllerFor('AuthTransition').set('transition', transition)
//        this.transitionTo('AuthTransition');
        this.transitionTo('AuthLogin');
    },



})