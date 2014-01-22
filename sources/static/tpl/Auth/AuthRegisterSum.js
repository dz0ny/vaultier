Ember.TEMPLATES["Auth/AuthRegisterSum"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-sum\">\r\n\r\n\r\n    <div class=\"row bottom-15\">\r\n        <div class=\"col-md-8 col-md-offset-2\">\r\n            <h4>Your key has been created and you have been logged in</h4>\r\n\r\n            <p>\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu.\r\n                nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n        <div class=\"row bottom-5\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-5 col-md-offset-1\">\r\n                    <b>\r\n                        Your email and username:\r\n                    </b>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "auth.user.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-5 col-md-offset-1\">\r\n                    <b>\r\n                        Your nickname:\r\n                    </b>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "auth.user.nickname", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row top-15\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-5 col-md-offset-1\">\r\n                    <b>\r\n                        Your private key\r\n                    </b>\r\n                    <br/>\r\n                    <span class=\"help-block\">\r\n                        Used instead of password. Please save if you did not yet.\r\n                    </span>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    <a class=\"btn btn-default btn-sm\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save your key file</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n");
  return buffer;
  
});
