Ember.TEMPLATES["Auth/AuthLostKeyRecoveryReset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                        <tr>\n                                            <td>\n                                                ");
  stack1 = helpers._triageMustache.call(depth0, "workspace_name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </td>\n                                            <td>\n                                                ");
  stack1 = helpers['if'].call(depth0, "is_recoverable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </td>\n                                        </tr>\n                                    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                                                    <strong class=\"text-success\">Yes</strong>\n                                                ");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                                                    <strong class=\"text-danger\">No</strong>\n                                                ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <form class=\"form-horizontal\" role=\"form\">\n\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Rebuild your lost key</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row bottom-15\">\n\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <h3>Workspace encrypted data recovery</h3>\n\n                                <p>\n                                    After you rebuild your private key access to encrypted workspace data has to be\n                                    recovered.\n                                    Recovery is possible only to workspaces where more than one member exists.\n                                    Your access will be recovered once at least one of your workspace collaborators goes\n                                    online.\n                                </p>\n                            </div>\n                        </div>\n                        <div class=\"row table-responsive\">\n                            <div class=\"col-md-10 col-md-offset-1\">\n                                <table class=\"table table-condensed\">\n                                    <thead>\n                                    <tr>\n                                        <th>Workspace</th>\n                                        <th>Possible recovery</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    ");
  stack1 = helpers.each.call(depth0, "content.memberships", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n\n                        <div class=\"pull-right vlt-right-buttons\">\n                            <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "disableKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                                Disable current lost key\n                            </button>\n                            <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rebuildKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                                Rebuild your lost key\n                            </button>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});