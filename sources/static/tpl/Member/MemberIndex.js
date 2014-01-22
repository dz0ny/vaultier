Ember.TEMPLATES["Member/MemberIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                <span class=\"glyphicon glyphicon-user\"></span>\r\n                Invite\r\n            ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "block.isSecond", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "block.isHidden", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                <div class=\"top-30\">\r\n                    <h3>Inherited memberships</h3>\r\n                </div>\r\n            ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n            <div class=\"panel panel-default vlt-panel-permissions top-30\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"col-md-8\">\r\n                        <h4>\r\n                            ");
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
  data.buffer.push("</b>\r\n                        </h4>\r\n                    </div>\r\n                    <div class=\"col-md-4 vlt-controls\">\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "block.readOnly", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <table class=\"table vlt-table\">\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "block.roles.length", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "role", "in", "block.roles", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </table>\r\n\r\n            </div>\r\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "block.object.perms.invite", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                                <a class=\"btn btn-default btn-sm\"\r\n                                    ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "ID"};
  options = {hash:{
    'href': ("block.url")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\r\n                                   data-toggle=\"tooltip\"\r\n                                   title=\"Edit inherited roles\"\r\n                                        >\r\n                                    <span class=\"glyphicon glyphicon-edit\"></span>\r\n                                </a>\r\n                            ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                        <div>\r\n                            <div class=\"padding-15\">\r\n                                There are no permission to this object.\r\n\r\n                                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-default btn-sm")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "inviteRouteName", options) : helperMissing.call(depth0, "link-to", "inviteRouteName", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                            </div>\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"glyphicon glyphicon-user\"></span>\r\n                                    Invite\r\n                                ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\r\n\r\n                        ");
  hashContexts = {'role': depth0,'block': depth0,'classNameBindings': depth0};
  hashTypes = {'role': "ID",'block': "ID",'classNameBindings': "STRING"};
  stack1 = helpers.view.call(depth0, "view.Item", {hash:{
    'role': ("role"),
    'block': ("block"),
    'classNameBindings': ("role.isMember:normal:warning")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                            <td class=\"col-md-4 vlt-user\">\r\n                                ");
  hashContexts = {'size': depth0};
  hashTypes = {'size': "INTEGER"};
  options = {hash:{
    'size': (50)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "role.member", options) : helperMissing.call(depth0, "printUser", "role.member", options))));
  data.buffer.push("\r\n                            </td>\r\n                            <td class=\"col-md-4 vlt-labels\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "role.isMemberWithoutKeys", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "role.isInvited", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </td>\r\n                            <td class=\"col-md-4 vlt-actions\">\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "block.readOnly", {hash:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                            </td>\r\n\r\n                        ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"label label-warning\">\r\n                                        Does not have workspace key yet\r\n                                    </div>\r\n                                ");
  }

function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"label label-warning\">\r\n                                        Invited only. Did not show up yet!\r\n                                    </div>\r\n                                ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                                        <span class=\"label label-warning\">\r\n                                        It's you\r\n                                        </span>\r\n                                        <span class=\"label label-default\" data-toggle=\"tooltip\" ");
  hashContexts = {'data-toggle': depth0,'title': depth0};
  hashTypes = {'data-toggle': "STRING",'title': "ID"};
  options = {hash:{
    'data-toggle': ("tooltip"),
    'title': ("role.printableDesc")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "role.printableName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                        </span>\r\n\r\n\r\n                                    ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                                        <div class=\"vlt-edit-perms\">\r\n                                            <a class=\"vlt-delete btn btn-default btn-sm\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRole", "role", "block", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n                                                <span class=\"glyphicon glyphicon-trash\"></span>\r\n                                            </a>\r\n                                            ");
  hashContexts = {'role': depth0,'class': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0};
  hashTypes = {'role': "ID",'class': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control vlt-perms"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                        </div>\r\n                                    ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\r\n\r\n                                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "role.isCurrentUser", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                    <span class=\"label label-default\" data-toggle='tooltip' ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "ID"};
  options = {hash:{
    'title': ("role.printableDesc")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "role.printableName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                    </span>\r\n\r\n                                ");
  return buffer;
  }
function program26(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"label label-warning\">\r\n                                        It's you\r\n                                        </span>\r\n                                    ");
  }

  data.buffer.push("<div class=\"vlt-page-nav\">\r\n\r\n    <div class=\"vlt-page-toolbar pull-right\">\r\n        <div>\r\n\r\n            <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\r\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                Back\r\n            </a>\r\n\r\n            <div style=\"display: none\">\r\n                <a href=\"#\" class=\"btn btn-default\">\r\n                    <span class=\"glyphicon glyphicon-question-sign\"></span>\r\n                    Permissions\r\n                </a>\r\n            </div>\r\n\r\n            ");
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
