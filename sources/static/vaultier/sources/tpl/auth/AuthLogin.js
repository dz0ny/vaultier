Ember.TEMPLATES["Auth/AuthLogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("email")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                                                disabled type=\"email\"\r\n                                                class=\"form-control\"\r\n                                                id=\"login-form-email\"\r\n                                                placeholder=\"Email\">\r\n                                                  <span class=\"input-group-btn\">\r\n                                                    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "switchUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"vlt-login-switch btn btn-default\">Switch\r\n                                                        user</a>\r\n                                                  </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("login-form-email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <input disabled\r\n                                           class=\"form-control\"\r\n                                           value=\"Using remebered key\"\r\n                                           id=\"login-form-key\"\r\n                                           placeholder=\"Key\">\r\n                                ");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("filename")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                                                type=\"text\"\r\n                                                class=\"form-control\"\r\n                                                readonly=\"\"\r\n                                                placeholder=\"Select your key\">\r\n\r\n                                            <span class=\"vlt-login-key input-group-btn btn btn-default btn-file\">\r\n                                                Browse <input type=\"file\">\r\n                                            </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Click\r\n                                        here.");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                            Create new account");
  }

  data.buffer.push("<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Login</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-md-5 bottom-15 pull-right\">\r\n\r\n                        <div class=\"callout callout-info\">\r\n                            <h4>How our security works</h4>\r\n\r\n                            <p>\r\n                                Vaultier uses encryption algorithms to keep your data safe.\r\n                                Because of strong security you log into the Vaultier with you email\r\n                                and private key instead of password.\r\n                                <br/>\r\n\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-7\">\r\n\r\n                        <div class=\"form-group ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\">\r\n                            <label for=\"login-form-email\" class=\"col-lg-4 control-label\">Email</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                            <label for=\"login-form-key\" class=\"col-lg-4 control-label\">Key</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                <small>\r\n                                    <span class=\"text-muted\">Did you lost your key?</span>\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn-link")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLostKey", options) : helperMissing.call(depth0, "link-to", "AuthLostKey", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </small>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <br/>\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"login-form-remember\"\r\n                                   class=\"col-lg-4 control-label\">Remember</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("login-form-remember"),
    'contentBinding': ("rememberOptions"),
    'optionValuePath': ("content.ttl"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("ttl")
  },hashTypes:{'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"},hashContexts:{'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n\r\n                                <p>\r\n                                    <small class=\"text-muted\">\r\n                                        Your credentials will be stored for selected period of time.\r\n                                        Remebering crednentials is not secure because key is being stored in your\r\n                                        browser.\r\n                                    </small>\r\n                                </p>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"vlt-dialog-footer\">\r\n\r\n                <div class=\"pull-right vlt-right-buttons\">\r\n                    <button type=\"submit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                        Login\r\n                    </button>\r\n                </div>\r\n\r\n                <div class=\"vlt-right-buttons text-left\">\r\n                    <div>\r\n                        Do not have account yet?\r\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});