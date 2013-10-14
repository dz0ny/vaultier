Ember.TEMPLATES["Auth/Login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                    Latest\r\n                                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                                    Switch\r\n                                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Create new\r\n                    account here");
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"modal-dialog vlt-tabs-modal vlt-login\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <h2>Login</h2>\r\n\r\n                        <ul class=\"nav nav-tabs vlt-login-tabs\">\r\n                            <li class=\"AuthLoginLatest\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthLoginLatest", options) : helperMissing.call(depth0, "link-to", "AuthLoginLatest", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </li>\r\n                            <li class=\"AuthLoginSwitch\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthLoginSwitch", options) : helperMissing.call(depth0, "link-to", "AuthLoginSwitch", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </li>\r\n                        </ul>\r\n\r\n                </div>\r\n                <div class=\"modal-body\">\r\n\r\n                    <div class=\"tab-content\">\r\n                        <div class=\"tab-pane active\">\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet || depth0.outlet),stack1 ? stack1.call(depth0, "tab", options) : helperMissing.call(depth0, "outlet", "tab", options))));
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    Do not have account yet? ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    <a href=\"#\" class=\"btn btn-primary\">Login</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});
