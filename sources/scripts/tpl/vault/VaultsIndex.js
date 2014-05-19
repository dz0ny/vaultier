Ember.TEMPLATES["Vault/VaultsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n        <div class=\"vlt-page-toolbar pull-right\">\n            <div>\n\n                ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.update || workspace.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        </div>\n\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-sm\" data-toggle=\"dropdown\">\n                            <span class=\"glyphicon glyphicon-cog\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu caret-left\">\n\n                            ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        </ul>\n                    </div>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <li>\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.edit", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </li>\n                            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                                        Edit workspace\n                                    ");
  }

function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                <li>\n                                    <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteWorkspace", "workspace", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete workspace</a>\n                                </li>\n                            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    <div\n                            class=\"vlt-button-wrapper\"\n                            data-toggle=\"tooltip\"\n                            title=\n                                    \"\n                             Invite new team members to collaborate over this workspace\n                             or  grant access permission to current team members\n                             \"\n                            data-placement=\"bottom\"\n                            >\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Workspace.memberIndex", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"glyphicon glyphicon-user\"></span>\n                            Collaborate\n                        ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    <div\n                            class=\"vlt-button-wrapper\"\n                            data-toggle=\"tooltip\"\n                            title=\n                                    \"\n                                    Vaults are used to organize your secrets into cards in vault.\n                                    You can also collaborate with other team members at the vault\n                                    \"\n                            data-placement=\"bottom\"\n                            >\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            Create new vault\n                        ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"jumbotron vlt-bigbox vlt-vault col-md-8 col-md-offset-2\">\n                <div class=\"vlt-header\">\n                    <div class=\"vlt-icon\">\n\n                    </div>\n                    <div class=\"vlt-title\">\n                        <h1>You do not have any vault yet</h1>\n                    </div>\n                </div>\n\n\n                ");
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                    <p>\n                        Vaults are used to organize your secrets into cards in vault.\n                        You can also collaborate with other team members at the vault\n                    </p>\n\n                    <p class=\"top-30\">\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </p>\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"pull-left\">\n        <h2>Workspace \"");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\" dashboard</h2>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n\n\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexWithoutKeysView", {hash:{
    'workspace': ("workspace")
  },hashTypes:{'workspace': "ID"},hashContexts:{'workspace': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>\n\n");
  return buffer;
  
});