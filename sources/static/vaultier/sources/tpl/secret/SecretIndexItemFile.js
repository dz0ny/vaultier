Ember.TEMPLATES["Secret/SecretIndexItemFile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"vlt-attrs\">\r\n                <table class=\"table table-bordered\">\r\n                    <colgroup>\r\n                        <col class=\"col-lg-1\">\r\n                        <col class=\"col-lg-7\">\r\n                    </colgroup>\r\n                    <tbody>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "filename", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "filesize", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "__hidden__filetype", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "note", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                URL\r\n                            </td>\r\n                            <td>");
  stack1 = helpers._triageMustache.call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Username\r\n                            </td>\r\n                            <td>");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Password\r\n                            </td>\r\n                            <td>");
  stack1 = helpers._triageMustache.call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Filename\r\n                            </td>\r\n                            <td>\r\n                                ");
  stack1 = helpers._triageMustache.call(depth0, "filename", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadBlob", "content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-default btn-sm pull-right\">\r\n                                    <span class=\"glyphicon glyphicon-save\"></span>\r\n                                    Save to computer\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Filesize\r\n                            </td>\r\n                            <td>");
  data.buffer.push(escapeExpression((helper = helpers.humanFilesize || (depth0 && depth0.humanFilesize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "filesize", options) : helperMissing.call(depth0, "humanFilesize", "filesize", options))));
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Mime type\r\n                            </td>\r\n                            <td>");
  stack1 = helpers._triageMustache.call(depth0, "filetype", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        <tr>\r\n                            <td class=\"vlt-attr-name\">\r\n                                Note\r\n                            </td>\r\n                            <td>\r\n                                <div class=\"vlt-markdown\">\r\n                                    ");
  data.buffer.push(escapeExpression((helper = helpers.renderMarkdown || (depth0 && depth0.renderMarkdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "note", options) : helperMissing.call(depth0, "renderMarkdown", "note", options))));
  data.buffer.push("\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    ");
  return buffer;
  }

function program16(depth0,data) {
  
  
  data.buffer.push("\r\n            <div class=\"alert alert-warning top-15\">\r\n                Encrypted data cannot be decrypted\r\n            </div>\r\n        ");
  }

  data.buffer.push("<div class=\"vlt-wrapper\">\r\n    <div class=\"vlt-visual\">\r\n        <div class=\"vlt-icon\">\r\n        </div>\r\n        <div class=\"vlt-type\">\r\n            File\r\n        </div>\r\n    </div>\r\n    <div class=\"vlt-inner\">\r\n        <h3 class=\"top-0\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\r\n\r\n        ");
  stack1 = helpers['if'].call(depth0, "decrypted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(16, program16, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    </div>\r\n</div>");
  return buffer;
  
});