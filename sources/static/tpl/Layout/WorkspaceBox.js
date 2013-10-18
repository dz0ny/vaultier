Ember.TEMPLATES["Layout/WorkspaceBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n    <div class=\"panel panel-default vlt-wspace-box pull-right dropdown\">\r\n\r\n        <img class=\"vlt-wspaceimg\" src=\"/static/images/user/rclick.png \">\r\n\r\n        <a href=\"#\" class=\"vlt-wspacename dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "env.workspace.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right\">\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Vault.index", "env.workspace.id", options) : helperMissing.call(depth0, "linkTo", "Vault.index", "env.workspace.id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Workspace.edit", "env.workspace.id", options) : helperMissing.call(depth0, "linkTo", "Workspace.edit", "env.workspace.id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n\r\n            <li class=\"divider\"></li>\r\n\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Workspace.index", options) : helperMissing.call(depth0, "linkTo", "Workspace.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n\r\n            <li class=\"divider\"></li>\r\n\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Workspace.create", options) : helperMissing.call(depth0, "linkTo", "Workspace.create", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    Go to workspace dashboard\r\n                ");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\r\n                    Setup workspace\r\n                ");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n                    Switch to another workspace\r\n                ");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                    Create new workspace\r\n                ");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "env.workspace", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
