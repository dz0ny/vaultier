/**
 * @todo: use some more prety way
 * @todo: document this class
 * namespace(Vaultier, Test);
 */
Vaultier.Test = Ember.Namespace.create();

Vaultier.Test.cases = [];

Vaultier.Test.createTest = function (fn) {
    Vaultier.Test.cases.push(fn);
}

Vaultier.Test.runTests = function () {
    // create qunit div
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

    // prepare ember for testing
    Ember.testing = true;
    Vaultier.setupForTesting();
    Vaultier.injectTestHelpers();

    // run tests
    Vaultier.Test.cases.forEach(function (test) {
        test();
    });
}