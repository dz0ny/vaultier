Ember.TEMPLATES["Layout/SecurityBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    <div class=\"panel panel-default vlt-security-box dropdown pull-right\">\r\n        ");
  hashContexts = {'size': depth0,'class': depth0};
  hashTypes = {'size': "INTEGER",'class': "STRING"};
  options = {hash:{
    'size': (32),
    'class': ("vlt-avatar")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.gravatarImg || depth0.gravatarImg),stack1 ? stack1.call(depth0, "auth.user.email", options) : helperMissing.call(depth0, "gravatarImg", "auth.user.email", options))));
  data.buffer.push("\r\n\r\n        <a href=\"#\" class=\"vlt-username dropdown-toggle\" data-toggle=\"dropdown\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "auth.user.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        </a>\r\n\r\n        <ul class=\"dropdown-menu caret-right vlt-dropdown\">\r\n            <li><a ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "ID"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"\" >Personal settings</a></li>\r\n            <li><a ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "ID"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"\" >Logout</a></li>\r\n\r\n            <li><a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "ID"};
  options = {hash:{
    'href': ("auth.token")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"copy-token\" >Copy token to clipboard</a></li>\r\n        </ul>\r\n    </div>\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    <div class=\" vlt-security-box pull-right\">\r\n       ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary btn-sm")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n       ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    </div>\r\n");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Login");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "auth.isAuthenticated", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
