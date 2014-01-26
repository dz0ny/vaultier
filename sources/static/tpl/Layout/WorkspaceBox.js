Ember.TEMPLATES["Layout/WorkspaceBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n    <div class=\"vlt-wspace-box dropdown\">\r\n\r\n        <img class=\"vlt-wspaceimg\" src=\"/static/images/icon-workspace-white.png \">\r\n\r\n        <a href=\"#\" class=\"vlt-wspacename dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","INTEGER"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.ellipsis || depth0.ellipsis),stack1 ? stack1.call(depth0, "env.workspace.cleanValues.name", 20, options) : helperMissing.call(depth0, "ellipsis", "env.workspace.cleanValues.name", 20, options))));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right\">\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.index", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.index", "env.workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "env.workspace.perms.update", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n            <li class=\"divider\"></li>\r\n\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspaces.select", options) : helperMissing.call(depth0, "link-to", "Workspaces.select", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    Go to workspace dashboard\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n            <li>\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.edit", "env.workspace", options) : helperMissing.call(depth0, "link-to", "Workspace.edit", "env.workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </li>\r\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    Setup workspace\r\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                    Switch to another workspace\r\n                ");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "env.workspace", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
