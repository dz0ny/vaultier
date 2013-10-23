Ember.TEMPLATES["Vault/VaultIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n        <div class=\"vlt-page-toolbar pull-right\">\r\n            <div class=\"btn-group\">\r\n\r\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vault.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vault.create", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n            </div>\r\n        </div>\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                    Create new vault\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultIndexItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n            <div class=\"jumbotron vlt-empty vlt-vault col-md-8 col-md-offset-2\">\r\n                <div class=\"vlt-header\">\r\n                    <div class=\"vlt-icon\">\r\n\r\n                    </div>\r\n                    <div class=\"vlt-title\">\r\n                        <h1>You do not have any vault yet</h1>\r\n                    </div>\r\n                </div>\r\n\r\n                <p>\r\n                    What are vaults for? This example is a quick exercise to illustrate how the default, static\r\n                    includes the responsive CSS and HTML, so it also adapts to your viewport and device.\r\n                </p>\r\n\r\n                <p class=\"top-30\">\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-primary")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vault.create", "workspace", options) : helperMissing.call(depth0, "link-to", "Vault.create", "workspace", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                        <span class=\"glyphicon glyphicon-plus\"></span>\r\n                        Create new vault\r\n                    ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    <div class=\"pull-left\">\r\n        <h2>List of vaults</h2>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
