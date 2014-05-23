Ember.TEMPLATES["Workspace/WorkspacesIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"vlt-page-toolbar pull-right\">\n\n            <div\n                    title=\"\n                    Workspaces are used to organize your secrets. All your vaults, cards and secrets are\n                    stored inside workspace. You can also collaborate with your team at the workspace\n                    \"\n                    data-toggle=\"tooltip\"\n                    data-placement=\"bottom\"\n                    >\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.create", options) : helperMissing.call(depth0, "link-to", "Workspaces.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        </div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                Create new workspace\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"col-md-8 col-md-offset-2\">\n                <h4>Please select workspace you want to work with</h4>\n\n                <div class=\"list-group\">\n                    ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n            </div>\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div class=\"jumbotron vlt-bigbox vlt-workspace col-md-8 col-md-offset-2\">\n                <div class=\"vlt-header\">\n                    <div class=\"vlt-icon\">\n\n                    </div>\n                    <div class=\"vlt-title\">\n                        <h1>You do not have any workspace yet</h1>\n                    </div>\n                </div>\n\n                <p>\n                    Workspaces are used to organize your secrets. All your vaults, cards and secrets are\n                    stored inside workspace. You can also collaborate with your team at the workspace\n                </p>\n\n                <p class=\"top-30\">\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspaces.create", options) : helperMissing.call(depth0, "link-to", "Workspaces.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </p>\n            </div>\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                        Create new workspace\n                    ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"clearfix\"></div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n</div>\n");
  return buffer;
  
});