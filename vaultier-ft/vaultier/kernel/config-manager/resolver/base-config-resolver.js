import BaseResolver from './../../application-loader/resolver/base-resolver.js';

export default BaseResolver.extend({

  notifyKernel: function (kernel, config) {
    kernel.triggerKernelEvent('config-manager:resolved', config);
  }

});


