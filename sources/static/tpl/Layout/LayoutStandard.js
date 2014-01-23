Ember.TEMPLATES["Layout/LayoutStandard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutSearchBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutSearchBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"navbar navbar-default navbar-static-top\">\r\n\r\n    <div class=\"container\">\r\n\r\n        <div class=\"navbar-header\">\r\n\r\n            <div class=\"navbar-brand vlt-branding\">\r\n                <div class=\"vlt-brand\">\r\n                    <a href=\"#\">\r\n                        <img class=\"vlt-brandimg\" src=\"/static/images/logo.png\">\r\n\r\n                        <div class=\"vlt-brandname\">\r\n                            Vaultier [alpha*]\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"navbar-left\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"navbar-right\">\r\n\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutSecurityBox", "LayoutSecurityBox", options) : helperMissing.call(depth0, "render", "LayoutSecurityBox", "LayoutSecurityBox", options))));
  data.buffer.push("\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "LayoutWorkspaceBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutWorkspaceBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n\r\n\r\n\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
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
