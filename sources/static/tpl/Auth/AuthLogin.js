Ember.TEMPLATES["Auth/AuthLogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\r\n                                                disabled type=\"email\"\r\n                                                class=\"form-control\"\r\n                                                id=\"login-form-email\"\r\n                                                placeholder=\"Email\">\r\n                                                  <span class=\"input-group-btn\">\r\n                                                    <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "switchUser", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"vlt-login-switch btn btn-default\">Switch\r\n                                                        user</a>\r\n                                                  </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n                                    ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("login-form-email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <input disabled\r\n                                           class=\"form-control\"\r\n                                           value=\"Using remebered key\"\r\n                                           id=\"login-form-key\"\r\n                                           placeholder=\"Key\">\r\n                                ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("filename")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\r\n                                                type=\"text\"\r\n                                                class=\"form-control\"\r\n                                                readonly=\"\"\r\n                                                placeholder=\"Select your key\">\r\n\r\n                                            <span class=\"vlt-login-key input-group-btn btn btn-default btn-file\">\r\n                                                Browse <input type=\"file\">\r\n                                            </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                    Create new account");
  }

  data.buffer.push("<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Login</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-md-5 bottom-15 pull-right\">\r\n\r\n                        <div class=\"callout callout-info\">\r\n                            <h4>How our security works</h4>\r\n\r\n                            <p>\r\n                                Vaultier uses encryption algorithms to keep your data safe.\r\n                                Because of strong security you log into the Vaultier with you email\r\n                                and private key instead of password.\r\n                                <br/>\r\n\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-7\">\r\n\r\n                        <div class=\"form-group ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("error:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("emailSuccess:has-success")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\">\r\n                            <label for=\"login-form-email\" class=\"col-lg-4 control-label\">Email</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "latestUser", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("error:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                            <label for=\"login-form-key\" class=\"col-lg-4 control-label\">Key</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "latestUser", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n\r\n                        <br/>\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"login-form-remember\"\r\n                                   class=\"col-lg-4 control-label\">Remember</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  hashContexts = {'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0};
  hashTypes = {'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("login-form-remember"),
    'contentBinding': ("rememberOptions"),
    'optionValuePath': ("content.ttl"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("ttl")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n                                <p class=\"help-block\">\r\n                                    Your credentials will be stored for selected period of time.\r\n                                    Remebering crednentials is not secure because key is being stored in your\r\n                                    browser.\r\n                                </p>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"vlt-dialog-footer\">\r\n\r\n                <div class=\"pull-right vlt-right-buttons\">\r\n                    <button type=\"submit\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginUser", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                        Login\r\n                    </button>\r\n                </div>\r\n\r\n                <div class=\"pull-left vlt-right-buttons\">\r\n                    Do not have account yet? ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});
