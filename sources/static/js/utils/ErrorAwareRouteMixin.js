Po.NS('Utils');

/**
 * When model error a
 *
 * Usage:
 *         model: function (params, transition) {
 *            var model = this.get('store').find('Card', 1)
 *                .then(null, this.handleErrors(transition));
 *
 *            return model;
 *        },
 */
Utils.ErrorAwareRouteMixin = Ember.Mixin.create({
    authenticatedRoute: function () {
        // todo: develop this method, this will use authentication to check if user is authenticated, othervise it will transitionToLogin
        return Ember.RSVP.Promise(function (resolve) {
            resolve();
        });
    },

    transitionToLogin: function (transition) {
        // todo: develop route, which user will go after login, this route will redirect to transition or index
        this.controllerFor('AuthTransition').set('transition', transition)
        this.transitionTo('AuthTransition');
    },

    handleErrors: function (transition) {
        return function (error) {
            console.error(error.message + '(' + error.status + ')');
            transition.abort();
            switch (error.status) {
                case 403 :
                {
                    this.render('Error403');
                    break;
                }
                case 401 :
                {
                    this.transitionToLogin(transition);
                    break;
                }
                default:
                    this.render('Error400');
            }
        }.bind(this);
    }

})