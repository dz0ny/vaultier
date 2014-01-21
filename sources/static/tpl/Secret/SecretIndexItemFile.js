Ember.TEMPLATES["Secret/SecretIndexItemFile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            <div class=\"vlt-attrs\">\r\n                <table class=\"table table-bordered\">\r\n                    <colgroup>\r\n                        <col class=\"col-lg-1\">\r\n                        <col class=\"col-lg-7\">\r\n                    </colgroup>\r\n                    <tbody>\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "url", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "username", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "password", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "file", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "note", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                URL\r\n                            </td>\r\n                            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "url", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Username\r\n                            </td>\r\n                            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Password\r\n                            </td>\r\n                            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "password", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                File\r\n                            </td>\r\n                            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "file", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Note\r\n                            </td>\r\n                            <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "note", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  
  data.buffer.push("\r\n            <div class=\"alert alert-warning top-15\">\r\n                Cyphered data cannot be decoded\r\n            </div>\r\n        ");
  }

  data.buffer.push("<div class=\"vlt-wrapper\">\r\n    <div class=\"vlt-visual\">\r\n        <div class=\"vlt-icon\">\r\n        </div>\r\n        <div class=\"vlt-type\">\r\n            File\r\n        </div>\r\n    </div>\r\n    <div class=\"vlt-inner\">\r\n        <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "decoded", {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>");
  return buffer;
  
});
