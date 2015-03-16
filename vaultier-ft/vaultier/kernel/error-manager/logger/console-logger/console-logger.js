import BaseHandler from './../base-logger';

export default BaseHandler.extend({

  log: function (error) {
    console.error(error.getPlainText());
  }

});
