Ember.TEMPLATES["RolesAdmin/RolesAdminBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

  data.buffer.push("<div class=\"vlt-roles-admin-box\">\n    ");
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

Ember.TEMPLATES["RolesAdmin/RolesAdminIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-user\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "block.isSecond", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\n                        <div class=\"top-30\">\n                            <h3>Inherited memberships</h3>\n                        </div>\n                    ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                    <div class=\"panel panel-default vlt-panel-permissions top-30\">\n                        <div class=\"panel-heading\">\n                            <div class=\"col-md-8\">\n                                <h4>\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "block.roles.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" collaborators at ");
  stack1 = helpers._triageMustache.call(depth0, "block.type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <b>");
  stack1 = helpers._triageMustache.call(depth0, "block.object.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</b>\n                                </h4>\n                            </div>\n                            <div class=\"col-md-4 vlt-controls\">\n                                ");
  stack1 = helpers['if'].call(depth0, "block.readOnly", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            </div>\n\n                            <div class=\"clearfix\"></div>\n                        </div>\n                        <div class=\"table vlt-table\">\n\n                            ");
  stack1 = helpers.unless.call(depth0, "block.roles.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  stack1 = helpers.each.call(depth0, "role", "in", "block.roles", {hash:{
    'itemViewClass': ("view.AnimatedItemWrapper")
  },hashTypes:{'itemViewClass': "STRING"},hashContexts:{'itemViewClass': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n\n                    </div>\n                ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                    ");
  stack1 = helpers['if'].call(depth0, "block.object.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                        <a class=\"btn btn-default btn-sm pull-right\"\n                                            ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("block.url")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                                           data-toggle=\"tooltip\"\n                                           title=\"Edit inherited roles\"\n                                                >\n                                            <span class=\"glyphicon glyphicon-edit\"></span>\n                                        </a>\n                                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <div>\n                                    <div class=\"padding-15\">\n                                        There are no permission to this object.\n\n                                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                    </div>\n                                </div>\n                            ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\n                                            <span class=\"glyphicon glyphicon-user\"></span>\n                                            Invite\n                                        ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                                ");
  stack1 = helpers.view.call(depth0, "view.Item", {hash:{
    'role': ("role"),
    'block': ("block"),
    'class': ("row vlt-row"),
    'classNameBindings': ("role.isMember:normal:invited")
  },hashTypes:{'role': "ID",'block': "ID",'class': "STRING",'classNameBindings': "STRING"},hashContexts:{'role': depth0,'block': depth0,'class': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                    <div class=\"vlt-col col-sm-4 vlt-user\">\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'size': (50)
  },hashTypes:{'size': "INTEGER"},hashContexts:{'size': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.member", options) : helperMissing.call(depth0, "printUser", "role.member", options))));
  data.buffer.push("\n                                    </div>\n                                    <div class=\"vlt-col col-sm-4 vlt-labels\">\n                                        ");
  stack1 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                        ");
  stack1 = helpers['if'].call(depth0, "role.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        <div class=\"clearfix\"></div>\n                                    </div>\n                                    <div class=\"vlt-col col-sm-4 vlt-actions\">\n                                        ");
  stack1 = helpers.unless.call(depth0, "block.readOnly", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </div>\n                                    <div class=\"clearfix\"></div>\n\n                                ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("\n                                            <div class=\"label label-warning pull-right\">\n                                                Does not have workspace key yet\n                                            </div>\n                                        ");
  }

function program18(depth0,data) {
  
  
  data.buffer.push("\n                                            <div class=\"label label-warning pull-right\">\n                                                Invited only. Did not show up yet!\n                                            </div>\n                                        ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                                            ");
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                                <span class=\"label label-warning pull-right\">\n                                        It's you\n                                        </span>\n                                        <span class=\"label label-default pull-right\"\n                                              data-toggle=\"tooltip\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-toggle': ("tooltip"),
    'title': ("role.printableDesc")
  },hashTypes:{'data-toggle': "STRING",'title': "ID"},hashContexts:{'data-toggle': depth0,'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                        </span>\n\n\n                                            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                                <div class=\"vlt-edit-perms\">\n                                                    <a class=\"vlt-delete btn btn-default btn-sm pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", "block", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data})));
  data.buffer.push(">\n                                                        <span class=\"glyphicon glyphicon-trash\"></span>\n                                                    </a>\n                                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control vlt-perms"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'class': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'class': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                                </div>\n                                            ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                                            ");
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                            <span class=\"label label-default pull-right\"\n                                                  data-toggle='tooltip' ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                                ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </span>\n\n                                        ");
  return buffer;
  }
function program26(depth0,data) {
  
  
  data.buffer.push("\n                                                <span class=\"label label-warning pull-right\">\n                                        It's you\n                                        </span>\n                                            ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-page-nav\">\n\n            <div class=\"vlt-page-toolbar pull-right\">\n                <div>\n\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n\n                    <div style=\"display: none\">\n                        <a href=\"#\" class=\"btn btn-default\">\n                            <span class=\"glyphicon glyphicon-question-sign\"></span>\n                            Permissions\n                        </a>\n                    </div>\n\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n                </div>\n            </div>\n\n            <div class=\"pull-left\">\n                <h2>Team</h2>\n            </div>\n\n            <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"vlt-page-invitations\">\n\n            ");
  stack1 = helpers.each.call(depth0, "block", "in", "blocks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["RolesAdmin/RolesAdminInvite"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"vlt-page vlt-page-plain\">\n<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>Invite collaborators</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-10 col-md-offset-1\">\n\n                    <div class=\"form-group\">\n                        <label for=\"invite-form-invited\">Select users</label>\n\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.RolesAdminInviteInput", {hash:{
    'store': ("store"),
    'workspace': ("workspace"),
    'auth': ("auth"),
    'class': ("form-control"),
    'elementId': ("invite-form-invited"),
    'valueBinding': ("invited")
  },hashTypes:{'store': "ID",'workspace': "ID",'auth': "ID",'class': "STRING",'elementId': "STRING",'valueBinding': "STRING"},hashContexts:{'store': depth0,'workspace': depth0,'auth': depth0,'class': depth0,'elementId': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"help-block\"><b>Select existing users or invite new by email</b>. You can invite more users at once. Separate them with space, comma or semicolon</span>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"checkbox\">\n                            <label for=\"invite-form-resend\">\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'elementId': ("invite-form-resend"),
    'checkedBinding': ("resend")
  },hashTypes:{'type': "ID",'elementId': "STRING",'checkedBinding': "STRING"},hashContexts:{'type': depth0,'elementId': depth0,'checkedBinding': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                                Resend invitation to already invited user\n                            </label>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"invite-form-role\">Permissions</label>\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control"),
    'elementId': ("invite-form-role"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n                    </div>\n\n                    <span class=\"help-block\">Invitation expires in ");
  stack1 = helpers._triageMustache.call(depth0, "invitation_lifetime", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" days.</span>\n\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                    Back\n                </a>\n                <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isSubmitDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "invited", "role", "resend", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],data:data})));
  data.buffer.push("\n                        class=\"btn btn-primary\">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Submit\n                </button>\n            </div>\n        </div>\n    </form>\n</div>\n<div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["RolesAdmin/RolesAdminManagement"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-user\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['roles-admin-manager-accordion'] || (depth0 && depth0['roles-admin-manager-accordion']),options={hash:{
    'member': ("member"),
    'deleteMember': ("deleteMember"),
    'loadRoles': ("loadRoles"),
    'deleteRole': ("deleteRole")
  },hashTypes:{'member': "ID",'deleteMember': "STRING",'loadRoles': "STRING",'deleteRole': "STRING"},hashContexts:{'member': depth0,'deleteMember': depth0,'loadRoles': depth0,'deleteRole': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "roles-admin-manager-accordion", options))));
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

Ember.TEMPLATES["MembersAdmin/MembersAdmin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.view.call(depth0, "Vaultier.AnimatedIfView", {hash:{
    'condition': ("members.length"),
    'in': ("fadeIn"),
    'out': ("fadeOut")
  },hashTypes:{'condition': "ID",'in': "STRING",'out': "STRING"},hashContexts:{'condition': depth0,'in': depth0,'out': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.view.call(depth0, "Vaultier.MembersAdminListView", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" invited only ");
  data.buffer.push(escapeExpression((helper = helpers.pluralize || (depth0 && depth0.pluralize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "members.length", "member", options) : helperMissing.call(depth0, "pluralize", "members.length", "member", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.view.call(depth0, "Vaultier.AnimatedIfView", {hash:{
    'condition': ("members.length"),
    'in': ("fadeIn"),
    'out': ("fadeOut")
  },hashTypes:{'condition': "ID",'in': "STRING",'out': "STRING"},hashContexts:{'condition': depth0,'in': depth0,'out': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.view.call(depth0, "Vaultier.MembersAdminListView", {hash:{
    'members': ("concreteMembers")
  },hashTypes:{'members': "ID"},hashContexts:{'members': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" concrete team ");
  data.buffer.push(escapeExpression((helper = helpers.pluralize || (depth0 && depth0.pluralize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "members.length", "member", options) : helperMissing.call(depth0, "pluralize", "members.length", "member", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.view.call(depth0, "Vaultier.AnimatedIfView", {hash:{
    'condition': ("members.length"),
    'in': ("fadeIn"),
    'out': ("fadeOut")
  },hashTypes:{'condition': "ID",'in': "STRING",'out': "STRING"},hashContexts:{'condition': depth0,'in': depth0,'out': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.view.call(depth0, "Vaultier.MembersAdminListView", {hash:{
    'members': ("membersWithoutKeys")
  },hashTypes:{'members': "ID"},hashContexts:{'members': depth0},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "members.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  data.buffer.push(escapeExpression((helper = helpers.pluralize || (depth0 && depth0.pluralize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "members.length", "member", options) : helperMissing.call(depth0, "pluralize", "members.length", "member", options))));
  data.buffer.push(" without valid keys\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-page-nav\">\n\n            <div class=\"vlt-page-toolbar pull-right\">\n                <div class=\"vlt-members-management-controls\">\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Workspace.rolesAdminInvite", options) : helperMissing.call(depth0, "link-to", "Workspace.rolesAdminInvite", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                </div>\n            </div>\n            <div class=\"pull-left\">\n                <h2>Members of workspace <strong>");
  stack1 = helpers._triageMustache.call(depth0, "content.workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong></h2>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n\n\n        ");
  stack1 = helpers['with'].call(depth0, "invitedMembers", "as", "members", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['with'].call(depth0, "concreteMembers", "as", "members", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['with'].call(depth0, "membersWithoutKey", "as", "members", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminList"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"panel panel-default vlt-panel-members\">\n    <div class=\"panel-heading\">\n        <div class=\"vlt-col col-md-8\">\n            <h4> ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h4>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"panel-body vlt-panel-members-body\">\n        ");
  data.buffer.push(escapeExpression(helpers.each.call(depth0, "member", "in", "members", {hash:{
    'itemViewClass': ("Vaultier.MembersAdminListItemView")
  },hashTypes:{'itemViewClass': "STRING"},hashContexts:{'itemViewClass': depth0},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data})));
  data.buffer.push("\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminListItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                <span class=\"label label-warning pull-right\">It's you</span>\n            ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                <span class=\"label label-warning pull-right\">Invited only. Did not show up yet!</span>\n            ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                <span class=\"label label-warning pull-right\">Does not have key yet</span>\n            ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"vlt-panel-members-roles\">\n            ");
  stack1 = helpers.each.call(depth0, "role", "in", "member.roles", {hash:{
    'itemViewClass': ("view.parentView.AnimatedView")
  },hashTypes:{'itemViewClass': "STRING"},hashContexts:{'itemViewClass': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n    ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MembersAdminRoleItemView", {hash:{
    'role': ("role")
  },hashTypes:{'role': "ID"},hashContexts:{'role': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"table vlt-table\">\n    <div class=\"row\">\n        <div class=\"col-sm-4 vlt-user\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'size': (50)
  },hashTypes:{'size': "INTEGER"},hashContexts:{'size': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "member", options) : helperMissing.call(depth0, "printUser", "member", options))));
  data.buffer.push("\n        </div>\n        <div class=\"col-sm-5 vlt-labels\">\n            <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":label member.roles_count:label-default:label-warning :pull-right")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                ");
  stack1 = helpers._triageMustache.call(depth0, "member.roles_count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.pluralize || (depth0 && depth0.pluralize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "member.roles_count", "permission", options) : helperMissing.call(depth0, "pluralize", "member.roles_count", "permission", options))));
  data.buffer.push("\n            </span>\n\n            ");
  stack1 = helpers['if'].call(depth0, "view.myself", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  stack1 = helpers['if'].call(depth0, "member.isInvited", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  stack1 = helpers['if'].call(depth0, "member.hasNoKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div class=\"col-sm-3 vlt-actions\">\n            <div class=\"vlt-edit-perms pull-right\">\n\n                <a class=\"vlt-delete btn btn-default btn-sm pull-right\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteMember", "members", "member", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("view.myself")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-trash\"></span>\n                </a>\n\n                <a\n                    ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-default :btn-sm member.roles_count::hide :pull-right")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleRoles", "member", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                    Permissions\n                    <span class=\"caret\"></span>\n                </a>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    ");
  stack1 = helpers.view.call(depth0, "Vaultier.AnimatedIfView", {hash:{
    'condition': ("member.roles.length"),
    'in': ("none"),
    'out': ("slideUp")
  },hashTypes:{'condition': "ID",'in': "STRING",'out': "STRING"},hashContexts:{'condition': depth0,'in': depth0,'out': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["MembersAdmin/MembersAdminRoleItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"list-group-item vlt-panel-members-role\">\n\n    <div class=\"col-sm-4\">\n\n        <span data-toggle=\"tooltip vlt-img-25\" data-placement=\"top\" title=\"Card\">\n            <img class=\"vlt-wspaceimg\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("view.icon")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" style=\"width: 25px\">\n         </span>\n\n        <span class=\"col-sm-offset-1\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"name\">\n            ");
  stack1 = helpers._triageMustache.call(depth0, "role.relatedObject.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </span>\n\n    </div>\n    <div class=\"col-sm-5 vlt-labels\">\n        <span class=\"vlt-edit-perms vlt-labels\">\n            <span data-toggle='tooltip'\n                  class=\"label label-default pull-right\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("role.printableDesc")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                ");
  stack1 = helpers._triageMustache.call(depth0, "role.printableName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </span>\n        </span>\n    </div>\n\n    <div class=\"col-sm-3 vlt-actions pull-right\">\n        <a class=\"vlt-delete btn btn-default btn-sm pull-right\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("view.cannotDelete")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <span class=\"glyphicon glyphicon-trash\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "member", "role", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("></span>\n        </a>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n");
  return buffer;
  
});

//# sourceMappingURL=membership.tpl.js.map