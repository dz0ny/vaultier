Ember.TEMPLATES["Card/CardIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                            Edit vault\r\n                        ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n\r\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Card.create", options) : helperMissing.call(depth0, "link-to", "Card.create", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                    Create new Card\r\n                ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.CardIndexItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n            <div class=\"jumbotron col-md-8 col-md-offset-2\">\r\n                <h1>You do not have any Card yet</h1>\r\n\r\n                <p>\r\n                    What are Cards for? This example is a quick exercise to illustrate how the default, static\r\n                    includes the responsive CSS and HTML, so it also adapts to your viewport and device.\r\n                </p>\r\n\r\n                <p class=\"top-30\">\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-primary")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Card.create", options) : helperMissing.call(depth0, "link-to", "Card.create", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n        ");
  return buffer;
  }
function program10(depth0,data) {
  
  
  data.buffer.push("\r\n                        <span class=\"glyphicon glyphicon-plus\"></span>\r\n                        Create new Card\r\n                    ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div>\r\n\r\n\r\n            <div class=\"btn-group\">\r\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-sm\" data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                </button>\r\n                <ul class=\"dropdown-menu caret-left\">\r\n\r\n                    <li>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Vault.edit", "workspace", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.edit", "workspace", "vault", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </li>\r\n                    <li><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteVault", "vault", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Delete vault</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <a href=\"#\" class=\"btn btn-default\">\r\n                <span class=\"glyphicon glyphicon-user\"></span>\r\n                Collaborate\r\n            </a>\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>");
  return buffer;
  
});
