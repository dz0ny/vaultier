Ember.TEMPLATES["Auth/AuthRegisterKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-8 col-md-offset-2\">\r\n                <h4>Your keys has been generated</h4>\r\n\r\n                <p>\r\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu.\r\n                    nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-5 col-md-offset-1\">\r\n                        <b>\r\n                            Your private key\r\n                        </b>\r\n                        <br/>\r\n                    <span class=\"help-block\">\r\n                        Used instead of password. Please save the key.\r\n                    </span>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <a class=\"btn btn-primary\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save your key file</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n    </div>\r\n\r\n\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n    <div class=\"generate\">\r\n        <h3>Please wait while generating your keys</h3>\r\n\r\n        <div class=\"vlt-preloader vlt-preloader-small\">\r\n        </div>\r\n    </div>\r\n");
  }

  data.buffer.push("<div class=\"vlt-register-keys\">\r\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "props.keysReady", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n");
  return buffer;
  
});
