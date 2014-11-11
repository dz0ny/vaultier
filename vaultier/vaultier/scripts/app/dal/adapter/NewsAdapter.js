ApplicationKernel.namespace('Vaultier.dal.adapter');

/**
 * @module vaultier-dal-adapter
 * @class Vaultier.dal.adapter.News
 * @extends RL.Model
 */
Vaultier.dal.adapter.NewsAdapter = Vaultier.dal.core.RESTAdapter.extend({
    pluralize: function (resourceName) {
        return resourceName;
    }
})
