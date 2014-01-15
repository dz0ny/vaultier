Ember.TEMPLATES["Auth/AuthRegisterCreds"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-creds\">\r\n\r\n    <div class=\"row bottom-15\">\r\n        <div class=\"col-md-8 col-md-offset-2\">\r\n            <h4>Please submit yout credentials</h4>\r\n\r\n            <p>\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu.\r\n                nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"vlt-section\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n            <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("errors.email:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                <label for=\"register-form-email\" class=\"col-lg-4 control-label\">Email *</label>\r\n\r\n                <div class=\"col-lg-4\">\r\n                    ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    <span class=\"error\">\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("errors.nickname:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                <label for=\"register-form-nickname\" class=\"col-lg-4 control-label\">Your nickname *</label>\r\n\r\n                <div class=\"col-lg-4\">\r\n                    ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    <span class=\"error\">\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </span>\r\n                </div>\r\n            </div>\r\n\r\n            <br/>\r\n\r\n        </form>\r\n    </div>\r\n\r\n\r\n</div>\r\n");
  return buffer;
  
});
