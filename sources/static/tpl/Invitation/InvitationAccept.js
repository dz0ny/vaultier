Ember.TEMPLATES["Invitation/InvitationAccept"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n\r\n                                    <tr>\r\n                                        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "role.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" by user ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "role.created_by", options) : helperMissing.call(depth0, "printUser", "role.created_by", options))));
  data.buffer.push(" </td>\r\n                                    </tr>\r\n\r\n                                ");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"vlt-dialog vlt-tabs-modal\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>You have pending invitations</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n\r\n                        <div class=\"col-md-8 col-md-offset-2 top-15 bottom-30\">\r\n                            <div class=\"bottom-15\">\r\n                                You have been invited to Vaultier.\r\n                                <b>Please see invitations to accept:</b>\r\n                            </div>\r\n                            <table class=\"table vlt-table table-bordered\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "role", "in", "content", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </table>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"#\" class=\"btn btn-default btn-sm\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rejectInvitations", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n                            <span class=\"glyphicon glyphicon-remove\"></span>\r\n                            Reject invitations\r\n                        </a>\r\n                        <a href=\"#\" class=\"btn btn-primary btn\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "acceptInvitations", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                            Accept invitations\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});
