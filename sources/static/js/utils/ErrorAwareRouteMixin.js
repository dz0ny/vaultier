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

    transitionToLogin: function (transition) {
        // todo: develop route, which user will go after login, this route will redirect to transition or index
//        this.controllerFor('AuthTransition').set('transition', transition)
//        this.transitionTo('AuthTransition');
        this.transitionTo('AuthLogin');
    },

    handleErrors: function (transition) {
        return function (error) {
            transition.abort();

            console.error('Handled model error --' + error.status + '-- (' + error.message + ')');

            var showError = function (url) {
                Ember.run.join(transition.router, function () {
                    this.handleURL(url);
                });
            }

            switch (error.status) {
                case 403 :
                {
                    showError('/errors/error-403');
                    break;
                }
                case 404 :
                {
                    showError('/errors/error-404');
                    break;
                }
                case 401 :
                {
                    this.transitionToLogin(transition);
                    break;
                }
                default:
                {
                    showError('/errors/error-400');
                    break;
                }
            }
        }.bind(this);
    }

})