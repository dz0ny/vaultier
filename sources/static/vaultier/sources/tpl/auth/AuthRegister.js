Ember.TEMPLATES["Auth/AuthRegister"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Before you register\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Generate your keys\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Your credentials\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Finish registration\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                        Next\r\n                    ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        Do you have account already?\r\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                            Login to your account here\r\n                        ");
  }

  data.buffer.push("<div class=\"vlt-dialog vlt-register col-xs-12 col-md-10 col-md-offset-1 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <div class=\"vlt-dialog-header\">\r\n            <h2>Register to Vaultier</h2>\r\n\r\n            <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("before")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("keys")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("creds")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("sum")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-body\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "outlet", "AuthRegister", options))));
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-footer\">\r\n\r\n            <div class=\"pull-right vlt-right-buttons\">\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("props.nextButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </button>\r\n            </div>\r\n\r\n            <div class=\"vlt-left-buttons pull-left\">\r\n                    ");
  stack1 = helpers.unless.call(depth0, "props.loginButtonHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});