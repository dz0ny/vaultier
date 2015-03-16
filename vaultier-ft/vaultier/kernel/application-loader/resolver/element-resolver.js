import RSVP from './../../../bower_components/rsvp/rsvp.js';
import Resolver from './base-resolver.js';

export default Resolver.extend({

  url: null,

  init: function(options) {
    if (!options.url) {
      throw new Error('Please specify url');
    }
    this.url = options.url;
  },

  createElement: function () {
    throw new Error('Implement me');
  },

  resolve: function () {
    return new RSVP.Promise(function (resolve, reject) {

      var ele = this.createElement();

      // ASYNC: load in parallel and execute as soon as possible
      ele.async = false;
      // DEFER: load in parallel but maintain execution order
      ele.defer = true;

      ele.onerror = function () {
        reject(ele);
      };

      // on load
      ele.onload = function () {
        resolve(ele);
      };

      // apend to dom and load
      var head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(ele);

    }.bind(this));
  }
});

