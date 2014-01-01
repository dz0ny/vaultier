Ember.TEMPLATES["Settings/SettingsPersonal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog\">\n    <div class=\"vlt-dialog-content\">\n        <div class=\"vlt-dialog-header\">\n            <h2>Personal settings</h2>\n        </div>\n\n        <form class=\"form-horizontal\" role=\"form\">\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("errors.email:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                    <label for=\"register-form-email\" class=\"col-lg-4 control-label\">Email *</label>\n\n                    <div class=\"col-lg-4\">\n                        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("errors.nickname:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                    <label for=\"register-form-nickname\" class=\"col-lg-4 control-label\">Your nickname *</label>\n\n                    <div class=\"col-lg-4\">\n                        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </span>\n                    </div>\n                </div>\n\n                <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("errors.nickname:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                    <div class=\"col-sm-4 col-sm-offset-4\">\n                        <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Save changes</a>\n                    </div>\n                </div>\n\n                <br/>\n            </div>\n\n        </form>\n\n\n    </div>\n</div>");
  return buffer;
  
});
