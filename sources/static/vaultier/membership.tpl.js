Ember.TEMPLATES["Member/MemberManagerAccordion"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.each.call(depth0, "role", "in", "roles", {hash:{
    'itemController': ("role")
  },hashTypes:{'itemController': "ID"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <div class=\"list-group-item\">\n                        <div class=\"col-md-3\">\n                             <span data-toggle=\"tooltip\" data-placement=\"top\" title=\"type\">\n                                 ");
  stack1 = helpers['if'].call(depth0, "role.to_card", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                             </span>\n                        </div>\n                        <div class=\"col-md-3\">\n                            <span data-toggle=\"tooltip\" data-placement=\"top\" title=\"name\">\n                                ");
  stack1 = helpers['if'].call(depth0, "role.to_card", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </span>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"col-md-8 vlt-edit-perms\">\n                                ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                <span data-toggle='tooltip'\n                                      class=\"label label-warning\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </span>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <a class=\"vlt-delete btn btn-default btn-sm\">\n                                    <span class=\"glyphicon glyphicon-trash\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></span>\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\n                                     Card\n                                 ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                     ");
  stack1 = helpers['if'].call(depth0, "role.to_vault", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                 ");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push("\n                                         Vault\n                                     ");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                         ");
  stack1 = helpers['if'].call(depth0, "role.to_workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                     ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                                             Workspace\n                                         ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                    ");
  stack1 = helpers['if'].call(depth0, "role.to_vault", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_vault.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                        ");
  stack1 = helpers['if'].call(depth0, "role.to_workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }

function program19(depth0,data) {
  
  
  data.buffer.push("\n                                    <span class=\"label label-warning\">\n                                        Does not have workspace key yet\n                                    </span>\n                                ");
  }

function program21(depth0,data) {
  
  
  data.buffer.push("\n                                    <span class=\"label label-warning\">\n                                        Invited only. Did not show up yet!\n                                    </span>\n                                ");
  }

  data.buffer.push("<div class=\"table vlt-table\">\n\n    <div class=\"vlt-row\">\n        <div class=\"vlt-col col-md-1\" role=\"button\">\n            <button type=\"button\" class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteMember", "member", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                <span class=\"glyphicon glyphicon-remove\"></span>\n            </button>\n        </div>\n        <div class=\"vlt-col  col-md-6 col-md-offset-3\"><span\n                class=\"lead\">");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "member", options) : helperMissing.call(depth0, "printUser", "member", options))));
  data.buffer.push("</span>\n        </div>\n        <div class=\"vlt-col col-md-2 pull-right\">\n\n            <a class=\"btn btn-default accordion-toggle\" type=\"button\" data-toggle=\"collapse\"\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("targetElement")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadRoles", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n                Display permissions\n                <span class=\"caret vlt-caret\"></span>\n            </a>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"vlt-row collapse\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'id': ("id")
  },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n        <div class=\"list-group well-lg\">\n            ");
  stack1 = (helper = helpers.ifCond || (depth0 && depth0.ifCond),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","STRING","ID"],data:data},helper ? helper.call(depth0, "roles", "&&", "roles.length", options) : helperMissing.call(depth0, "ifCond", "roles", "&&", "roles.length", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n        <!-- End list-group -->\n\n    </div>\n    <!-- End vlt-row collapse -->\n\n</div>\n<!-- end table -->\n<div class=\"vlt-divider\">&nbsp;</div>");
  return buffer;
  
});

Ember.TEMPLATES["Member/MemberManagement"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-user\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['member-manager-accordion'] || (depth0 && depth0['member-manager-accordion']),options={hash:{
    'member': ("member"),
    'deleteMember': ("deleteMember"),
    'loadRoles': ("loadRoles"),
    'deleteRole': ("deleteRole")
  },hashTypes:{'member': "ID",'deleteMember': "STRING",'loadRoles': "STRING",'deleteRole': "STRING"},hashContexts:{'member': depth0,'deleteMember': depth0,'loadRoles': depth0,'deleteRole': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-manager-accordion", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-page-nav\">\n\n            <div class=\"vlt-page-toolbar pull-right\">\n                <div>\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n            </div>\n            <div class=\"pull-left\">\n                <h2>");
  stack1 = helpers._triageMustache.call(depth0, "content.workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading \">\n                <div class=\"vlt-col col-md-8\">\n                    <h4> ");
  stack1 = helpers._triageMustache.call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" members at <strong>");
  stack1 = helpers._triageMustache.call(depth0, "content.workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong></h4>\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <!-- End of heading -->\n            <div class=\"panel-body\" id=\"collapse\">\n                ");
  stack1 = helpers.each.call(depth0, "member", "in", "members", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n            <!-- End of panel-body -->\n            <div class=\"clearfix\"></div>\n\n        </div>\n\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Member/MemberIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                <span class=\"glyphicon glyphicon-user\"></span>\r\n                Invite\r\n            ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n        ");
  stack1 = helpers['if'].call(depth0, "block.isSecond", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        ");
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            ");
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                <div class=\"top-30\">\r\n                    <h3>Inherited memberships</h3>\r\n                </div>\r\n            ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n            <div class=\"panel panel-default vlt-panel-permissions top-30\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"col-md-8\">\r\n                        <h4>\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "block.roles.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" collaborators at ");
  stack1 = helpers._triageMustache.call(depth0, "block.type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <b>");
  stack1 = helpers._triageMustache.call(depth0, "block.object.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</b>\r\n                        </h4>\r\n                    </div>\r\n                    <div class=\"col-md-4 vlt-controls\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "block.readOnly", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"table vlt-table\">\r\n\r\n                    ");
  stack1 = helpers.unless.call(depth0, "block.roles.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers.each.call(depth0, "role", "in", "block.roles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n\r\n            </div>\r\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers['if'].call(depth0, "block.object.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <a class=\"btn btn-default btn-sm\"\r\n                                    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("block.url")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                                   data-toggle=\"tooltip\"\r\n                                   title=\"Edit inherited roles\"\r\n                                        >\r\n                                    <span class=\"glyphicon glyphicon-edit\"></span>\r\n                                </a>\r\n                            ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div>\r\n                            <div class=\"padding-15\">\r\n                                There are no permission to this object.\r\n\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            </div>\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"glyphicon glyphicon-user\"></span>\r\n                                    Invite\r\n                                ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers.view.call(depth0, "view.Item", {hash:{
    'role': ("role"),
    'block': ("block"),
    'class': ("vlt-row"),
    'classNameBindings': ("role.isMember:normal:invited")
  },hashTypes:{'role': "ID",'block': "ID",'class': "STRING",'classNameBindings': "STRING"},hashContexts:{'role': depth0,'block': depth0,'class': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            <div class=\"vlt-col col-sm-4 vlt-user\">\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'size': (50)
  },hashTypes:{'size': "INTEGER"},hashContexts:{'size': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.member", options) : helperMissing.call(depth0, "printUser", "role.member", options))));
  data.buffer.push("\r\n                            </div>\r\n                            <div class=\"vlt-col col-sm-4 vlt-labels\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                <div class=\"clearfix\"></div>\r\n                            </div>\r\n                            <div class=\"vlt-col col-sm-4 vlt-actions\">\r\n                                ");
  stack1 = helpers.unless.call(depth0, "block.readOnly", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                            <div class=\"clearfix\"></div>\r\n\r\n                        ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"label label-warning\">\r\n                                        Does not have workspace key yet\r\n                                    </div>\r\n                                ");
  }

function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"label label-warning\">\r\n                                        Invited only. Did not show up yet!\r\n                                    </div>\r\n                                ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                        <span class=\"label label-warning\">\r\n                                        It's you\r\n                                        </span>\r\n                                        <span class=\"label label-default\" data-toggle=\"tooltip\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-toggle': ("tooltip"),
    'title': ("role.printableDesc")
  },hashTypes:{'data-toggle': "STRING",'title': "ID"},hashContexts:{'data-toggle': depth0,'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </span>\r\n\r\n\r\n                                    ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                        <div class=\"vlt-edit-perms\">\r\n                                            <a class=\"vlt-delete btn btn-default btn-sm\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", "block", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data})));
  data.buffer.push(">\r\n                                                <span class=\"glyphicon glyphicon-trash\"></span>\r\n                                            </a>\r\n                                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control vlt-perms"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'class': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'class': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                        </div>\r\n                                    ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                    <span class=\"label label-default\" data-toggle='tooltip' ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </span>\r\n\r\n                                ");
  return buffer;
  }
function program26(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"label label-warning\">\r\n                                        It's you\r\n                                        </span>\r\n                                    ");
  }

  data.buffer.push("<div class=\"container\">\r\n<div class=\"vlt-page vlt-page-plain\">\r\n<div class=\"vlt-page-nav\">\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div>\r\n\r\n            <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\r\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                Back\r\n            </a>\r\n\r\n            <div style=\"display: none\">\r\n                <a href=\"#\" class=\"btn btn-default\">\r\n                    <span class=\"glyphicon glyphicon-question-sign\"></span>\r\n                    Permissions\r\n                </a>\r\n            </div>\r\n\r\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"pull-left\">\r\n        <h2>Collaborators</h2>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n</div>\r\n\r\n<div class=\"vlt-page-invitations\">\r\n\r\n    ");
  stack1 = helpers.each.call(depth0, "block", "in", "blocks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n</div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Member/MemberInvite"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"vlt-page vlt-page-plain\">\r\n<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Invite collaborators</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"invite-form-invited\">Select users</label>\r\n\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MemberInviteInput", {hash:{
    'store': ("store"),
    'workspace': ("workspace"),
    'auth': ("auth"),
    'class': ("form-control"),
    'elementId': ("invite-form-invited"),
    'valueBinding': ("invited")
  },hashTypes:{'store': "ID",'workspace': "ID",'auth': "ID",'class': "STRING",'elementId': "STRING",'valueBinding': "STRING"},hashContexts:{'store': depth0,'workspace': depth0,'auth': depth0,'class': depth0,'elementId': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"help-block\"><b>Select existing users or invite new by email</b>. You can invite more users at once. Seperate them with space, comma or semicolon</span>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"checkbox\">\r\n                            <label for=\"invite-form-resend\">\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'elementId': ("invite-form-resend"),
    'checkedBinding': ("resend")
  },hashTypes:{'type': "ID",'elementId': "STRING",'checkedBinding': "STRING"},hashContexts:{'type': depth0,'elementId': depth0,'checkedBinding': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                Resend invitation to already invited user\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"invite-form-role\">Permissions</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control"),
    'elementId': ("invite-form-role"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    Back\r\n                </a>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isSubmitDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "invited", "role", "resend", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],data:data})));
  data.buffer.push("\r\n                        class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Submit\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Member/MemberBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        Not shared with anybody yet\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"vlt-perms-section\">\n            Users able to manage\n        </div>\n        <div class=\"vlt-perms-roles\">\n            ");
  stack1 = helpers.each.call(depth0, "role", "in", "rolesWrite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class=\"clearfix\"></div>\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'size': (50),
    'disableName': (1)
  },hashTypes:{'size': "INTEGER",'disableName': "INTEGER"},hashContexts:{'size': depth0,'disableName': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.member", options) : helperMissing.call(depth0, "printUser", "role.member", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"vlt-perms-section\">\n            Users able to read\n        </div>\n        <div class=\"vlt-perms-roles\">\n            ");
  stack1 = helpers.each.call(depth0, "role", "in", "rolesRead", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class=\"clearfix\"></div>\n    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"vlt-perms-section\">\n            Users able to create only\n        </div>\n        <div class=\"vlt-perms-roles\">\n            ");
  stack1 = helpers.each.call(depth0, "role", "in", "rolesCreate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        <div class=\"clearfix\"></div>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-member-box\">\n    ");
  stack1 = helpers.unless.call(depth0, "hasAny", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasWrite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasRead", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasCreate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Invitation/InvitationAnonymous"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>You have been invited to vaultier</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-8 col-md-offset-2 top-30 bottom-30\">\r\n                    <b>\r\n                        Before further procceeding we need you to have account. Please login or create new\r\n                        account.\r\n                    </b>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Invitation/InvitationAccept"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers.each.call(depth0, "role", "in", "invitation.roles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <tr>\n                                    <td>");
  stack1 = helpers._triageMustache.call(depth0, "role.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" by user ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.created_by", options) : helperMissing.call(depth0, "printUser", "role.created_by", options))));
  data.buffer.push(" </td>\n                                </tr>\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>You have pending invitations</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2 top-15 bottom-30\">\n                    <div class=\"bottom-15\">\n                        You have been invited to Vaultier.\n                        <b>Please see invitations to accept:</b>\n                    </div>\n                    <table class=\"table vlt-table table-bordered\">\n                        <tbody>\n                        ");
  stack1 = helpers.each.call(depth0, "invitation", "in", "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </tbody>\n                    </table>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"#\" class=\"btn btn-default btn-sm\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rejectInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                    Reject invitations\n                </a>\n                <a href=\"#\" class=\"btn btn-primary btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "acceptInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Accept invitations\n                </a>\n            </div>\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});

//# sourceMappingURL=membership.tpl.js.map