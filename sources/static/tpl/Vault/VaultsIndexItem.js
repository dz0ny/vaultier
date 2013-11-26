Ember.TEMPLATES["Vault/VaultsIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("vlt-item vlt-vault-item")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Cards.index", "", options) : helperMissing.call(depth0, "link-to", "Cards.index", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n        <div class=\"vlt-header\">\r\n            <div class=\"vlt-icon\">\r\n                <img src=\"/static/images/icon-vault-dark-blue.png\">\r\n            </div>\r\n            <div class=\"vlt-title\">\r\n                <h3>\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","INTEGER"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.ellipsis || depth0.ellipsis),stack1 ? stack1.call(depth0, "name", 35, options) : helperMissing.call(depth0, "ellipsis", "name", 35, options))));
  data.buffer.push("\r\n                </h3>\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"vlt-body\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "description", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"vlt-footer\">\r\n            <div class=\"vlt-footer-item help-block\">\r\n                Updated: ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\r\n            </div>\r\n            <div class=\"vlt-footer-item help-block\">\r\n                By ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","INTEGER"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.ellipsis || depth0.ellipsis),stack1 ? stack1.call(depth0, "description", 250, options) : helperMissing.call(depth0, "ellipsis", "description", 250, options))));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                No description given\r\n            ");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "id", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});
