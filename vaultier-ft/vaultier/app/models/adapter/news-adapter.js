import Ember from 'ember';
import RESTAdapter from './../core/rest-adapter';

/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.News
 * @extends RL.Model
 */
export default RESTAdapter.extend({
    pluralize: function (resourceName) {
        return resourceName;
    }
});
