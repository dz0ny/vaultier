import BaseObject from './../../../bower_components/uberproto/dist/proto.js';
import RSVP from './../../../bower_components/rsvp/rsvp.js';

export default BaseObject.extend({

  resolve: function (file) {
    return RSVP.resolve();
  }

});


