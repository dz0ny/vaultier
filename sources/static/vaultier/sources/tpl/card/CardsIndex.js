Ember.TEMPLATES["Card/CardsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <div class=\"btn-group\">\n                                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\n                                            data-toggle=\"dropdown\">\n                                        <span class=\"glyphicon glyphicon-cog\"></span>\n                                        Manage\n                                    </button>\n                                    <ul class=\"dropdown-menu caret-left\">\n                                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                    </ul>\n                                </div>\n                            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                                            <li>\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.edit", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.edit", "vault", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </li>\n\n                                            <li>\n                                                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteVault", "vault", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete vault</a>\n                                            </li>\n                                        ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\n                                                    Edit vault\n                                                ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                            <li>\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.memberIndex", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.memberIndex", "vault", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </li>\n                                        ");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push("\n                                                    Share\n                                                ");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                            <li>\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Cards.create", options) : helperMissing.call(depth0, "link-to", "Cards.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </li>\n                                        ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n                                                    Add card\n                                                ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                    ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.CardsIndexItemView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n                    <div class=\"jumbotron vlt-bigbox vlt-card col-md-8 col-md-offset-2 top-50\">\n\n                        <div class=\"vlt-header\">\n                            <div class=\"vlt-icon\">\n\n                            </div>\n                            <div class=\"vlt-title\">\n                                <h1>You do not have any card yet</h1>\n                            </div>\n                        </div>\n\n                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                            <p>\n                                Card is analogy to sheet in folder. Card lets you organize your secrets into groups.\n                                You can also collaborate with team over a card.\n                            </p>\n\n                            <p class=\"top-30\">\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Cards.create", options) : helperMissing.call(depth0, "link-to", "Cards.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </p>\n                        ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("\n                                    <span class=\"glyphicon glyphicon-plus\"></span>\n                                    Add card\n                                ");
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "vault.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }

function program20(depth0,data) {
  
  
  data.buffer.push("\n                            No description given\n                        ");
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <div\n                                        class=\"vlt-button-wrapper\"\n                                        data-toggle=\"tooltip\"\n                                        title=\n                                                \"\n                                    Card is analogy to sheet in folder. Card lets you organize your secrets into groups.\n                                    You can also collaborate with team over a card.\n                                    \"\n                                        data-placement=\"bottom\"\n                                        >\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Cards.create", options) : helperMissing.call(depth0, "link-to", "Cards.create", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                            ");
  return buffer;
  }
function program23(depth0,data) {
  
  
  data.buffer.push("\n                                        <span class=\"glyphicon glyphicon-plus\"></span>\n                                        Add card\n                                    ");
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <div class=\"btn-group\">\n                                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\n                                            data-toggle=\"dropdown\">\n                                        <span class=\"glyphicon glyphicon-cog\"></span>\n                                        Properties\n                                    </button>\n                                    <ul class=\"dropdown-menu caret-left\">\n\n                                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                        ");
  stack1 = helpers['if'].call(depth0, "vault.perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                                    </ul>\n                                </div>\n                            ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                            <li>\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.edit", "vault.slug", options) : helperMissing.call(depth0, "link-to", "Vault.edit", "vault.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                            </li>\n                                        ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                            <li>\n                                                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteVault", "vault", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete vault</a>\n                                            </li>\n                                        ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                                <div\n                                        class=\"vlt-button-wrapper\"\n                                        data-toggle=\"tooltip\"\n                                        title=\n                                                \"\n                             Invite new team members to collaborate over this vault\n                             or  grant access permission to current team members\n                             \"\n                                        data-placement=\"bottom\"\n                                        >\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.memberInvite", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.memberInvite", "vault", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n\n                                <div\n                                        class=\"vlt-button-wrapper\"\n                                        data-toggle=\"tooltip\"\n                                        title=\n                                                \"\n                             Invite new team members to collaborate over this vault\n                             or  grant access permission to current team members\n                             \"\n                                        data-placement=\"bottom\"\n                                        >\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.memberIndex", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.memberIndex", "vault", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n                            ");
  return buffer;
  }
function program31(depth0,data) {
  
  
  data.buffer.push("\n                                        <span class=\"glyphicon glyphicon-plus\"></span>\n                                        Invite\n                                    ");
  }

function program33(depth0,data) {
  
  
  data.buffer.push("\n                                        <span class=\"glyphicon glyphicon-user\"></span>\n                                        Team\n                                    ");
  }

  data.buffer.push("<div class=\"container-full\">\n    <div class=\"vlt-page vlt-page-with-sidebar\">\n\n        <div class=\"vlt-page-content\">\n            <div class=\"col-md-12\">\n\n                <div class=\"vlt-page-content-responsive-header\">\n                    <div class=\"row-fluid\">\n                        <div class=\"col-xs-3\">\n                            ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( vault.perms.update || vault.perms.delete || vault.perms.create || vault.perms.invite )", options) : helperMissing.call(depth0, "exp", "( vault.perms.update || vault.perms.delete || vault.perms.create || vault.perms.invite )", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n\n                        <div class=\"col-xs-9\">\n                            <h2>Vault: ");
  stack1 = helpers._triageMustache.call(depth0, "vault.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h2>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n                    </div>\n                </div>\n\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.WorkspacesIndexWithoutKeysView", {hash:{
    'workspace': ("workspace")
  },hashTypes:{'workspace': "ID"},hashContexts:{'workspace': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n        </div>\n\n        <div class=\"vlt-page-sidebar\">\n            <div class=\"vlt-sidebar-block\">\n                <div class=\"vlt-sidebar-block-heading\">\n                    <div class=\"vlt-header\">\n                        <img src=\"/static/vaultier/images/icon-vault-grey.png\" class=\"vlt-icon\">\n\n                        <h3 class=\"vlt-title\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "vault.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </h3>\n                    </div>\n                    <div class=\"vlt-body\">\n                        ");
  stack1 = helpers['if'].call(depth0, "vault.description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                    <div class=\"vlt-controls\">\n                        <div>\n\n                            ");
  stack1 = helpers['if'].call(depth0, "vault.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                            ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( vault.perms.update || vault.perms.delete)", options) : helperMissing.call(depth0, "exp", "( vault.perms.update || vault.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n                    </div>\n                </div>\n\n                <div class=\"vlt-sidebar-block-sharing\">\n                    <div class=\"vlt-header\">\n                        <img src=\"/static/vaultier/images/icon-team-grey.png\" class=\"vlt-icon\">\n\n                        <h3 class=\"vlt-title\">\n                            Sharing with\n                        </h3>\n                    </div>\n                    <div class=\"vlt-body\">\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\n                    </div>\n                    <div class=\"vlt-controls\">\n                        <div>\n                            ");
  stack1 = helpers['if'].call(depth0, "vault.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n");
  return buffer;
  
});