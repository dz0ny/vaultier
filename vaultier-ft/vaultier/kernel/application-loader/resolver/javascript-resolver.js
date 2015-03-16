import RSVP from './../../../bower_components/rsvp/rsvp.js';
import ElementResolver from './element-resolver.js';

export default ElementResolver.extend({

  createElement: function () {
    var ele = document.createElement("script");
    ele.type = "text/javascript";
    ele.src = this.url;

    return ele;
  }
});

