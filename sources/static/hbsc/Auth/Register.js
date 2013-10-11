Ember.TEMPLATES["Auth/Register"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("Login to your\r\n                    account here");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                            Finish\r\n                        ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                            Next\r\n                        ");
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"modal-dialog vlt-tabs-modal vlt-register\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <h2>Register to Vaultier</h2>\r\n\r\n                    <ul class=\"nav nav-pills vlt-register-tabs\" id=\"myTab\">\r\n                        <li class=\"AuthRegisterBefore\">\r\n                            <a>\r\n                                Before you register\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n                        <li class=\"AuthRegisterKeys\">\r\n                            <a>\r\n                                Generate your keys\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n\r\n                        <li class=\"AuthRegisterCreds\">\r\n                            <a>\r\n                                Your credentials\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n                        <li class=\"AuthRegisterSum\">\r\n                            <a>\r\n                                Finish registration\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n\r\n                    </ul>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n\r\n                    <div class=\"tab-content\">\r\n                        <div class=\"tab-pane active\" id=\"login-latest\">\r\n\r\n                            <div class=\"row\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet || depth0.outlet),stack1 ? stack1.call(depth0, "tab", options) : helperMissing.call(depth0, "outlet", "tab", options))));
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"tab-pane\" id=\"login-switch\">\r\n\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    Do you have account already? ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("isNextDisabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isLastTab", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </button>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});
