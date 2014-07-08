Ember.TEMPLATES["Auth/AuthLostKey"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    Create new account");
  }

  data.buffer.push("<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRecoveryKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Key Recovery</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row\">\n\n                    <div class=\"col-md-10\">\n\n                        <div class=\"form-group ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\">\n                            <label for=\"login-form-email\" class=\"col-md-4 control-label\">Email</label>\n\n                            <div class=\"col-md-6\">\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        Send\n                    </button>\n                </div>\n\n                <div class=\"pull-left vlt-right-buttons\">\n                    Do not have account yet? ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});