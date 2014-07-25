Ember.TEMPLATES["Auth/AuthLogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n\r\n\r\n<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Login</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-md-5 bottom-15 pull-right\">\r\n\r\n                        <div class=\"callout callout-info\">\r\n                            <h4>How our security works</h4>\r\n\r\n                            <p>\r\n                                Vaultier uses encryption algorithms to keep your data safe.\r\n                                Because of strong security you log into the Vaultier with you email\r\n                                and private key instead of password.\r\n                                <br/>\r\n\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-7\">\r\n\r\n                        <div class=\"form-group ");
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
  data.buffer.push("\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegister"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Before you register\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Generate your keys\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Your credentials\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Finish registration\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                        Next\r\n                    ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        Do you have account already?\r\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                            Login to your account here\r\n                        ");
  }

  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n\r\n\r\n<div class=\"vlt-dialog vlt-register col-xs-12 col-md-10 col-md-offset-1 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <div class=\"vlt-dialog-header\">\r\n            <h2>Register to Vaultier</h2>\r\n\r\n            <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("before")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("keys")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("creds")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("sum")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-body\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "outlet", "AuthRegister", options))));
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-footer\">\r\n\r\n            <div class=\"pull-right vlt-right-buttons\">\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("props.nextButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </button>\r\n            </div>\r\n\r\n            <div class=\"vlt-left-buttons pull-left\">\r\n                    ");
  stack1 = helpers.unless.call(depth0, "props.loginButtonHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterBefore"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\r\n\r\n    <div class=\"col-md-5 col-md-offset-1\">\r\n        <h4>How our security works</h4>\r\n\r\n        <p>\r\n            Vaultier uses encryption algorithms to keep your data safe.\r\n            <br/>\r\n            <br/>\r\n            All secrets submited to vaultier are encrypted by your private key\r\n            and can be red only by you and your team.\r\n            <br/>\r\n            <br/>\r\n            Because of strong security you log into the Vaultier with you email\r\n            and private key instead of password.\r\n            <br/>\r\n            <br/>\r\n            <a href=\"http://en.wikipedia.org/wiki/RSA_(algorithm)\" target=\"_blank\">\r\n                Read more on topic on wikipedia\r\n            </a>\r\n\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"col-md-5\">\r\n        <h4>Steps of registration</h4>\r\n\r\n        <p>\r\n            Registration wizard will guide you throught follwoing step to became regular user of Vaultier\r\n\r\n        <ol>\r\n            <li>Generate keys - your private and public key will be generated</li>\r\n            <li>Submit credentials - You will be asked about your credentials - email, nickname ...</li>\r\n            <li>Summary of registration - final information before use</li>\r\n        </ol>\r\n\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n");
  
});

Ember.TEMPLATES["Auth/AuthRegisterKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-8 col-md-offset-2\">\r\n                <h4>We have generated your private and public key pair. </h4>\r\n\r\n                <p>\r\n                    Public key will be uploaded to Vaultier.\r\n                    But private key is only for you and will be used to log into the Vaultier and to encrypt your\r\n                    secrets.\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n                    <p\r\n                            class=\"text-danger text-center\"\r\n                            data-toggle=\"tooltip\"\r\n                            title=\"\r\n                            Private key is used instead of password to log into Vaultier.\r\n                            Please keep private key safe and do not give it to anybody.\r\n                            Without private key you will not be able to log into Vaultier\r\n                            and your data will be rendered unreadable.\r\n                            \">\r\n\r\n                        <b>\r\n                            <span class=\"glyphicon glyphicon-exclamation-sign btn-lg\"></span>\r\n                            <br/>\r\n                            Save private key to local computer and keep it carefully. Do not loose the key\r\n                        </b>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1 text-center\">\r\n                    <a class=\"btn btn-primary btn-lg\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\r\n                         <span class=\"glyphicon glyphicon-save\"></span>\r\n                        Save the key\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n    </div>\r\n\r\n\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n    <div class=\"generate\">\r\n        <h3>Please wait while generating your keys</h3>\r\n\r\n        <div class=\"vlt-preloader vlt-preloader-small\">\r\n        </div>\r\n    </div>\r\n");
  }

  data.buffer.push("<div class=\"vlt-register-keys\">\r\n");
  stack1 = helpers['if'].call(depth0, "props.keysReady", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterCreds"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-creds\">\r\n\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n        <div>\r\n            <h4>Please submit yout credentials</h4>\r\n\r\n            <p>\r\n                Please provide us with your credentials. Email will be used for login and delivering notifications to you.\r\n                By nickname you will be recognized by other users of Vaultier\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"bottom-30\">\r\n            <form class=\"form-horizontal\" role=\"form\">\r\n\r\n                <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.email:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                    <label for=\"register-form-email\" class=\"control-label\">Email *</label>\r\n\r\n                    <div>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.nickname:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                    <label for=\"register-form-nickname\" class=\"control-label\">Your nickname *</label>\r\n\r\n                    <div>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <br/>\r\n\r\n            </form>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n            <div class=\"vlt-dialog-content\">\r\n                <form class=\"form-horizontal\" role=\"form\">\r\n\r\n                    <div class=\"vlt-dialog-header text-center\">\r\n                        <h2>Retrieve your lost key</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-12 bottom-15\">\r\n\r\n                                <div class=\"callout callout-info\">\r\n                                    <p>\r\n                                        You have forgotten your key, we are ready to renew your access key. Please enter\r\n                                        your email below and we will send email to you with further instructions.\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-md-8\">\r\n\r\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                    <label for=\"login-form-email\" class=\"col-lg-4 control-label pull-left\">Email</label>\r\n\r\n                                    <div class=\"col-lg-8\">\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email"),
    'require': ("true")
  },hashTypes:{'id': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING",'require': "STRING"},hashContexts:{'id': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0,'require': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                        <span class=\"error\">\r\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n\r\n                        <div class=\"pull-right vlt-right-buttons\">\r\n                            <button type=\"submit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRecoveryKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                                Send\r\n                            </button>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeySuccess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                            Return to login\n                        ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Your request was successfully accepted.</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 text-center bottom-15\">\n                                <p>\n                                    We have sent you an email with the instructions to recover your\n                                    private key.\n                                </p>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterSum"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-sum\">\r\n\r\n\r\n    <div class=\"row bottom-15\">\r\n        <div class=\"col-md-8 col-md-offset-2\">\r\n            <h4>Your account has been successfully created</h4>\r\n\r\n            <p>\r\n                Before start using Vaultier please review your account credentials and\r\n                <b>do not forget to save your private key.</b>\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n        <div class=\"row bottom-5\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your email and username:\r\n                </b>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your nickname:\r\n                </b>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"row top-15\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your private key\r\n                </b>\r\n                <br/>\r\n                    <span class=\"help-block\">\r\n                        Used instead of password. Please save if you did not yet.\r\n                    </span>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <a\r\n                    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        data-toggle=\"tooltip\"\r\n                        title=\"\r\n                            Private key is used instead of password to log into Vaultier.\r\n                            Please keep private key safe and do not give it to anybody.\r\n                            Without private key you will not be able to log into Vaultier\r\n                            and your data will be rendered unreadable.\r\n                            \"\r\n                        class=\"btn btn-default btn-sm\"\r\n                        >\r\n                    <span class=\"glyphicon glyphicon-save\"></span>\r\n                    Save your file\r\n\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryReset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                        <tr>\n                                            <td>\n                                                ");
  stack1 = helpers._triageMustache.call(depth0, "workspace_name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </td>\n                                            <td>\n                                                ");
  stack1 = helpers['if'].call(depth0, "is_recoverable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </td>\n                                        </tr>\n                                    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                                                    <strong class=\"text-success\">Yes</strong>\n                                                ");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                                                    <strong class=\"text-danger\">No</strong>\n                                                ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Rebuild your lost key</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row bottom-15\">\n\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <h3>Workspace encrypted data recovery</h3>\n\n                                <p>\n                                    After you rebuild your private key access to encrypted workspace data has to be\n                                    recovered.\n                                    Recovery is possible only to workspaces where more than one member exists.\n                                    Your access will be recovered once at least one of your workspace collaborators goes\n                                    online.\n                                </p>\n                            </div>\n                        </div>\n                        <div class=\"row table-responsive\">\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <table class=\"table table-condensed\">\n                                    <thead>\n                                    <tr>\n                                        <th>Workspace</th>\n                                        <th>Possible recovery</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    ");
  stack1 = helpers.each.call(depth0, "content.memberships", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "disableKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                                Disable current lost key\n                            </button>\n                            <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rebuildKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                                Rebuild your lost key\n                            </button>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryRebuild"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <div class=\"vlt-dialog-header\">\n                    <h2>Private key</h2>\n                </div>\n                <div class=\"vlt-dialog-body\">\n\n                    <div class=\"col-md-8 col-md-offset-2\">\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['change-key'] || (depth0 && depth0['change-key']),options={hash:{
    'action': ("save")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "change-key", options))));
  data.buffer.push("\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryDisable"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                                Register\n                            ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Disable your workspaces</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"col-md-8 col-md-offset-2\">\n                            <div class=\"vlt-dialog-body\">\n                                <div class=\"text-center\">\n                                    Your key was disabled.\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoverySuccess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                            Go to your workspaces dashboard\n                        ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Your private key was successfully reset.</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 text-center bottom-15\">\n                                <p>\n                                    We rebuild your private key and set your environment to use it.\n                                </p>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces", options) : helperMissing.call(depth0, "link-to", "Workspaces", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

//# sourceMappingURL=auth.tpl.js.map