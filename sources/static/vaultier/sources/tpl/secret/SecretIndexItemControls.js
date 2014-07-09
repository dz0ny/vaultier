Ember.TEMPLATES["Secret/SecretIndexItemControls"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n        <div class=\"vlt-buttons col-md-6\">\r\n            <div class=\"btn-group\">\r\n                <a type=\"button\"\r\n                   class=\"btn btn-default dropdown-toggle btn-sm\"\r\n                   data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                </a>\r\n                <ul class=\"dropdown-menu caret-left\">\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <li>\r\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Secret.edit", "id", options) : helperMissing.call(depth0, "link-to", "Secret.edit", "id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Secret.move", "id", options) : helperMissing.call(depth0, "link-to", "Secret.move", "id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </li>\r\n                    ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Edit secret");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Move secret to another card");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li>\r\n                            <a href=\"javascript:\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSecret", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete secret</a>\r\n                        </li>\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-controls\">\r\n    <div class=\"vlt-author col-md-6\">\r\n        <div class=\"vlt-footer-item help-block pull-left\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"vlt-footer-item help-block pull-right\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n\r\n    ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "(perms.update || perms.delete)", options) : helperMissing.call(depth0, "exp", "(perms.update || perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>");
  return buffer;
  
});