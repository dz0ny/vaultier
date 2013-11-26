Ember.TEMPLATES["Invitation/InvitationAnonymous"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"vlt-dialog vlt-tabs-modal\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>You have been invited to vaultier</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n\r\n                        <div class=\"col-md-8 col-md-offset-2 top-30 bottom-30\">\r\n                            <b>\r\n                                Before further procceeding we need you to have account. Please login or create new\r\n                                account.\r\n                            </b>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
