Ember.TEMPLATES["Error/Layout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\">\r\n            <img class=\"vlt-logo\" src=\"/static/images/logo.png\"/>\r\n            <span class=\"vlt-brand\">\r\n            Vaultier [alpha*]\r\n            </span>\r\n        </a>\r\n    </div>\r\n</nav>\r\n\r\n\r\n<div class=\"container vlt-page\">\r\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>\r\n\r\n<div id=\"vlt-footer\">\r\n    <div class=\"container\">\r\n        <p>&copy; RightClick 2013</p>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
