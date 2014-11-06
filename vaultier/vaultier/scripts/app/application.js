/**
 * Starting point for whole application. This script get loaded first, and creates Vaultier Ember.Application to be
 * platform for all Vaultier components. When application is ready ApplicationKernel decides which runner to use to execute the application.
 *
 * Currently there are two runners
 *  - run-default.js
 *  - run-tests.js
 *
 * @module vaultier-application
 * @main vaultier-application
 * @class Vaultier
 *
 */

/**************************************************
 **************************************************
 * Emberjs initialization
 **************************************************
 **************************************************
 */

Ember.FEATURES["query-params"] = true
Ember.MODEL_FACTORY_INJECTIONS = true;

/**************************************************
 **************************************************
 * Application initialization
 **************************************************
 **************************************************
 */

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true,

    ready: function () {
        // ready should be empty use initializers instead
    }
});

/**************************************************
 **************************************************
 * Namespace normalizations
 **************************************************
 **************************************************
 */

Vaultier.AnimatedIfView = EmberExt.AnimatedIf.AnimatedIfView;
Vaultier.AnimatedUnlessView = EmberExt.AnimatedIf.AnimatedUnlessView;

/**************************************************
 **************************************************
 * Defer application execution in favor of runner
 * see vaultier-runner module
 **************************************************
 **************************************************
 */

Vaultier.deferReadiness();


