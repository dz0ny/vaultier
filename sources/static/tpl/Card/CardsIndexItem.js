Ember.TEMPLATES["Card/CardsIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("vlt-item vlt-card-item")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Card.index", "", options) : helperMissing.call(depth0, "link-to", "Card.index", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <div class=\"vlt-header\">\n            <div class=\"vlt-icon\">\n                <img src=\"/static/images/icon-card-dark-blue.png\">\n            </div>\n            <div class=\"vlt-title\">\n                <h3>\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","INTEGER"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.ellipsis || depth0.ellipsis),stack1 ? stack1.call(depth0, "name", 35, options) : helperMissing.call(depth0, "ellipsis", "name", 35, options))));
  data.buffer.push("\n                </h3>\n\n            </div>\n        </div>\n        <div class=\"vlt-body\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "description", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n        <div class=\"vlt-footer\">\n            <div class=\"vlt-footer-item help-block pull-left\">\n                ");
  hashContexts = {'ellipsis': depth0,'prefix': depth0};
  hashTypes = {'ellipsis': "INTEGER",'prefix': "STRING"};
  options = {hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-footer-item help-block pull-right\">\n                ");
  hashContexts = {'prefix': depth0};
  hashTypes = {'prefix': "STRING"};
  options = {hash:{
    'prefix': ("Latest modification at:")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","INTEGER"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.ellipsis || depth0.ellipsis),stack1 ? stack1.call(depth0, "description", 250, options) : helperMissing.call(depth0, "ellipsis", "description", 250, options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                No description given\n            ");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "id", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  
});
