Ember.TEMPLATES["Auth/AuthLostKeyIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div class=\"col-md-12 center text-center\">\r\n                            <h2 class=\"text-success\">Your request was successfully send</h2>\r\n\r\n                            <p>\r\n                                We have send you an email with the instructions to recover your\r\n                                private key.\r\n                            </p>\r\n\r\n                            <p>\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </p>\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                                    Return to login\r\n                                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div class=\"col-md-12 bottom-15\">\r\n\r\n                            <div class=\"callout callout-info\">\r\n                                <p>\r\n                                    You have forgotten your key, we are ready to renew your access key. Please enter\r\n                                    your email below and we will send email to you with further instructions.\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-8\">\r\n\r\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"login-form-email\" class=\"col-lg-4 control-label pull-left\">Email</label>\r\n\r\n                                <div class=\"col-lg-8\">\r\n                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email"),
    'require': ("true")
  },hashTypes:{'id': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING",'require': "STRING"},hashContexts:{'id': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0,'require': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                    <span class=\"error\">\r\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header text-center\">\r\n                <h4>Retrieve your lost key</h4>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "emailWasSuccessfullySend", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n\r\n                <div class=\"pull-right vlt-right-buttons\">\r\n                    <button type=\"submit\"\r\n                        ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRecoveryKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("emailWasSuccessfullySend")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                            class=\"btn btn-primary\">\r\n                        Send\r\n                    </button>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>");
  return buffer;
  
});