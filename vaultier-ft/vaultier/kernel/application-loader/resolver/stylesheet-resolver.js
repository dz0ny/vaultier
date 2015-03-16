import RSVP from './../../../bower_components/rsvp/rsvp.js';
import ElementResolver from './element-resolver.js';

export default ElementResolver.extend({


  createElement: function () {
    var ele = document.createElement("link");
    ele.rel = 'stylesheet';
    ele.type = 'text/css';
    ele.href = this.url;

    return ele;
  }

});


