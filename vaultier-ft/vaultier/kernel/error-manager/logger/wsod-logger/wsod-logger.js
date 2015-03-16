import BaseHandler from './../base-logger';
import template from './error-page.hbs';
import $ from './../../../../bower_components/jquery/dist/jquery.min.js';

export default BaseHandler.extend({

  getTemplate: function() {
    return template;
  },

  parseError: function(error) {
    return {
      message: error.getPlainMessage(),
      stackTrace: error.getPlainText().replace(new RegExp("\n", 'g'),'<br />')
    };
  },

  log: function (error) {
    if (!this.rendered) {
      var template = this.getTemplate();
      var data = this.parseError(error)
      $('body').html(template(data));
      this.rendered = true;
    }
  }

});
