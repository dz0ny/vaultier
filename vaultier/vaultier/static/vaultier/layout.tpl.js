Ember.TEMPLATES["Layout/SecurityBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\"vlt-security-box dropdown\">\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.gravatarImg || (depth0 && depth0.gravatarImg),options={hash:{
    'size': (25),
    'class': ("vlt-avatar")
  },hashTypes:{'size': "INTEGER",'class': "STRING"},hashContexts:{'size': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "auth.user.cleanValues.email", options) : helperMissing.call(depth0, "gravatarImg", "auth.user.cleanValues.email", options))));
  data.buffer.push("\r\n\r\n        <a href=\"#\" class=\"vlt-username dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "auth.user.cleanValues.nickname", 12, options) : helperMissing.call(depth0, "ellipsis", "auth.user.cleanValues.nickname", 12, options))));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right vlt-dropdown\">\r\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Settings.index", options) : helperMissing.call(depth0, "link-to", "Settings.index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\r\n            <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" href=\"\" >Logout</a></li>\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "showToken", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Settings");
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li><a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("auth.token")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"copy-token\" >Copy token to clipboard</a></li>\r\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\" vlt-security-box vlt-anonymous\">\r\n       ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-sm"),
    'activeClass': ("")
  },hashTypes:{'class': "STRING",'activeClass': "STRING"},hashContexts:{'class': depth0,'activeClass': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n       ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm"),
    'activeClass': ("")
  },hashTypes:{'class': "STRING",'activeClass': "STRING"},hashContexts:{'class': depth0,'activeClass': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Login");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/WorkspaceBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n    <div class=\"vlt-wspace-box dropdown\">\r\n\r\n        <img class=\"vlt-wspaceimg\" src=\"/static/vaultier/images/icon-workspace-white.png \">\r\n\r\n        <a href=\"#\" class=\"vlt-wspacename dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "env.workspace.cleanValues.name", 20, options) : helperMissing.call(depth0, "ellipsis", "env.workspace.cleanValues.name", 20, options))));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right\">\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.index", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.index", "env.workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "env.workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "env.workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            <li class=\"divider\"></li>\r\n\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.select", options) : helperMissing.call(depth0, "link-to", "Workspaces.select", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    Go to workspace dashboard\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "env.workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    Setup workspace\r\n                ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n            <li>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "MembersAdmin", options) : helperMissing.call(depth0, "link-to", "MembersAdmin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </li>\r\n            ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                    Manage members\r\n                ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\r\n                    Switch to another workspace\r\n                ");
  }

  stack1 = helpers['if'].call(depth0, "env.workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/SearchBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"vlt-search-box\">\n    <select placeholder=\"Search ALT+S\"></select>\n</div>\n");
  
});

Ember.TEMPLATES["Layout/Breadcrumbs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <div class=\"vlt-breads\">\r\n        <div class=\"container-full\">\r\n            ");
  stack1 = helpers.each.call(depth0, "breadcrumbs.items", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "last", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.unless.call(depth0, "last", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"vlt-bread active\">\r\n                        <span class=\"vlt-bread-inner\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                         </span>\r\n                    </div>\r\n                ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img class=\"vlt-icon\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("icon")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"vlt-bread\">\r\n                        <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("link")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"vlt-bread-inner\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </a>\r\n                    </div>\r\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div class=\"vlt-separator\">\r\n                    |\r\n                    </div>\r\n                ");
  }

  stack1 = helpers['if'].call(depth0, "breadcrumbs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Layout/LayoutStandard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

  data.buffer.push("<nav class=\"vlt-navbar navbar navbar-static-top navbar-default\" role=\"navigation\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\">\r\n            <img class=\"vlt-logo\" src=\"/static/vaultier/images/logo.png\"/>\r\n            <span class=\"vlt-brand\">\r\n            Vaultier\r\n            </span>\r\n        </a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n        <ul class=\"nav navbar-nav\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutWorkspaceBox", "LayoutWorkspaceBox", options) : helperMissing.call(depth0, "render", "LayoutWorkspaceBox", "LayoutWorkspaceBox", options))));
  data.buffer.push("\r\n            </li>\r\n            <li>\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "LayoutSecurityBox", "LayoutSecurityBox", options) : helperMissing.call(depth0, "render", "LayoutSecurityBox", "LayoutSecurityBox", options))));
  data.buffer.push("\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!-- /.navbar-collapse -->\r\n</nav>\r\n\r\n\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Breadcrumbs", options) : helperMissing.call(depth0, "partial", "Layout/Breadcrumbs", options))));
  data.buffer.push("\r\n\r\n<div class=\"vlt-layout-yield\">\r\n    ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n</div>\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Layout/Footer", options) : helperMissing.call(depth0, "partial", "Layout/Footer", options))));
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Layout/Confirm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                <h4 class=\"modal-title\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <a href=\"#\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</a>\r\n                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "ok", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary\">Ok</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Layout/Footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div id=\"vlt-footer\">\n    <div class=\"container-full\">\n        <div class=\"pull-left vlt-business\">\n            <p>\n                <a href=\"http://rightclick.formees.cz/f/vaultier/\" class=\"btn btn-success\" target=\"_blank\">\n                    Enterprise Edition & Business Solutions\n                </a>\n                <a href=\"mailto:info@rclick.cz\" class=\"btn btn-default\">\n                    Contact us\n                </a>\n            </p>\n        </div>\n        <div class=\"pull-right vlt-rclick\">\n            <a href=\"http://www.rclick.cz/\" target=\"_blank\">\n                <img height=\"35px\" src=\"/static/vaultier/images/rclick.png\">\n            </a></p>\n        </div>\n        <div class=\"pull-right vlt-version\">\n           Vaultier  ");
  stack1 = helpers._triageMustache.call(depth0, "config.VERSION", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Layout/PasswordField"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"input-group\">\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-password"),
    'value': ("value"),
    'class': ("form-control"),
    'disabledBinding': ("disabled")
  },hashTypes:{'elementId': "STRING",'value': "ID",'class': "STRING",'disabledBinding': "ID"},hashContexts:{'elementId': depth0,'value': depth0,'class': depth0,'disabledBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    <span class=\"input-group-btn\">\n        <button class=\"btn btn-default\" type=\"button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "generatePassword", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
    'disabled': ("disabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
  data.buffer.push(">Generate</button>\n    </span>\n</div>\n");
  return buffer;
  
});

//# sourceMappingURL=layout.tpl.js.map