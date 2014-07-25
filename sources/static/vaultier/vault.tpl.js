Ember.TEMPLATES["Vault/VaultsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            <div class=\"btn-group\">\n                                <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\n                                        data-toggle=\"dropdown\">\n                                    <span class=\"glyphicon glyphicon-cog\"></span>\n                                    Manage\n                                </button>\n                                <ul class=\"dropdown-menu caret-left\">\n                                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                </ul>\n                            </div>\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                                        <li>\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </li>\n\n                                        <li>\n                                            <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteWorkspace", "workspace", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete workspace</a>\n                                        </li>\n                                    ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\n                                                Edit workspace\n                                            ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                        <li>\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.memberIndex", "workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </li>\n                                    ");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push("\n                                                Share\n                                            ");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                        <li>\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Vaults.create", options) : helperMissing.call(depth0, "link-to", "Vaults.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </li>\n                                    ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                                                Add vault\n                                            ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"top-50\">\n                <div class=\"jumbotron vlt-bigbox vlt-vault\">\n                    <div class=\"vlt-header\">\n                        <div class=\"vlt-icon\">\n\n                        </div>\n                        <div class=\"vlt-title\">\n                            <h1>You do not have any vault yet</h1>\n                        </div>\n                    </div>\n\n\n                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                </div>\n            </div>\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                        <p>\n                            Vaults are used to organize your secrets into cards in vault.\n                            You can also collaborate with other team members at the vault\n                        </p>\n\n                        <p class=\"top-30\">\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </p>\n                    ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("\n                                <span class=\"glyphicon glyphicon-plus\"></span>\n                                Add vault\n                            ");
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }

function program20(depth0,data) {
  
  
  data.buffer.push("\n                    No description given\n                ");
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                        <div\n                                class=\"vlt-button-wrapper\"\n                                data-toggle=\"tooltip\"\n                                title=\n                                        \"\n                                    Vaults are used to organize your secrets into cards in vault.\n                                    You can also collaborate with other team members at the vault\n                                    \"\n                                data-placement=\"bottom\"\n                                >\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    ");
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\n                                    data-toggle=\"dropdown\">\n                                <span class=\"glyphicon glyphicon-cog\"></span>\n                                Properties\n                            </button>\n                            <ul class=\"dropdown-menu caret-left\">\n\n                                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            </ul>\n                        </div>\n                    ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                    <li>\n                                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </li>\n                                ");
  return buffer;
  }
function program26(depth0,data) {
  
  
  data.buffer.push("\n                                            Edit workspace\n                                        ");
  }

function program28(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                    <li>\n                                        <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteWorkspace", "workspace", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete workspace</a>\n                                    </li>\n                                ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                        <div\n                                class=\"vlt-button-wrapper\"\n                                data-toggle=\"tooltip\"\n                                title=\n                                        \"\n                             Invite new team members to collaborate over this workspace\n                             or  grant access permission to current team members\n                             \"\n                                data-placement=\"bottom\"\n                                >\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.memberInvite", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.memberInvite", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    ");
  return buffer;
  }
function program31(depth0,data) {
  
  
  data.buffer.push("\n                                <span class=\"glyphicon glyphicon-plus\"></span>\n                                Invite\n                            ");
  }

function program33(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                        <div\n                                class=\"vlt-button-wrapper\"\n                                data-toggle=\"tooltip\"\n                                title=\n                                        \"\n                             Invite new team members to collaborate over this workspace\n                             or  grant access permission to current team members\n                             \"\n                                data-placement=\"bottom\"\n                                >\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(34, program34, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.memberIndex", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    ");
  return buffer;
  }
function program34(depth0,data) {
  
  
  data.buffer.push("\n                                <span class=\"glyphicon glyphicon-user\"></span>\n                                Team\n                            ");
  }

  data.buffer.push("<div class=\"container-full\">\n<div class=\"vlt-page vlt-page-with-sidebar\">\n<div class=\"vlt-page-content\">\n    <div class=\"col-md-12\">\n\n            <div class=\"vlt-page-content-responsive-header\">\n                <div class=\"row-fluid\">\n                    <div class=\"col-xs-3\">\n                        ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.update || workspace.perms.delete || workspace.perms.create || workspace.perms.invite )", options) : helperMissing.call(depth0, "exp", "( workspace.perms.update || workspace.perms.delete || workspace.perms.create || workspace.perms.invite )", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n\n                    <div class=\"col-xs-9\">\n                        <h2>Workspace: ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h2>\n                    </div>\n\n                    <div class=\"clearfix\"></div>\n                </div>\n            </div>\n\n\n        ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>\n\n<div class=\"vlt-page-sidebar\">\n    <div class=\"vlt-sidebar-block\">\n        <div class=\"vlt-sidebar-block-heading\">\n            <div class=\"vlt-header\">\n                <img src=\"/static/vaultier/images/icon-workspace-grey.png\" class=\"vlt-icon\">\n\n                <h3 class=\"vlt-title\">\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </h3>\n            </div>\n            <div class=\"vlt-body\">\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n            <div class=\"vlt-controls\">\n                <div>\n\n                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                    ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.update || workspace.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n                </div>\n\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n        <div class=\"vlt-sidebar-block-sharing\">\n            <div class=\"vlt-header\">\n                <img src=\"/static/vaultier/images/icon-team-grey.png\" class=\"vlt-icon\">\n\n                <h3 class=\"vlt-title\">\n                    Sharing with\n                </h3>\n            </div>\n            <div class=\"vlt-body\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-controls\">\n                <div>\n\n                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                    ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n\n</div>\n\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultsIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("vlt-item vlt-vault-item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.index", "", options) : helperMissing.call(depth0, "link-to", "Vault.index", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"vlt-header\">\n            <div class=\"vlt-icon\">\n                <img src=\"/static/vaultier/images/icon-vault-dark-blue.png\">\n            </div>\n            <div class=\"vlt-title\">\n                <h3>\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "name", 35, options) : helperMissing.call(depth0, "ellipsis", "name", 35, options))));
  data.buffer.push("\n                </h3>\n\n            </div>\n        </div>\n        <div class=\"vlt-body\">\n            ");
  stack1 = helpers['if'].call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class=\"vlt-footer\">\n            <div class=\"vlt-footer-item help-block pull-left\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-footer-item help-block pull-right\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"clearfix\"></div>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.ellipsis || (depth0 && depth0.ellipsis),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","INTEGER"],data:data},helper ? helper.call(depth0, "description", 250, options) : helperMissing.call(depth0, "ellipsis", "description", 250, options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                No description given\n            ");
  }

  stack1 = helpers['if'].call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultsCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n            <form>\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Create new vault</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n\n                        <div class=\"col-md-7\">\n\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                <label for=\"workspace-name\">Name</label>\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                <span class=\"error\">\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </span>\n                            </div>\n\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                <label for=\"workspace-description\">Description</label>\n\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                <span class=\"error\">\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </span>\n                            </div>\n                        </div>\n\n                        <div class=\"col-md-5 bottom-15\">\n\n                            <div class=\"callout callout-info\">\n                                <h4>Vault will be shared with:</h4>\n\n                                ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\n                            </div>\n                        </div>\n\n\n                        <div class=\"clearfix\"></div>\n\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Create new vault\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n\n\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Vault/VaultEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>Edit vault</h2>\r\n                    </div>\r\n\r\n                    <div class=\"vlt-dialog-body\">\r\n                        <div class=\"col-md-8 col-md-offset-2\">\r\n\r\n                            <div class=\"form-group\"  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"vault-name\">Name</label>\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("vault-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                <span class=\"error\">\r\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </span>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"vault-description\">Description</label>\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("vault-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                <span class=\"error\">\r\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </span>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"clearfix\"></div>\r\n                    </div>\r\n\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            Back\r\n                        </a>\r\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                            Save changes\r\n                        </button>\r\n                    </div>\r\n\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});

//# sourceMappingURL=vault.tpl.js.map