import Ember from 'ember';

/**
 * Basic class for creating mocks. It is recommended to extends this class for creating your own mocks
 *
 * @module mock
 * @class Vaultier.Mock.BaseMock
 * @extends Ember.Object
 */
export default Ember.Object.extend({

    /**
     * List of example data
     *
     * @property fixtures
     * @type Array
     */
    fixtures: [],

    /**
     * An abstract method which must be implemented. It is the start point for running mock
     *
     * @method run
     * @param {Ember.Application} app
     * @param {mixed} container
     */
    run: function (app, container) {
        throw new Error("This method should be implemented");
    },

    /**
     * Return one fixture from example data according to given id
     *
     * @method findById
     * @param {Number} id
     * @returns {*}
     */
    findById: function (id) {
        var fixtureToReturn = null;
        this.fixtures.forEach(function (fixture) {
            if (fixture.id === id) {
                fixtureToReturn = fixture;
            }
        });
        return fixtureToReturn;
    }

});
