import RSVP from './../../../bower_components/rsvp/rsvp.js';
import BaseConfigResolver from './base-config-resolver.js';
import $ from './../../../bower_components/jquery/dist/jquery.min.js';

export default BaseConfigResolver.extend({

  name: null,

  init: function(options) {
    options = options || {};
    if (!options.name) {
      throw new Error('meta name must be specified');
    }
    this.name = options.name;
  },

  resolve: function(kernel) {
    var name = this.name;
    var selector = 'meta[name="'+this.name+'"]';
    var meta = $(selector);
    if (!meta.length) {
      throw new Error('Config element '+selector+' not found');
    }
    var config = JSON.parse(unescape(meta.attr('content')));
    this.notifyKernel(kernel, config);
    return RSVP.resolve();
  }

});
