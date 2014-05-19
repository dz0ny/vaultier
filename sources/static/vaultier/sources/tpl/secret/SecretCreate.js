Ember.TEMPLATES["Secret/SecretCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Choose secret you want to create\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Fillout data\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Submit\r\n                </a>\r\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <div class=\"vlt-dialog-header\">\r\n            <h2>Create new secret wizard</h2>\r\n\r\n            <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("createSelect")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("createSubmit")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n        <div class=\"vlt-dialog-body\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "tab", options) : helperMissing.call(depth0, "outlet", "tab", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"vlt-dialog-footer\">\r\n            <a href=\"javascript:history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                Back\r\n            </a>\r\n            ");
  stack1 = helpers['if'].call(depth0, "submitButtonShown", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});