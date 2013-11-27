Ember.TEMPLATES["Settings/SettingsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Settings.personal", options) : helperMissing.call(depth0, "link-to", "Settings.personal", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                    My profile\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Settings.workspaces", options) : helperMissing.call(depth0, "link-to", "Settings.workspaces", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\n                    My workspaces\n                ");
  }

  data.buffer.push("<br/>\n<br/>\n\n<div class=\"row\">\n    <div class=\"col-md-3\">\n        <ul class=\"nav nav-pills nav-stacked\">\n            ");
  hashContexts = {'tab': depth0};
  hashTypes = {'tab': "STRING"};
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("personal")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  hashContexts = {'tab': depth0};
  hashTypes = {'tab': "STRING"};
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("workspaces")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n    </div>\n\n    <div class=\"col-md-9\">\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet || depth0.outlet),stack1 ? stack1.call(depth0, "Settings", options) : helperMissing.call(depth0, "outlet", "Settings", options))));
  data.buffer.push("\n    </div>\n\n</div>\n\n\n\n\n\n");
  return buffer;
  
});
