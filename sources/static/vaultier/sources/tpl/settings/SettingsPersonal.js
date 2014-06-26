Ember.TEMPLATES["Settings/SettingsPersonal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>Personal settings</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2\">\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.email:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"register-form-email\" class=\"control-label\">Email *</label>\n\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.nickname:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"register-form-nickname\" class=\"control-label\">Your nickname *</label>\n\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Save changes</a>\n            </div>\n\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});