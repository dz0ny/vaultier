import BaseModule from './../kernel/base-module';
import RSVP from './../../bower_components/rsvp/rsvp.js';
/* global document */

export default BaseModule.extend({

  config: null,

  init: function(options) {
    options = options || {};
    this.config = options.config || {};
  },

  load: function(kernel) {
    kernel.config = this.config;
  },

  onKernelEvent: function(event, data) {
    if (event === 'config-manager:resolved') {
      data = data || {};
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          this.config[k] = data[k];
        }
      }
    }
  }



});
