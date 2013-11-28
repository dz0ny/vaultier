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
        Ember.run.next(router, function () {
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

    processError: function (error) {
        this.logError(error);
        try {
            // rendering must be done outside ember
//                this.renderError(error)
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--');
            console.error(e.stack);
        }
    },

    register: function () {
        var self = this;

        Ember.RSVP.configure('onerror', function (error) {
            console.log('Ember.RSVP.error');
            self.processError(error)
        });

        Ember.Router.reopenClass({
            _defaultErrorHandler: function (error, transition) {
//                this._super(error, transition)
                console.log('Ember.Router.error');
                self.processError(error)
            }
        })

        Ember.onerror = function (error) {
               console.log('Ember.error');
            self.processError(error)
        }

    }


})