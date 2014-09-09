Ember.TEMPLATES["Auth/AuthLogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                    <div class=\"input-group\">\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("email")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                                                disabled type=\"email\"\n                                                class=\"form-control\"\n                                                id=\"login-form-email\"\n                                                placeholder=\"Email\">\n                                                  <span class=\"input-group-btn\">\n                                                    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "switchUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"vlt-login-switch btn btn-default\">Switch\n                                                        user</a>\n                                                  </span>\n                                    </div>\n                                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("login-form-email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                                    <input disabled\n                                           class=\"form-control\"\n                                           value=\"Using remebered key\"\n                                           id=\"login-form-key\"\n                                           placeholder=\"Key\">\n                                ");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                    <div class=\"input-group\">\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("filename")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                                                type=\"text\"\n                                                class=\"form-control\"\n                                                readonly=\"\"\n                                                placeholder=\"Select your key\">\n\n                                            <span class=\"vlt-login-key input-group-btn btn btn-default btn-file\">\n                                                Browse <input type=\"file\">\n                                            </span>\n                                    </div>\n                                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Click\n                                        here.");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n                            Create new one");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n\n\n<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Login</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row\">\n\n                    <div class=\"col-md-5 bottom-15 pull-right\">\n\n                        <div class=\"callout callout-info\">\n                            <h4>How Our Security Works</h4>\n\n                            <p>\n                                Vaultier uses encryption algorithms to keep your data safe.\n                                Because of this, you log into Vaultier with your email\n                                and private key instead of a password.\n                                <br/>\n\n                            </p>\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-7\">\n\n                        <div class=\"form-group ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\">\n                            <label for=\"login-form-email\" class=\"col-lg-4 control-label\">Email</label>\n\n                            <div class=\"col-lg-8\">\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                            <label for=\"login-form-key\" class=\"col-lg-4 control-label\">Key</label>\n\n                            <div class=\"col-lg-8\">\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                <small>\n                                    <span class=\"text-muted\">Lost your key?</span>\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn-link")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLostKey", options) : helperMissing.call(depth0, "link-to", "AuthLostKey", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </small>\n                            </div>\n                        </div>\n\n                        <br/>\n\n                        <div class=\"form-group\">\n                            <label for=\"login-form-remember\"\n                                   class=\"col-lg-4 control-label\">Remember</label>\n\n                            <div class=\"col-lg-8\">\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("login-form-remember"),
    'contentBinding': ("rememberOptions"),
    'optionValuePath': ("content.ttl"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("ttl")
  },hashTypes:{'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"},hashContexts:{'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n                                <p>\n                                    <small class=\"text-muted\">\n                                        Your credentials will be stored for the selected period of time.\n                                        Remebering crednentials is not recommended, because your key is being stored in the browser.\n                                    </small>\n                                </p>\n\n                            </div>\n                        </div>\n\n\n                    </div>\n\n\n                </div>\n            </div>\n\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    <button type=\"submit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                        Login\n                    </button>\n                </div>\n\n                <div class=\"vlt-right-buttons text-left\">\n                    <div>\n                        Do not have an account yet?\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegister"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    <a>\n                        Generate Key\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\n                    </a>\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                    <a>\n                        Your Credentials\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\n                    </a>\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                    <a>\n                        Finish Registration\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\n                    </a>\n                ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n                        Next\n                    ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                        Do you have an account already?\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\n                            Login to your account here\n                        ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n\n\n<div class=\"vlt-dialog vlt-register col-xs-12 col-md-10 col-md-offset-1 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <div class=\"vlt-dialog-header\">\n            <h2>Sign up for Vaultier</h2>\n\n            <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("keys")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("creds")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("sum")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </ul>\n        </div>\n\n        <div class=\"vlt-dialog-body\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "outlet", "AuthRegister", options))));
  data.buffer.push("\n        </div>\n\n        <div class=\"vlt-dialog-footer\">\n\n            <div class=\"pull-right vlt-right-buttons\">\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("props.nextButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\n                    ");
  stack1 = helpers['if'].call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </button>\n            </div>\n\n            <div class=\"vlt-left-buttons pull-left\">\n                    ");
  stack1 = helpers.unless.call(depth0, "props.loginButtonHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            <div class=\"clearfix\"></div>\n\n        </div>\n    </div>\n</div>\n\n\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <h4>We Have Generated Your Key</h4>\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n\n                <div class=\"alert alert-warning\">\n                    <div class=\"row top-15\">\n                        <div class=\"col-md-offset-1 col-md-10\">\n                            <p\n                                    class=\"text-center\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"\n                                     Private key is used instead of a password to log into Vaultier.\n                                     Please keep the private key safe and do not give it to anybody.\n                                     Without the private key, you will not be able to log into Vaultier\n                                     and your data will be effectively rendered unreadable.\n                                    \">\n\n                                <b>\n                                    Save the private key to your computer and keep it. Do not loose the key, you will need it to subsequently log-in again.\n                                </b>\n                            </p>\n                        </div>\n                    </div>\n\n\n                    <div class=\"row top-15\">\n                        <div class=\"text-center\">\n                            <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-lg props.nextButtonDisabled:btn-primary:btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                                <span class=\"glyphicon glyphicon-save\"></span>\n                                Save the key\n                            </a>\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"clearfix\"></div>\n\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                <div class=\"generate\">\n                    <h4>Please wait while we generate your key</h4>\n                    <div class=\"vlt-preloader vlt-preloader-small\">\n                    </div>\n                </div>\n            ");
  }

  data.buffer.push("<div class=\"vlt-register-key\">\n\n    ");
  stack1 = helpers['if'].call(depth0, "props.keysReady", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"row\">\n        <div class=\"col-md-7\">\n            ");
  stack1 = helpers['if'].call(depth0, "props.keysReady", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div class=\"col-md-5\">\n            <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":callout :callout-info props.keysReady::vlt-register-key-info")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                <p>Because we care about strong security we use a key for login instead of apassword.</p>\n                <p>All secrets submited to Vaultier are encrypted by your key and can be read only by you and your team. members</p>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterCreds"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-creds\">\n\n    <div class=\"col-md-8 col-md-offset-2\">\n        <div>\n            <h4>Please submit your credentials</h4>\n\n            <p>\n                Please provide us with your credentials. Email will be used for logging in and delivering notifications to you.\n                Your nickname is used instead of your full name, so you can berecognized by other users of Vaultier.\n            </p>\n        </div>\n\n        <div class=\"bottom-30\">\n            <form class=\"form-horizontal\" role=\"form\">\n\n                <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.email:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    <label for=\"register-form-email\" class=\"control-label\">Email *</label>\n\n                    <div>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <div  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.nickname:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    <label for=\"register-form-nickname\" class=\"control-label\">Your nickname *</label>\n\n                    <div>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <br/>\n\n            </form>\n        </div>\n    </div>\n\n    <div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header text-center\">\n                        <h2>Retrieve Your Lost Key</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 bottom-15\">\n\n                                <div class=\"callout callout-info\">\n                                    <p>\n                                        Since you have forgotten your key, we are ready to renew your access. Please enter\n                                        your email below and we will send you further instructions.\n                                    </p>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-8\">\n\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    <label for=\"login-form-email\" class=\"col-lg-4 control-label pull-left\">Email</label>\n\n                                    <div class=\"col-lg-8\">\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email"),
    'require': ("true")
  },hashTypes:{'id': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING",'require': "STRING"},hashContexts:{'id': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0,'require': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                                        <span class=\"error\">\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            <button type=\"submit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRecoveryKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                                Send\n                            </button>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeySuccess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                            Return to login\n                        ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Your Reset Request Was Accepted.</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 text-center bottom-15\">\n                                <p>\n                                    We have sent you an email with instructions to recover your\n                                    private key.\n                                </p>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        ");
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
  var buffer = '', stack1;


  data.buffer.push("<div class=\"vlt-register-sum\">\n\n\n    <div class=\"row bottom-15\">\n        <div class=\"col-md-8 col-md-offset-2\">\n            <h4>Your account has been successfully created</h4>\n\n            <p>\n                Before you start usinging Vaultier, please review your account credentials.</b>\n            </p>\n        </div>\n    </div>\n\n    <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\n\n        <div class=\"row bottom-5\">\n            <div class=\"col-md-6 col-md-offset-1\">\n                <b>\n                    Your email and username:\n                </b>\n            </div>\n            <div class=\"col-md-4\">\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n        </div>\n\n\n        <div class=\"row bottom-15\">\n            <div class=\"col-md-6 col-md-offset-1\">\n                <b>\n                    Your nickname:\n                </b>\n            </div>\n            <div class=\"col-md-4\">\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n        </div>\n\n        </div>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n</div>\n");
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

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Rebuild Your Lost Key</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row bottom-15\">\n\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <h3>Workspace Data Recovery</h3>\n\n                                <p>\n                                    Recovery is possible only for workspaces where there is \n                                    more than one member. This is because only other members \n                                    of your workspaces can confirm your new private key.\n                                </p>\n                            </div>\n                        </div>\n                        <div class=\"row table-responsive\">\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <table class=\"table table-condensed\">\n                                    <thead>\n                                    <tr>\n                                        <th>Workspace</th>\n                                        <th>Recovery Possible</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    ");
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


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <div class=\"vlt-dialog-header\">\n                    <h2>Private Key</h2>\n                </div>\n                <div class=\"vlt-dialog-body\">\n\n                    <div class=\"col-md-8 col-md-offset-2\">\n                        ");
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

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Disable Your Workspaces</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"col-md-8 col-md-offset-2\">\n                            <div class=\"vlt-dialog-body\">\n                                <div class=\"text-center\">\n                                    Your Key Was Disabled.\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            ");
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

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Recovery of Your Lost Key Was Successfully Finished.</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 text-center bottom-15\">\n                                <p>\n                                    You can now log in with the new key. Workspaces will be seen after\n                                    any user from your workspace logs in and confirms your new key.\n                                </p>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces", options) : helperMissing.call(depth0, "link-to", "Workspaces", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

//# sourceMappingURL=auth.tpl.js.map