Ember.TEMPLATES["Settings/ChangeKey"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n\n    <p>\n        Your public and private keypair has been generated.\n        Please follow steps to finish procedure\n    </p>\n\n\n    <div class=\"bottom-15 top-30\">\n        <h4>\n            <div class=\"label label-header\">1</div>\n            Save private key key to your computer\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your private key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Used instead of password. Please save the key.\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePrivateKey", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn view.privateKeySaved:btn-default:btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                    >\n                Save private key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"bottom-15  top-30\">\n        <h4>\n            <div class=\"label label-header\">2</div>\n            Send your public key to server\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your public key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Will be sent to server and cyphers is going to be rebuilt\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("view.publicButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn view.privateKeySaved:btn-primary:btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePublicKey", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    class=\"btn btn-default\">\n                Submit public key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n\n\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\" text-center top-30\">\n        <h4>Please wait while generating your keys...</h4>\n\n        <div class=\"vlt-preloader vlt-preloader-small\">\n        </div>\n    </div>\n");
  }

  stack1 = helpers['if'].call(depth0, "view.keys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});