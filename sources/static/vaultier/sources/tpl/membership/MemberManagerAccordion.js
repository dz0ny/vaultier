Ember.TEMPLATES["Member/MemberManagerAccordion"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
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