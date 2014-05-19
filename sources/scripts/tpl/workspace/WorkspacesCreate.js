Ember.TEMPLATES["Workspace/WorkspacesCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"modal-header\">\n                <h2>Create new workspace</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-10 col-md-offset-1\">\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"workspace-name\">Name</label>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"workspace-description\">Description</label>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                    Back\n                </a>\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Create new workspace\n                </button>\n            </div>\n\n        </div>\n    </form>\n</div>\n\n\n");
  return buffer;
  
});