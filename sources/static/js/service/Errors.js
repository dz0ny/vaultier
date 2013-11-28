Po.NS('Service');

Service.Errors = Ember.Object.extend({

    /**
     * @DI ErrorController
     */
    errorController: null,

    /**
     * @DI ErrorView
     */
    errorView: null,
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

            var ctrl = this.get('errorController');
            var data = this.parseError(error)
            ctrl.set('error', error)
            ctrl.set('content', data)

            var view = this.get('errorView');
            view.set('controller', ctrl);
            view.appendTo($('body'));

            Ember.run.scheduleOnce('render', this, function () {
                this.set('rendering', false)
            });
        } else {
            console.error('FATAL ERROR - rendering of error in progress')
        }

    },


    logError: function (error) {
        if (!error.type) {
           error.type = 'Global.error';
        }
        console.error(error.stack);
        Raven.captureException(error);
    },

    processError: function (error) {
        this.logError(error);
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