import BaseModule from './../kernel/base-module';
import RSVP from './../../bower_components/rsvp/rsvp.js';
/* global document */

export default BaseModule.extend({

  resolvers: null,

  loadConfig: function (kernel) {
    this.config = kernel.config && kernel.config.ApplicationLoader ? kernel.config.ApplicationLoader : null;
    if (!this.config) {
      throw new Error('ApplicationConfig not found on kernel');
    }
  },

  init: function (options) {
    if (!options || !options.renderer) {
      throw new Error('Renderer must be passed');
    }
    if (!options.resolvers || !Array.isArray(options.resolvers)) {
      throw new Error('please specify array of resolvers');
    }

    this.resolvers = options.resolvers;
    this.renderer = options.renderer;
  },

  load: function (kernel) {
    if (this.renderer) {
      this.renderer.showLoader();
      this.renderer.showLoaderText('Loading...');
    }

    var resolving = this.resolvers.map(function (resolver) {
      return resolver.resolve(kernel);
    });

    return RSVP
      .all(resolving)
      .finally(function () {
        if (this.renderer) {
          this.renderer.hideLoader();
        }
      }.bind(this));

  }
});
