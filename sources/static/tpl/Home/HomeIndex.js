Ember.TEMPLATES["Home/HomeIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Get started today <b> for\r\n                        free </b>");
  }

  data.buffer.push("<div class=\"vlt-hp\">\r\n    <div class=\"jumbotron\">\r\n        <div class=\"vlt-message\">\r\n            <div class=\"vlt-visual\">\r\n                <img src=\"/static/images/logo-hp.png\">\r\n            </div>\r\n            <div class=\"vlt-text\">\r\n                <h1>\r\n                    Vaultier\r\n                </h1>\r\n\r\n                <p class=\"lead\">\r\n                    Easy and secure password and credentials sharing across teams.\r\n                </p>\r\n\r\n                <p>\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-lg btn-success")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"row top-30\">\r\n        <div class=\"col-lg-4 vlt-feature vlt-feature-secure\">\r\n            <h2 class=\"bottom-30\">Absolutely Secure</h2>\r\n\r\n            <p class=\"lead\">\r\n                We use advanced security based on RSA encryption. All your data stored in our databases are cyphered and\r\n                cannot be readed by\r\n                anybody else than you and your team.\r\n            </p>\r\n\r\n            <!--\r\n            <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n            -->\r\n\r\n        </div>\r\n        <div class=\"col-lg-4 vlt-feature vlt-feature-team\">\r\n            <h2 class=\"bottom-30\">Team Productivity</h2>\r\n\r\n            <p class=\"lead\">Invite and colaborate with your team. You can selectively grant access permission to any\r\n                team member to share credentials. </p>\r\n\r\n            <!--\r\n            <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n            -->\r\n        </div>\r\n        <div class=\"col-lg-4 vlt-feature vlt-feature-cloud\">\r\n            <h2 class=\"bottom-30\">Cloud Solution</h2>\r\n\r\n            <p class=\"lead\">Vaultier is online. It is always available from web browser or mobile. No need to install,\r\n                works out of the box</p>\r\n\r\n            <!--\r\n            <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n            -->\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
