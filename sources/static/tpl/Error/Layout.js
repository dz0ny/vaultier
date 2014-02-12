Ember.TEMPLATES["Error/Layout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">\n            <img class=\"vlt-logo\" src=\"/static/images/logo.png\"/>\n            <span class=\"vlt-brand\">\n            Vaultier [alpha*]\n            </span>\n        </a>\n    </div>\n</nav>\n\n\n<div class=\"container vlt-page\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n\n<div id=\"vlt-footer\">\n    <div class=\"container\">\n        <p>&copy; RightClick 2013</p>\n    </div>\n</div>\n");
  return buffer;
  
});
