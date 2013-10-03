Ember.TEMPLATES["Vault/List"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n            <span class=\"glyphicon glyphicon-plus\"></span>\r\n            New Vault\r\n\r\n        ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.VaultItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n            NO ITEMS. DESIGN WILL BE PROVIDED LATER\r\n        ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    <ul class=\"vlt-page-tabs nav nav-tabs\">\r\n        <li class=\"active\"><a href=\"#\">Home</a></li>\r\n        <li><a href=\"#\">Profile</a></li>\r\n        <li><a href=\"#\">Messages</a></li>\r\n    </ul>\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div class=\"btn-group\">\r\n\r\n            <a href=\"#\" class=\"btn btn-sm btn-default\">\r\n                <span class=\"glyphicon glyphicon-pencil\"></span>\r\n                Edit vault\r\n            </a>\r\n\r\n            <div class=\"btn-group\">\r\n                <a href=\"#\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-sort\"></span>\r\n                    Dropdown\r\n                    <b class=\"caret\"></b>\r\n                </a>\r\n\r\n                <ul class=\"dropdown-menu\">\r\n                    <li><a href=\"#\">Most recent</a></li>\r\n                    <li><a href=\"#\">Alphabetically</a></li>\r\n                    <li class=\"divider\"></li>\r\n                    <li><a href=\"#\">Separated link</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n        <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createVault", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-default btn-sm\">\r\n            <span class=\"glyphicon glyphicon-plus\"></span>\r\n            TEST ALERT\r\n        </a>\r\n\r\n        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "VaultList.new", options) : helperMissing.call(depth0, "linkTo", "VaultList.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
