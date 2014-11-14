ApplicationKernel.namespace('Vaultier.Mock');

/**
 * Manager which hold registered mocks. You can also run mocks using him.
 *
 * @module mock
 * @class Vaultier.Mock.MockManager
 */
Vaultier.Mock.MockManager = {

    /**
     * List of registered mocks
     *
     * @property mocks
     * @type Array
     */

    mocks: [],

    /**
     * Register mock for later running
     *
     * @method registerMock
     * @param {Vaultier.Mock.BaseMock} mock
     */
    registerMock: function(mock) {
        this.mocks.push(mock);
    },

    /**
     * Run all mocks
     *
     * @method runMocks
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    runMocks: function(app, container) {
        this.mocks.forEach(function(mock) {
           mock.run();
        });
    }

}