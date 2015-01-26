ApplicationKernel.namespace('Utils');

/**
 * Wrapper for logging message. It use loglevel
 *
 * @type {{log: null, init: init}}
 */
Utils.Logger = {

    log: null,

    init: function () {
        if (ApplicationKernel.Config.environment != 'dev') {
            this.log = {
                trace: function (msg) {

                },
                debug: function (msg) {

                },
                info: function (msg) {

                },
                warn: function (msg) {

                },
                error: function (msg) {

                }
            };
        } else {
            log.enableAll();
            this.log = log;
        }

    }

};

Utils.Logger.init();
