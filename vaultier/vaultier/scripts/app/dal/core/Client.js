ApplicationKernel.namespace('Vaultier.dal.core');

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
Vaultier.dal.core.Client = RL.Client.create({

    createRecord: function (cls, data) {
        return Vaultier.dal.model[cls].create(data);
    },

    find: function () {
        var model = arguments[0];
        var params = arguments[1];
        return Vaultier.dal.model[model].fetch(params)
    }

});


