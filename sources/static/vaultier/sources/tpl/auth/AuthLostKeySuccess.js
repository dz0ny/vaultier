Ember.TEMPLATES["Auth/AuthLostKeySuccess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    Return to login\n                ");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Your request was successfully accepted.</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row\">\n                        <div class=\"col-md-12 text-center bottom-15\">\n                            <p>\n                                We have sent you an email with the instructions to recover your\n                                private key.\n                            </p>\n                        </div>\n                </div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});