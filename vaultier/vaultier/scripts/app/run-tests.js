ApplicationKernel.namespace('Vaultier.runner');

/**
 * Test application runner, Executes application in test mode
 *
 * To run application in test mode got to url /#/?environment=test
 *
 * @module vaultier-runner
 * @class Vaultier.runner.TestRunner
 */


Vaultier.runner.TestRunner = function () {

    // create qunit element
    $('<div id="qunit"></div>')
        .css({
            position: 'fixed',
            left: '0px',
            top: '0px',
            height: '100%',
            overflow: 'auto',
            'z-index': 10000000,
            width: '20%'
        })
        .appendTo('body');

    // qunit needs to be inited manually as loaded dynamically by loader
    QUnit.load();

    // prepare ember for testing
    Ember.testing = true;
    Vaultier.setupForTesting();
    Vaultier.injectTestHelpers();

    // start application
    Vaultier.advanceReadiness();
};

Vaultier.runner.TestRunner();