ApplicationKernel.namespace('Vaultier.dal.core');

/**
 *
 * Ember restless extensions
 *
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.BetterRestless
 */
Vaultier.dal.core.BetterRestless = {

    /**
     * Ensures all model classes has own adapter which is retrieved from container
     * as service adapter:<model-name>. This behaviour should be registered during initialization
     * by calling method init
     *
     * @method initAdapterAsService
     */
    initAdapterAsService: function () {
        RL.Model.reopenClass({

            adapter: Ember.computed(function () {
                var resourceName = Ember.get(this, 'resourceName');
                var serviceName = 'adapter:' + resourceName.toLowerCase();
                var service = Vaultier.__container__.lookup(serviceName);
                if (!service) {
                    throw new Error("Cannot find adapter for model '{rn}' as service '{sn}'".replace('{rn}', resourceName).replace('{sn}', serviceName));
                }
                return service;
            })
        })
    },

    /**
     * because of resourceName function on model detecting resourceName by class name we have to create subnamespace by ApplicationKernel
     *
     * resourceName is not detected properly in case Vaultier.dal.model is not created by Ember.Namespace.create(); See resourceName function:
     *
     * resourceName: Ember.computed(function () {
     *     var classNameParts = this.toString().split('.');
     *        return classNameParts[classNameParts.length - 1];
     * }),
     *
     * without this hack we would define resourceName manualy for each model
     *
     * @method initNamespacedModels
     */
    initNamespacedModels: function () {
        ApplicationKernel.namespace('Vaultier.dal');
        Vaultier.dal.model = Ember.Namespace.create();

    }

};

Vaultier.dal.core.BetterRestless.initAdapterAsService();
Vaultier.dal.core.BetterRestless.initNamespacedModels();