Ember.TEMPLATES["Settings/ChangeKey"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n\n    <p>\n        Your public and private keypair has been generated.\n        Please follow steps to finish procedure\n    </p>\n\n\n    <div class=\"bottom-15 top-30\">\n        <h4>\n            <div class=\"label label-header\">1</div>\n            Save private key key to your computer\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your private key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Used instead of password. Please save the key.\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "ID"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePrivateKey", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":btn view.privateKeySaved:btn-default:btn-primary")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\n                    >\n                Save private key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"bottom-15  top-30\">\n        <h4>\n            <div class=\"label label-header\">2</div>\n            Send your public key to server\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your public key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Will be sent to server and cyphers is going to be rebuilt\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("view.publicButtonDisabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":btn view.privateKeySaved:btn-primary:btn-default")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\n                ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "ID"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePublicKey", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    class=\"btn btn-default\">\n                Submit public key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n\n\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\" text-center top-30\">\n        <h4>Please wait while generating your keys...</h4>\n\n        <div class=\"vlt-preloader vlt-preloader-small\">\n        </div>\n    </div>\n");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "view.keys", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
