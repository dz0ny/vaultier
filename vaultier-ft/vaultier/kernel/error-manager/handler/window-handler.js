import BaseHandler from './base-handler';
/* global window */

export default BaseHandler.extend({

  register: function (manager) {

    var parent = window.onerror;

    window.onerror = function (message, file, line, column, error) {
      if (!error) {
        error = {
          message: message,
          name: error,
          stack: message  + ' at ' + "\n" + file + ':' + line + ':' + column
        };
      }
      manager.handleError(error, {
        source: 'window'
      });

      if (parent) {
        return parent.apply(window, arguments);
      } else {
        return false;
      }
    };
  }

});
