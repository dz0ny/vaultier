Po.NS('Service');

Service.Errors = Ember.Object.extend({

    /**
     * @DI router
     */
    router: null,
    errorController: null,
    errorRoute: 'ErrorGeneric',


    transitionTo: function (route, replaceAddressBar) {
        var router = this.get('router');
        var url = router.generate(route).replace('#', '')
        Ember.run.join(router, function () {
            if (replaceAddressBar) {
                this.replaceURL(url)
            } else {
                this.handleURL(url);
            }
        });
    },

    renderError: function (error, transition) {
        if (transition) {
            transition.abort()
        }
        this.get('errorController').set('error', error);
        this.transitionTo(this.get('errorRoute'));
    },


    logError: function (error) {
        console.error(error.stack);
    },

    register: function () {
        var self = this;

        var renderError = function (error) {
            try {
                self.renderError(error)
            } catch (e) {
                console.error('--CANNOT-RENDER-ERROR--');
                console.error(e.stack);
            }
        };

        var logError = function (error) {
            self.logError(error)
        }


        Ember.RSVP.configure('onerror', function (error) {
            logError(error)
            renderError(error)
        });

        Ember.Router.reopenClass({
            _defaultErrorHandler: function (error, transition) {
                this._super(error, transition)
                logError(error)
                renderError(error)
            }
        })

        Ember.onerror = function (error) {
            logError(error)
            renderError(error);
        }

    }


})