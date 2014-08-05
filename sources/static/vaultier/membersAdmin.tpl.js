Ember.TEMPLATES["MembersAdmin/MembersAdminRoleItemWorkspace"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Does not have workspace key yet\n                </span>\n            </span>\n        ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Invited only. Did not show up yet!\n                </span>\n            </span>\n        ");
  }

  data.buffer.push("<div class=\"list-group-item\">\n\n    <div class=\"clt-col col-sm-5\">\n\n            <span data-toggle=\"tooltip vlt-img-25\" data-placement=\"top\" title=\"Workspace\">\n                <img class=\"vlt-wspaceimg\"\n                     src=\"/static/vaultier/images/icon-workspace-grey.png\"\n                     style=\"width: 25px\">\n             </span>\n\n        <span class=\"col-sm-offset-1\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"name\">\n\n            ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </span>\n\n    </div>\n\n    <div class=\"vlt-col col-sm-5 vlt-labels\">\n        ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <span class=\"vlt-edit-perms vlt-labels\">\n            <span data-toggle='tooltip'\n                  class=\"label label-default\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </span>\n        </span>\n    </div>\n\n    <div class=\"vlt-col col-sm-2 vlt-actions pull-right\">\n        <a class=\"vlt-delete btn btn-default btn-sm pull-right\">\n            <span class=\"glyphicon glyphicon-trash\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></span>\n        </a>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminRoleItemVault"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Does not have workspace key yet\n                </span>\n            </span>\n        ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Invited only. Did not show up yet!\n                </span>\n            </span>\n        ");
  }

  data.buffer.push("<div class=\"list-group-item\">\n\n    <div class=\"clt-col col-sm-5\">\n\n            <span data-toggle=\"tooltip vlt-img-25\" data-placement=\"top\" title=\"Vault\">\n                <img class=\"vlt-wspaceimg\"\n                    src=\"/static/vaultier/images/icon-vault-grey.png\"\n                    style=\"width: 25px\">\n             </span>\n\n        <span class=\"col-sm-offset-1\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"name\">\n\n            ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_vault.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </span>\n\n    </div>\n\n    <div class=\"vlt-col col-sm-5 vlt-labels\">\n        ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <span class=\"vlt-edit-perms vlt-labels\">\n            <span data-toggle='tooltip'\n                class=\"label label-default\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </span>\n        </span>\n    </div>\n\n    <div class=\"vlt-col col-sm-2 vlt-actions pull-right\">\n        <a class=\"vlt-delete btn btn-default btn-sm pull-right\">\n            <span class=\"glyphicon glyphicon-trash\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></span>\n        </a>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminRoleItemCard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Does not have workspace key yet\n                </span>\n            </span>\n        ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n            <span class=\"vlt-edit-perms vlt-labels\">\n                <span class=\"label label-warning\">\n                    Invited only. Did not show up yet!\n                </span>\n            </span>\n        ");
  }

  data.buffer.push("<div class=\"list-group-item\">\n\n    <div class=\"clt-col col-sm-5\">\n\n            <span data-toggle=\"tooltip vlt-img-25\" data-placement=\"top\" title=\"Card\">\n                <img class=\"vlt-wspaceimg\"\n                    src=\"/static/vaultier/images/icon-card-grey.png\"\n                    style=\"width: 25px\">\n             </span>\n\n        <span class=\"col-sm-offset-1\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"name\">\n\n            ");
  stack1 = helpers._triageMustache.call(depth0, "role.to_card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </span>\n\n    </div>\n    <div class=\"vlt-col col-sm-5 vlt-labels\">\n        ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <span class=\"vlt-edit-perms vlt-labels\">\n            <span data-toggle='tooltip'\n                class=\"label label-default\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </span>\n        </span>\n    </div>\n\n    <div class=\"vlt-col col-sm-2 vlt-actions pull-right\">\n        <a class=\"vlt-delete btn btn-default btn-sm pull-right\">\n            <span class=\"glyphicon glyphicon-trash\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></span>\n        </a>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdmin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers.each.call(depth0, "member", "in", "members", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['members-admin-accordion'] || (depth0 && depth0['members-admin-accordion']),options={hash:{
    'member': ("member"),
    'deleteMember': ("deleteMember"),
    'loadRoles': ("loadRoles"),
    'deleteRole': ("deleteRole")
  },hashTypes:{'member': "ID",'deleteMember': "STRING",'loadRoles': "STRING",'deleteRole': "STRING"},hashContexts:{'member': depth0,'deleteMember': depth0,'loadRoles': depth0,'deleteRole': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "members-admin-accordion", options))));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n                    <div class=\"lead\">You have no members on  this workspace</div>\n                ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-page-nav\">\n\n            <div class=\"vlt-page-toolbar pull-right\">\n                <div class=\"vlt-members-management-controls\">\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspace.memberInvite", options) : helperMissing.call(depth0, "link-to", "Workspace.memberInvite", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                </div>\n            </div>\n            <div class=\"pull-left\">\n                <h2>Members of workspace <strong>");
  stack1 = helpers._triageMustache.call(depth0, "content.workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong></h2>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"panel panel-default vlt-panel-members\">\n            <div class=\"panel-heading \">\n                <div class=\"vlt-col col-md-8\">\n                    <h4> ");
  stack1 = helpers._triageMustache.call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" Members at </h4>\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <!-- End of heading -->\n            <div class=\"panel-body\" id=\"collapse\">\n                ");
  stack1 = helpers['if'].call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n            <!-- End of panel-body -->\n            <div class=\"clearfix\"></div>\n\n        </div>\n\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminAccordion"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                    <span class=\"label label-default\">\n                        <span class=\"badge\">");
  stack1 = helpers._triageMustache.call(depth0, "rolesCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.pluralize || (depth0 && depth0.pluralize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "rolesCount", "permission", options) : helperMissing.call(depth0, "pluralize", "rolesCount", "permission", options))));
  data.buffer.push("\n                    </span>\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <span class=\"label label-warning\">Has no permissions</span>\n\n                    ");
  stack1 = helpers['if'].call(depth0, "member.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"label label-warning\">Invited only. Did not show up yet!</span>\n                    ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers['if'].call(depth0, "member.hasNoKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                    ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("\n                            <span class=\"label label-warning\">Does not have key yet</span>\n                        ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <div class=\"lead\"><small>Permissions</small></div>\n                    ");
  stack1 = helpers.each.call(depth0, "role", "in", "roles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MembersAdminRoleItemView", {hash:{
    'role': ("role")
  },hashTypes:{'role': "ID"},hashContexts:{'role': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  
  data.buffer.push("\n                    <div class=\"lead\"><small>This member has no permissions</small></div>\n                ");
  }

  data.buffer.push("<div class=\"table vlt-table\">\n    <div class=\"vlt-row\">\n        <div class=\"row\">\n            <div class=\"vlt-col  col-sm-4 vlt-user\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'size': (50)
  },hashTypes:{'size': "INTEGER"},hashContexts:{'size': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "member", options) : helperMissing.call(depth0, "printUser", "member", options))));
  data.buffer.push("\n            </div>\n            <div class=\"vlt-col col-sm-4 vlt-labels\">\n                ");
  stack1 = helpers['if'].call(depth0, "rolesCount", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            <div class=\"vlt-col col-sm-4 vlt-actions\">\n                <div class=\"vlt-edit-perms pull-right\">\n                    <a class=\"btn btn-default accordion-toggle btn-sm\" type=\"button\" data-toggle=\"collapse\"\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("targetElement")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadRoles", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isDisabledRolesDropDown")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <span class=\"caret vlt-caret\"></span>\n                    </a>\n\n                    <a class=\"vlt-delete btn btn-default btn-sm\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteMember", "member", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                    </a>\n                </div>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"row collapse\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'id': ("id")
  },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n\n            <div class=\"list-group well-lg\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.debug || (depth0 && depth0.debug),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "rolesCount", options) : helperMissing.call(depth0, "debug", "rolesCount", options))));
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "rolesCount", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n            \n\n        </div>\n        \n    </div>\n    \n</div>\n");
  return buffer;
  
});

//# sourceMappingURL=membersAdmin.tpl.js.map