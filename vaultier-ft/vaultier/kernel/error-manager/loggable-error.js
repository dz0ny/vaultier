import BaseObject from './../../bower_components/uberproto/dist/proto.js';

var LoggableError = BaseObject.extend({

  init: function (options) {
    this.error = options.error;
  },

  getPlainMessage: function() {
    if (this.error && this.error.message) {
      return this.error.message;
    } else {
      return 'With no specific details';
    }
  },

  getPlainText: function () {
    var error = this.error;

    if (error) {
      var name = error.name || 'Error';
      var message = error.message ? ` (${error.message}) ` : '';
      var stack = error.stack || '';
      stack = stack.substring(stack.indexOf("\n") + 1);

      var previous = error.previous ? "Previous: " + LoggableError.create({error: error.previous}).getPlainText() : '';

      return name + message + "\n" + stack + "\n\n" + previous;
    } else {
      return 'Unspecified error';
    }
  }

});

export default LoggableError;
