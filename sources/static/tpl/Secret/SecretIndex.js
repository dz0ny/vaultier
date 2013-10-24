Ember.TEMPLATES["Secret/SecretIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                            Edit card\r\n                        ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n\r\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                    Create new secret\r\n                ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isNote", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isPassword", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isFile", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemNoteView", {hash:{
    'class': ("vlt-secret vlt-note")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemPasswordView", {hash:{
    'class': ("vlt-secret vlt-password")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemFileView", {hash:{
    'class': ("vlt-secret vlt-file")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n\r\n\r\n                <div class=\"jumbotron vlt-empty vlt-secret col-md-8 col-md-offset-2\">\r\n                    <div class=\"vlt-header\">\r\n                        <div class=\"vlt-icon\">\r\n\r\n                        </div>\r\n                        <div class=\"vlt-title\">\r\n                            <h1>You do not have any secret yet</h1>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p>\r\n                        What are secrets for? Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n                    </p>\r\n\r\n                    <p class=\"top-30\">\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-primary")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </p>\r\n                </div>\r\n            ");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\r\n                            <span class=\"glyphicon glyphicon-plus\"></span>\r\n                            Create new secret\r\n                        ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div>\r\n\r\n            <div class=\"btn-group\">\r\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-sm\" data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                </button>\r\n                <ul class=\"dropdown-menu caret-left\">\r\n                    <li>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Card.edit", "card", options) : helperMissing.call(depth0, "link-to", "Card.edit", "card", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </li>\r\n                    <li><a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteCard", "card", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" >Delete card</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <a href=\"#\" class=\"btn btn-default\">\r\n                <span class=\"glyphicon glyphicon-user\"></span>\r\n                Collaborate\r\n            </a>\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"pull-left\">\r\n        <h2>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "card.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\r\n    </div>\r\n\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"vlt-card-detail\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "length", {hash:{},inverse:self.program(14, program14, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
