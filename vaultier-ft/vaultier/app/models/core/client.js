/* global RL, Vaultier */

/**
 * Currently client is used as shortcut to call fetch and create methods. We should maintain it to ensure backwards compatibility with ember-data
 * But for our own code we should always use instance of adapters to retrieve data
 *
 * @deprectaed
 * @todo: remove all vaultier usage of this client (registered as store:main)
 *
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.Client
 */
export default RL.Client.create({



    createRecord: function (cls, data) {
       return this.get('container').lookupFactory('model:'+cls).create(data);
    },

    find: function () {
        var cls = arguments[0].toLowerCase();
        var params = arguments[1];
      try {
        return this.get('container').lookupFactory('model:'+cls).fetch(params);
      } catch (error) {
        console.error(`Cannot retrieve model ${cls}`);
        throw error;
      }
    }

});


