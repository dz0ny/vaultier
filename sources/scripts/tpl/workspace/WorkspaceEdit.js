Ember.TEMPLATES["Workspace/WorkspaceEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Edit workspace</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"workspace-name\">Name</label>\r\n\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span></div>\r\n\r\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                        <label for=\"workspace-description\">Description</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    Back\r\n                </a>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Save changes\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n    </form>\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});