Ember.TEMPLATES["Workspace/WorkspacesIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n    <div class=\"vlt-icon\">\n        <img src=\"/static/images/icon-workspace-grey.png\"/>\n    </div>\n    <div class=\"vlt-text\">\n        <h4 class=\"list-group-item-heading\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\n\n        <p class=\"list-group-item-text\">\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        </p>\n\n        ");
  hashContexts = {'workspace': depth0};
  hashTypes = {'workspace': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexWithoutKeysView", {hash:{
    'workspace': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        <div class=\"top-15\">\n            <div class=\"vlt-footer-item help-block pull-left\">\n                ");
  hashContexts = {'ellipsis': depth0,'prefix': depth0};
  hashTypes = {'ellipsis': "INTEGER",'prefix': "STRING"};
  options = {hash:{
    'ellipsis': (20),
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
  data.buffer.push("\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"clearfix\"></div>\n    </div>\n\n");
  return buffer;
  }

  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("list-group-item vlt-workspace-item")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Workspace.index", "slug", options) : helperMissing.call(depth0, "link-to", "Workspace.index", "slug", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n\n\n");
  return buffer;
  
});
