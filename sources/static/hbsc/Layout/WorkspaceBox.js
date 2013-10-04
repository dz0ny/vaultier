Ember.TEMPLATES["Layout/WorkspaceBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                Create new workspace\r\n            ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                Switch to another workspace\r\n            ");
  }

  data.buffer.push("<div class=\"panel panel-default vlt-wspace-box pull-right dropdown\">\r\n\r\n    <img class=\"vlt-wspaceimg\" src=\"/static/images/user/rclick.png \">\r\n\r\n    <a href=\"#\" class=\"vlt-wspacename dropdown-toggle\" data-toggle=\"dropdown\">\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "tstval", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Vault ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "urcite", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    </a>\r\n\r\n    <ul class=\"dropdown-menu\">\r\n        <li>\r\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Workspace.create", options) : helperMissing.call(depth0, "linkTo", "Workspace.create", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n         </li>\r\n        <li>\r\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "Workspace.switch", options) : helperMissing.call(depth0, "linkTo", "Workspace.switch", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n        </li>\r\n    </ul>\r\n</div>\r\n");
  return buffer;
  
});
