/**
 * Test application runner, Executes application in test mode
 *
 * To run application in test mode got to url /#/?environment=test
 *
 * @module vaultier-runner
 * @class Vaultier.runner.TestRunner
 */

ApplicationKernel.namespace('Vaultier.runner');

Vaultier.runner.TestRunner = function () {
    Vaultier.Test.runTests();
};

Vaultier.runner.TestRunner();
