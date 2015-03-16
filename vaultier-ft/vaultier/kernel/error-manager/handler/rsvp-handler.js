import RSVP from './../../../bower_components/rsvp/rsvp.js';
import BaseHandler from './base-handler';

export default BaseHandler.extend({

  register: function (manager) {
    RSVP.configure('onerror',function (error) {
      manager.handleError(error, {
        source: 'rsvp'
      });
    });
  }


});
