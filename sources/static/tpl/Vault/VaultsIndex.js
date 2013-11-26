Ember.TEMPLATES["Vault/VaultsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n        <div class=\"vlt-page-toolbar pull-right\">\r\n            <div>\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.invite", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </div>\r\n        </div>\r\n\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.memberIndex", "workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.memberIndex", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                        <span class=\"glyphicon glyphicon-user\"></span>\r\n                        Collaborate\r\n                    ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                            <span class=\"glyphicon glyphicon-plus\"></span>\r\n                            Create new vault\r\n                        ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\r\n\r\n            ");
  hashContexts = {'workspace': depth0};
  hashTypes = {'workspace': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexNotApprovedView", {hash:{
    'workspace': ("workspace")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            <div class=\"jumbotron vlt-empty vlt-vault col-md-8 col-md-offset-2\">\r\n                <div class=\"vlt-header\">\r\n                    <div class=\"vlt-icon\">\r\n\r\n                    </div>\r\n                    <div class=\"vlt-title\">\r\n                        <h1>You do not have any vault yet</h1>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "workspace.perms.create", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </div>\r\n        ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n\r\n                    <p>\r\n                        What are vaults for? Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n                    </p>\r\n\r\n                    <p class=\"top-30\">\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-primary")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vaults.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vaults.create", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </p>\r\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.exp || depth0.exp),stack1 ? stack1.call(depth0, "( workspace.perms.invite || workspace.perms.create)", options) : helperMissing.call(depth0, "exp", "( workspace.perms.invite || workspace.perms.create)", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    <div class=\"pull-left\">\r\n        <h2>Dashboard - list of vaults</h2>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
