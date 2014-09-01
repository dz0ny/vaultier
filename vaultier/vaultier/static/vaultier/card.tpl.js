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
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.rolesAdminIndex", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.rolesAdminIndex", "vault", options));
rolesAdminIndex", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.rolesAdminIndex", "vault", options));
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
  data.buffer.push("\n\n                    <div class=\"jumbotron vlt-bigbox vlt-card top-50\">\n\n                        <div class=\"vlt-header\">\n                            <div class=\"vlt-icon\">\n\n                            </div>\n                            <div class=\"vlt-title\">\n                                <h1>You do not have any card yet</h1>\n                            </div>\n                        </div>\n\n                        ");
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
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.rolesAdminInvite", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.rolesAdminInvite", "vault", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                </div>\n\n                                <div\n                                        class=\"vlt-button-wrapper\"\n                                        data-toggle=\"tooltip\"\n                                        title=\n                                                \"\n                             Invite new team members to collaborate over this vault\n                             or  grant access permission to current team members\n                             \"\n                                        data-placement=\"bottom\"\n                                        >\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Vault.rolesAdminIndex", "vault", options) : helperMissing.call(depth0, "link-to", "Vault.rolesAdminIndex", "vault", options));
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
  data.buffer.push(escapeExpression((helper = helpers['roles-admin-box'] || (depth0 && depth0['roles-admin-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("vault")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "roles-admin-box", options))));
  data.buffer.push("\n                    </div>\n                    <div class=\"vlt-controls\">\n                        <div>\n                            ");
  stack1 = helpers['if'].call(depth0, "vault.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Card/CardsIndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n        <div class=\"vlt-visual\">\n        </div>\n        <div class=\"vlt-content\">\n            <div class=\"vlt-header\">\n                <h4>");
  data.buffer.push(escapeExpression((helper = helpers['dot-dot-dot'] || (depth0 && depth0['dot-dot-dot']),options={hash:{
    'value': ("name"),
    'height': (60)
  },hashTypes:{'value': "ID",'height': "INTEGER"},hashContexts:{'value': depth0,'height': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dot-dot-dot", options))));
  data.buffer.push("</h4>\n            </div>\n            <div class=\"vlt-description\">\n                ");
  stack1 = helpers['if'].call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n            <div class=\"vlt-footer\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\n            </div>\n        </div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['dot-dot-dot'] || (depth0 && depth0['dot-dot-dot']),options={hash:{
    'value': ("description"),
    'height': (200)
  },hashTypes:{'value': "ID",'height': "INTEGER"},hashContexts:{'value': depth0,'height': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dot-dot-dot", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                    No description given\n                ");
  }

  data.buffer.push("<div class=\"vlt-card-item pull-left\">\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.index", "", options) : helperMissing.call(depth0, "link-to", "Card.index", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Card/CardsCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n            <form>\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Create new card</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n\n                            <div class=\"col-md-7\">\n\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    <label for=\"card-name\">Name</label>\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("card-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                    <span class=\"error\">\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </span>\n                                </div>\n\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    <label for=\"card-description\">Description</label>\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("card-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                    <span class=\"error\">\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </span>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-5 bottom-15\">\n\n                                <div class=\"callout callout-info\">\n                                    <h4>Card will be shared with:</h4>\n\n                                     ");
  data.buffer.push(escapeExpression((helper = helpers['roles-admin-box'] || (depth0 && depth0['roles-admin-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("vault")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "roles-admin-box", options))));
  data.buffer.push("\n                                </div>\n                            </div>\n\n\n                            <div class=\"clearfix\"></div>\n                        </div>\n\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Create new card\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Card/CardEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>Edit card</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n\r\n                        <div class=\"col-md-8 col-md-offset-2\">\r\n\r\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"card-name\">Name</label>\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("card-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                <span class=\"error\">\r\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </span>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"card-description\">Description</label>\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("card-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                <span class=\"error\">\r\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            Back\r\n                        </a>\r\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                            Save changes\r\n                        </button>\r\n                    </div>\r\n\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Card/CardMove"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <div class=\"vlt-dialog-header\">\n                    <h2>Move card to another vault</h2>\n                </div>\n                <div class=\"vlt-dialog-body\">\n                    <h4>Please select target vault</h4>\n\n                    <div class=\"vlt-tree\">\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Tree", {hash:{
    'content': ("treeNodes")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    </div>\n                    <div class=\"help-block\">\n                        Also all granted permissions will be moved.  data.buffer.push("\n                    </div>\n                    <div class=\"help-block\">\n                        Also all granted permissions will be moved.\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n                <div class=\"vlt-dialog-footer\">\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n                    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("moveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                        <span class=\"glyphicon glyphicon-ok\"></span>\n                        Move\n                    </button>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Card/CardMoveVaultNode"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-node vlt-vault\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.loading:vlt-loading")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <label>\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Radio", {hash:{
    'name': ("move-target"),
    'value': ("view.content.id")
  },hashTypes:{'name': "STRING",'value': "ID"},hashContexts:{'name': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
  stack1 = helpers._triageMustache.call(depth0, "view.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </label>");
  return buffer;
  
});

//# sourceMappingURL=card.tpl.js.map