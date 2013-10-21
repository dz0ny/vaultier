Ember.TEMPLATES["Secret/SecretIndexItemPassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\r\n    <div class=\"vlt-visual\">\r\n        <div class=\"vlt-icon\">\r\n        </div>\r\n        <div class=\"vlt-type\">\r\n            Password\r\n        </div>\r\n    </div>\r\n    <div class=\"vlt-inner\">\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "note", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        <div class=\"vlt-controls\">\r\n            <div class=\"btn-group\">\r\n                <a type=\"button\"\r\n                   class=\"btn btn-default dropdown-toggle btn-sm\"\r\n                   data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                </a>\r\n                <ul class=\"dropdown-menu caret-left\">\r\n                    <li><a href=\"#\">Delete card</a></li>\r\n                    <li><a href=\"#\">Delete card</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});
