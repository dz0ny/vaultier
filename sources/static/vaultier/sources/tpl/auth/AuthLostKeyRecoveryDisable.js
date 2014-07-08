Ember.TEMPLATES["Auth/AuthLostKeyRecoveryDisable"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                                Register\n                            ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Disable your workspaces</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"col-md-8 col-md-offset-2\">\n                            <div class=\"vlt-dialog-body\">\n                                <div class=\"text-center\">\n                                    Your key was disabled.\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});