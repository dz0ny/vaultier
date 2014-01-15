Ember.TEMPLATES["Vault/VaultsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n\n        <div class=\"vlt-page-toolbar pull-right\">\n            <div>\n\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.exp || depth0.exp),stack1 ? stack1.call(depth0, "( workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.update || workspace.perms.delete)", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n            </div>\n        </div>\n\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-sm\" data-toggle=\"dropdown\">\n                            <span class=\"glyphicon glyphicon-cog\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu caret-left\">\n\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.update", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.delete", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        </ul>\n                    </div>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                                <li>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.edit", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "workspace.slug", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                                </li>\n                            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                                        Edit workspace\n                                    ");
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <li>\n                                    <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteWorkspace", "workspace", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Delete workspace</a>\n                                </li>\n                            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.memberIndex", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace.slug", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-user\"></span>\n                        Collaborate\n                    ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vaults.create", "workspace.slug", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace.slug", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program13(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            Create new vault\n                        ");
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\n\n            ");
  hashContexts = {'workspace': depth0};
  hashTypes = {'workspace': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexNotApprovedView", {hash:{
    'workspace': ("workspace")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            <div class=\"jumbotron vlt-empty vlt-vault col-md-8 col-md-offset-2\">\n                <div class=\"vlt-header\">\n                    <div class=\"vlt-icon\">\n\n                    </div>\n                    <div class=\"vlt-title\">\n                        <h1>You do not have any vault yet</h1>\n                    </div>\n                </div>\n\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n\n                    <p>\n                        What are vaults for? Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n                    </p>\n\n                    <p class=\"top-30\">\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-primary")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    </p>\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.exp || depth0.exp),stack1 ? stack1.call(depth0, "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.invite || workspace.perms.create || workspace.perms.update || workspace.perms.delete)", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    <div class=\"pull-left\">\n        <h2>Workspace dashboard</h2>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(18, program18, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    </div>\n</div>\n\n");
  return buffer;
  
});
