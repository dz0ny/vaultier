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

    init: function () {
        this._super();
//        Raven.config('http://df6466226ad14775b23818b42df3a5c8@sentry.rclick.cz/5', {
//            whitelistUrls: []
//        }).install();
    },

    parseError: function (error) {
        var data = {
            title: 'Oooups! Something wrong happen here',
            message: 'Fatal error',
            template: 'ErrorGeneric',
            error: error
        }

        if (error && (error.message || error.detail)) {
            data.message = error.message || error.detail
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

    consoleError: function(error, level) {
        level = level || 'error';
        // log error
        if (error.stack) {
            console[level](error.stack)
        } else {
            console[level](error);
        }

    },

    renderError: function (error) {
        var ctrl = this.get('errorController')
        var data = this.parseError(error)
        ctrl.set('error', error)
        ctrl.set('content', data)

        var router = this.get('router');
        var errorRoute = this.get('errorRoute')
        router.intermediateTransitionTo(errorRoute)
        ApplicationLoader.hideLoader()
    },

    logError: function (error) {
        var c = this.get('container');

        this.consoleError(error);

        // capture user
//        Raven.setUser(null)
//        var auth = c.lookup('service:auth');
//        var user;
//        if (auth && (user = auth.get('user'))) {
//            user = {
//                email: user.get('email'),
//                id: user.get('id')
//            }
//            Raven.setUser(user)
//        }
//        // capture current path
//        var a = c.lookup('controller:application')
//        var currentPath = '';
//        if (a) {
//            currentPath = a.get('currentPath')
//        }
//
//        //capture tags
//        var tags = {}
//        tags['type'] = error.type;
//        tags['errorDuringRendering'] = this.get('rendering')
//        tags['currentPath'] = currentPath
//
        //Raven.captureException(error, {extra: tags});
    },

    processError: function (error) {
        try {
            this.logError(error)
        } catch (e) {
            console.error('--CANNOT-CAPTURE-ERROR')
            console.log(e.stack)
        }
        try {
            this.renderError(error)
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--');
            console.error(e.stack);
        }
    }


})