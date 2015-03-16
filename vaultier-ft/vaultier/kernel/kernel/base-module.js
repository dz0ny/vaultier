import Object from './../../bower_components/uberproto/dist/proto.js';

export default Object.extend({

  onKernelEvent: function(name, data) {
    // override for custom implementation
  },

  load: function() {
      throw new Error('Implement me');
  }

});
