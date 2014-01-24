Ember.TEMPLATES["Secret/SecretIndexItemControls"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n    <div class=\"vlt-buttons col-md-6\">\r\n        <div class=\"btn-group\">\r\n            <a type=\"button\"\r\n               class=\"btn btn-default dropdown-toggle btn-sm\"\r\n               data-toggle=\"dropdown\">\r\n                <span class=\"glyphicon glyphicon-cog\"></span>\r\n            </a>\r\n            <ul class=\"dropdown-menu caret-left\">\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "perms.update", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "perms.delete", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                    <li>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.edit", "id", options) : helperMissing.call(depth0, "link-to", "Secret.edit", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.move", "id", options) : helperMissing.call(depth0, "link-to", "Secret.move", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </li>\r\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Edit secret");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Move secret to another card");
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                    <li>\r\n                        <a href=\"javascript:\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSecret", "", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Delete secret</a>\r\n                    </li>\r\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-controls\">\r\n    <div class=\"help-block vlt-author col-md-6\">\r\n        <div class=\"vlt-footer-item help-block pull-left\">\r\n            ");
  hashContexts = {'ellipsis': depth0,'prefix': depth0};
  hashTypes = {'ellipsis': "INTEGER",'prefix': "STRING"};
  options = {hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"vlt-footer-item help-block pull-right\">\r\n            ");
  hashContexts = {'prefix': depth0};
  hashTypes = {'prefix': "STRING"};
  options = {hash:{
    'prefix': ("Latest modification at:")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.exp || depth0.exp),stack1 ? stack1.call(depth0, "(perms.update || perms.delete)", options) : helperMissing.call(depth0, "exp", "(perms.update || perms.delete)", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n</div>");
  return buffer;
  
});
