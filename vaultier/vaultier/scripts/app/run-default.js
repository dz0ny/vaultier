/**
 * Runner are executed by kernel depending on selected kernel environment. Currently there are these runners
 *
 * - run-default.js
 * - run-test.js
 *
 * @module vaultier-runner
 * @main vaultier-runner
 *
 */

ApplicationKernel.namespace('Vaultier.runner');

/**
 * Default application runner, Executes application in default mode - shows Vaultier UI
 *
 * To run application in test mode got to url "/#/".
 *
 * @class Vaultier.runner.DefaultRunner
 */

Vaultier.runner.DefaultRunner = function () {
    Vaultier.advanceReadiness();
};

Vaultier.runner.DefaultRunner();

