Ember.TEMPLATES["Secret/SecretCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                            <a>\r\n                            Select secret type\r\n                            <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        ");
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"modal-dialog vlt-tabs-modal vlt-login\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <h2>Login</h2>\r\n\r\n                    <ul class=\"nav nav-pills vlt-wizard-steps\" id=\"myTab\">\r\n                        ");
  hashContexts = {'tab': depth0};
  hashTypes = {'tab': "STRING"};
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("Secret.create")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        <li class=\"AuthRegisterKeys\">\r\n                            <a>\r\n                                Generate your keys\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n\r\n                        <li class=\"AuthRegisterCreds\">\r\n                            <a>\r\n                                Your credentials\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n                        <li class=\"AuthRegisterSum\">\r\n                            <a>\r\n                                Finish registration\r\n                                <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                            </a>\r\n                        </li>\r\n\r\n                </div>\r\n                <div class=\"modal-body\">\r\n\r\n                    <div class=\"tab-content\">\r\n                        <div class=\"tab-pane active\">\r\n                            AAA\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    BUTTON\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});
