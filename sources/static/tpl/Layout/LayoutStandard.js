Ember.TEMPLATES["Layout/LayoutStandard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                <li>\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutSearchBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutSearchBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\">\r\n            <img class=\"vlt-logo\" src=\"/static/images/logo.png\"/>\r\n            <span class=\"vlt-brand\">\r\n            Vaultier [alpha*]\r\n            </span>\r\n        </a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n        <ul class=\"nav navbar-nav\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutWorkspaceBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutWorkspaceBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n            </li>\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutSecurityBox", "LayoutSecurityBox", options) : helperMissing.call(depth0, "render", "LayoutSecurityBox", "LayoutSecurityBox", options))));
  data.buffer.push("\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!-- /.navbar-collapse -->\r\n</nav>\r\n\r\n\r\n\r\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "Layout/Breadcrumbs", options) : helperMissing.call(depth0, "partial", "Layout/Breadcrumbs", options))));
  data.buffer.push("\r\n\r\n<div class=\"container vlt-page\">\r\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>\r\n\r\n\r\n<div id=\"vlt-footer\">\r\n    <div class=\"container\">\r\n        <p>&copy; RightClick 2013</p>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
