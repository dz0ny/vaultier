Ember.TEMPLATES["Auth/AuthRegisterKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-8 col-md-offset-2\">\r\n                <h4>We have generated your private and public key pair. </h4>\r\n\r\n                <p>\r\n                    Public key will be uploaded to Vaultier.\r\n                    But private key is only for you and will be used to log into the Vaultier and to encrypt your\r\n                    secrets.\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1 text-center\">\r\n                    <a class=\"btn btn-primary\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save your private key file to your computer</a>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n                    <p>\r\n                        Private key is used instead of password to log into Vaultier.\r\n                        Please keep private key safe and do not give it to anybody.\r\n                        Without private key you will not be able to log into Vaultier\r\n                        and your data will be rendered unreadable.\r\n                    </p>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n    </div>\r\n\r\n\r\n");
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
