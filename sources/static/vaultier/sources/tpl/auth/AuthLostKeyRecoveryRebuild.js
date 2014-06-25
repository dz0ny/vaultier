Ember.TEMPLATES["Auth/AuthLostKeyRecoveryRebuild"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"text-center\">\n                            You are about to generate a new private key.\n                            Click the bottom bellow and follow the instructions.\n                            <br/>\n                            <br/>\n                            <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "generate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Generate new private key</a>\n                        </div>\n                    </div>\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['change-key'] || (depth0 && depth0['change-key']),options={hash:{
    'action': ("save")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "change-key", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <div class=\"vlt-dialog-header\">\n            <h2>Private key</h2>\n        </div>\n        <div class=\"vlt-dialog-body\">\n\n            <div class=\"col-md-8 col-md-offset-2\">\n                ");
  stack1 = helpers['if'].call(depth0, "stepInfo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "stepKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});