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