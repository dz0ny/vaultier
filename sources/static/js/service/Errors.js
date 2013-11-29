Po.NS('Service');

Service.Errors = Ember.Object.extend({

    /**
     * @DI ErrorController
     */
    errorController: null,

    /**
     * @DI router:main
     */
    router: null,
    errorRoute: 'ErrorGeneric',

    rendering: false,

    parseError: function (error) {
        var data = {
            title: 'Oooups! Something wrong happen here',
            message: 'Fatal error',
            template: 'ErrorGeneric'
        }

        if (error && error.message) {
            data.message = error.message
        }

        if (error && error.title) {
            data.title = error.title
        }

        if (error && error.status == 403) {
            data.title = 'Access denied!';
            data.message = 'You do not have access to desired area'
        }

        if (error && error.status == 404) {
            data.template = 'Error404'
        }

        return data
    },


    renderError: function (error) {
        if (!this.get('rendering')) {

            this.set('rendering', true)

            var ctrl = this.get('errorController')
            var data = this.parseError(error)
            ctrl.set('error', error)
            ctrl.set('content', data)

            var router = this.get('router');
            var errorRoute = this.get('errorRoute')
            var url = router.generate(errorRoute).replace('#', '')
            router.handleURL(url)
        } else {
            console.error('FATAL ERROR - rendering of error in progress')
        }

    },


    logError: function (error) {
        if (!error.type) {
            error.type = 'Global.error';
        }
        console.error(error.stack);

        if (!error.status) {
            try {
                var c = this.get('container');

                // capture user
                Raven.setUser(null)
                var auth = c.lookup('service:auth');
                var user;
                if (auth && (user = auth.get('user'))) {
                    user = {
                        email: user.get('email'),
                        id: user.get('id')
                    }
                    Raven.setUser(user)
                }
                // capture current path
                var a = c.lookup('controller:application')
                var currentPath = '';
                if (a) {
                    currentPath = a.get('currentPath')
                }

                //capture tags
                var tags = {}
                tags['type'] = error.type;
                tags['errorDuringRendering'] = this.get('rendering')
                tags['currentPath'] = currentPath


            } catch (e) {
                console.error('Ignored error during capturing');
                console.error(e.stack);
            }
        }


        Raven.captureException(error, {extra: tags});
        console.log('Captured error' + error.type);
    },

    processError: function (error) {
        try {
            this.logError(error)
        } catch (e) {
            console.error('--CANNOT-CAPTURE-ERROR')
        }
        try {
            this.renderError(error)
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--');
            console.error(e.stack);
        }
    },

    setupRaven: function () {


        Raven.config('http://df6466226ad14775b23818b42df3a5c8@sentry.rclick.cz/5', {
            whitelistUrls: []
        }).install();
    },

    register: function () {
        this.setupRaven()

        var self = this;

        Ember.RSVP.configure('onerror', function (error) {
            error.type = 'Ember.RSVP.onerror';
            self.processError(error)
        });

        Ember.Router.reopenClass({
            _defaultErrorHandler: function (error, transition) {
                this._super(error, transition)
                error.type = 'Ember.Router._defaultErrorHandler';
                self.processError(error)
            }
        })

        Ember.onerror = function (error) {
            error.type = 'Ember.onerror';
            self.processError(error)
        }

    }


})