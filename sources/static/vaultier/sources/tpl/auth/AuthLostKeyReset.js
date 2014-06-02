Ember.TEMPLATES["Auth/AuthLostKeyReset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                            <div class=\"row\">\n                                <div class=\"col-md-5\">\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "workspace_name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                                <div class=\"col-md-5\">\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "is_recoverable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                            </div>\n\n                        ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Rebuild your lost key</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row\">\n\n                    <div class=\"col-md-10\">\n                        <h4>Workspace encrypted data recovery</h4>\n\n                        <p>\n                            After you rebuild your private key access to encrypted workspace data has to be recovered.\n                        </p>\n\n                        <p>\n                            Recovery is possible only to workspaces where more than one member exists. Your access will\n                            be recovered once at least one of your workspace collaborators goes online.\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-10\">\n                        <div class=\"row\">\n                            <div class=\"col-md-5\">\n                                <h6>workspace</h6>\n                            </div>\n                            <div class=\"col-md-5\">\n                                <h6>Possible recovery</h6>\n                            </div>\n                        </div>\n\n                        <hr>\n                        ");
  stack1 = helpers.each.call(depth0, "workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    <button type=\"submit\" class=\"btn btn-primary ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRebuildKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\n                        Dissable current lost key\n                    </button>\n                    <button type=\"submit\" class=\"btn btn-primary ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendDisableCurrentKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\n                        Rebuild your lost key\n                    </button>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});