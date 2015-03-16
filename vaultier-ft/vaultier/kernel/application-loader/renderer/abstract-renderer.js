import BaseObject from './../../../bower_components/uberproto/dist/proto';
import RSVP from './../../../bower_components/rsvp/rsvp';


export var AbstractRenderer = BaseObject.extend({

  showLoader: function () {
    throw new Error('Not implemented');
  },

  showLoaderText: function (text) {
    throw new Error('Not implemented');
  },

  hideLoader: function (duration) {
    throw new Error('Not implemented');
  },

  showLoaderUponPromise: function (promise) {
      throw new Error('Not implemented');
  }

});

export default AbstractRenderer;
