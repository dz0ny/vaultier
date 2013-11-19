Ember.TEMPLATES["Member/MemberIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                <span class=\"glyphicon glyphicon-user\"></span>\r\n                Invite\r\n            ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n\r\n        ");
  hashContexts = {'is': depth0};
  hashTypes = {'is': "INTEGER"};
  options = {hash:{
    'is': (2)
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.ifIndex || depth0.ifIndex),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ifIndex", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n        <div class=\"panel panel-default vlt-panel-permissions top-30\">\r\n            <div class=\"panel-heading\">\r\n                <div class=\"col-md-8\">\r\n                    <h4>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "block.roles.length", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" collaborators at ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "block.type", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" <b>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "block.object.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</b>\r\n                    </h4>\r\n                </div>\r\n                <div class=\"col-md-4 vlt-controls\">\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "block.readOnly", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n            <table class=\"table vlt-table\">\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "block.roles.length", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "role", "in", "block.roles", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </table>\r\n\r\n        </div>\r\n\r\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\r\n            <div class=\"top-30\">\r\n                <h3>Inherited memberships</h3>\r\n            </div>\r\n        ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                        <a class=\"btn btn-default btn-sm\" ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "ID"};
  options = {hash:{
    'href': ("block.url")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                            <span class=\"glyphicon glyphicon-edit\"></span>\r\n                        </a>\r\n                    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                    <div class=\"padding-15\">\r\n                        There are no permission to this object.\r\n\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                    </div>\r\n                ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                            <span class=\"glyphicon glyphicon-user\"></span>\r\n                            Invite\r\n                        ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\r\n\r\n                    ");
  hashContexts = {'role': depth0,'block': depth0,'classNameBindings': depth0};
  hashTypes = {'role': "ID",'block': "ID",'classNameBindings': "STRING"};
  stack1 = helpers.view.call(depth0, "view.Item", {hash:{
    'role': ("role"),
    'block': ("block"),
    'classNameBindings': ("role.isMember:normal:warning")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                        <td class=\"col-md-4 vlt-user\">\r\n                            ");
  hashContexts = {'size': depth0};
  hashTypes = {'size': "INTEGER"};
  options = {hash:{
    'size': (50)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "role.member", options) : helperMissing.call(depth0, "printUser", "role.member", options))));
  data.buffer.push("\r\n                        </td>\r\n                        <td class=\"col-md-4 vlt-labels\">\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "role.isNonApprovedMember", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "role.isInvited", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        </td>\r\n                        <td class=\"col-md-4 vlt-actions\">\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "block.readOnly", {hash:{},inverse:self.program(22, program22, data),fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        </td>\r\n\r\n                    ");
  return buffer;
  }
function program13(depth0,data) {
  
  
  data.buffer.push("\r\n                                <div class=\"label label-default\">\r\n                                    <div class=\"col-md-6\">\r\n                                        Accepted invitation. Please approve his access.\r\n                                    </div>\r\n                                    <div class=\"col-md-6\">\r\n                                        <a class=\"btn btn-success\">\r\n                                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                                            Approve\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n                            ");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\r\n                                <div class=\"label label-warning\">\r\n                                    Invited only. Did not show up yet!\r\n                                </div>\r\n                            ");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"label label-warning\">\r\n                                It's you\r\n                                </span>\r\n                                ");
  }

function program20(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        ");
  hashContexts = {'role': depth0,'class': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0};
  hashTypes = {'role': "ID",'class': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control vlt-perms"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("role.level")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                        <a class=\"vlt-delete btn btn-default btn-sm input-group-btn\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", "block", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n                                            <span class=\"glyphicon glyphicon-trash\"></span>\r\n                                        </a>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                <span class=\"label label-default\">\r\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "role.printableName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                </span>\r\n\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div>\r\n\r\n            <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\r\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                Back\r\n            </a>\r\n\r\n            <a href=\"#\" class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"first tooltip\">\r\n                <span class=\"glyphicon glyphicon-question-sign\"></span>\r\n                Permissions\r\n            </a>\r\n\r\n            ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"pull-left\">\r\n        <h2>Collaborators</h2>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n</div>\r\n\r\n<div class=\"vlt-page-invitations\">\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "block", "in", "blocks", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n\r\n\r\n</div>");
  return buffer;
  
});
