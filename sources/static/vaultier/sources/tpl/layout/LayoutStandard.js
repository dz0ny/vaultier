Ember.TEMPLATES["Layout/LayoutStandard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                <li>\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutSearchBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutSearchBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\">\r\n            <img class=\"vlt-logo\" src=\"/static/images/logo.png\"/>\r\n            <span class=\"vlt-brand\">\r\n            Vaultier\r\n            </span>\r\n        </a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n        <ul class=\"nav navbar-nav\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutWorkspaceBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutWorkspaceBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n            </li>\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutSecurityBox", "LayoutSecurityBox", options) : helperMissing.call(depth0, "render", "LayoutSecurityBox", "LayoutSecurityBox", options))));
  data.buffer.push("\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!-- /.navbar-collapse -->\r\n</nav>\r\n\r\n\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Breadcrumbs", options) : helperMissing.call(depth0, "partial", "Layout/Breadcrumbs", options))));
  data.buffer.push("\r\n\r\n<div class=\"container vlt-page\">\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Footer", options) : helperMissing.call(depth0, "partial", "Layout/Footer", options))));
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});