import Object from './../../bower_components/uberproto/dist/proto.js';

export default Object.extend({

  modules: [],

  triggerKernelEvent: function(event, data) {
    for (var k in this.modules) {
      if (this.modules.hasOwnProperty(k)) {
        var obj = this.modules[k];
        obj.onKernelEvent(event, data);
      }
    }
  },

  getModule: function(name) {

    var m = this.modules[name];
    if (!m) {
      throw new Error('Requested module %name is not registered'.replace('%name', name));
    }
    return m;
  },

  load: function() {
    for (var k in this.modules) {
      if (this.modules.hasOwnProperty(k)) {
        var obj = this.modules[k];
        obj.load(this);

      }
    }
  }

});
