Ember.TEMPLATES["Workspace/WorkspacesCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        <div class=\"vlt-dialog vlt-dialog-window\">\n            <form>\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"modal-header\">\n                        <h2>Create new workspace</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n\n                        <div class=\"col-md-8 col-md-offset-2\">\n\n                            <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("content.errors.name:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                                <label for=\"workspace-name\">Name</label>\n                                ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("workspace-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                <span class=\"error\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </span>\n                            </div>\n\n                            <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("content.errors.description:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                                <label for=\"workspace-description\">Description</label>\n                                ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("workspace-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                <span class=\"error\">\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </span>\n                            </div>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("saveDisabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Create new workspace\n                        </button>\n                    </div>\n\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n");
  return buffer;
  
});
