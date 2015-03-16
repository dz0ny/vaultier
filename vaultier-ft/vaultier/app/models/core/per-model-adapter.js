import Ember from 'ember';
/* global RL */

/**
 * Ensures all model classes has own adapter which is retrieved from container
 * as service adapter:<model-name>. This behaviour should be registered during initialization
 *
 * Only found this hacky way to do it, because Ember restless does not use factories:
 *
 * We need to install PerModelAdapter this "hacky" way. The installator need to
 * reopen RL.Model class and update "adapter" computed property just before any
 * custom model is inherited. Also the reopened code needs container to be used.
 * Only way found is to following used.
 *
 */
export default {

  appInstall: function () {
    RL.Model.reopenClass({
      adapter: Ember.computed(function () {
        var resourceName = Ember.get(this, 'resourceName');
        return RL.Model.getAdapterFromContainer(resourceName);
      })
    });
  },

  initializerInstall: function (container, application) {
    RL.Model.reopenClass({
      getAdapterFromContainer: function (resourceName) {
        var serviceName = 'adapter:' + resourceName.toLowerCase();
        var service = container.lookup(serviceName);
        if (!service) {
          throw new Error("Cannot find adapter for model '{rn}' as service '{sn}'".replace('{rn}', resourceName).replace('{sn}', serviceName));
        }
        return service;
      }
    });
  }
};
