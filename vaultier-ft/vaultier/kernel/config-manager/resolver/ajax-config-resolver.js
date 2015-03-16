import RSVP from './../../../bower_components/rsvp/rsvp.js';
import BaseConfigResolver from './base-config-resolver.js';
import $ from './../../../bower_components/jquery/dist/jquery.min.js';

export default BaseConfigResolver.extend({

  url: null,

  init: function (options) {
    options = options || {};
    if (!options.url) {
      throw new Error('meta url must be specified');
    }
    this.url = options.url;
  },

  resolve: function (kernel) {
    return new RSVP.Promise(function (resolve, reject) {
      $.ajax({
          url: this.url
        })

        .then(function (config) {
          this.notifyKernel(kernel, config);
          resolve();
        }.bind(this))

        .fail(function (error) {
          reject(error);
        }.bind(this));

    }.bind(this));
  }

});
