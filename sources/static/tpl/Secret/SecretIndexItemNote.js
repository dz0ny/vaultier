Ember.TEMPLATES["Secret/SecretIndexItemNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n            <h3 class=\"top-0\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\r\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n            <div class=\"vlt-attrs\">\r\n                <div class=\"vlt-markdown\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.renderMarkdown || depth0.renderMarkdown),stack1 ? stack1.call(depth0, "note", options) : helperMissing.call(depth0, "renderMarkdown", "note", options))));
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n            <div class=\"alert alert-warning top-15\">\r\n                Encrypted data cannot be decrypted\r\n            </div>\r\n        ");
  }

  data.buffer.push("<div class=\"vlt-wrapper\">\r\n    <div class=\"vlt-visual\">\r\n        <div class=\"vlt-icon\">\r\n        </div>\r\n        <div class=\"vlt-type\">\r\n            Note\r\n        </div>\r\n    </div>\r\n    <div class=\"vlt-inner\">\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "name", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "decoded", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>");
  return buffer;
  
});
