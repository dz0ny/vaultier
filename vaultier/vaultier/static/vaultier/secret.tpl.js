Ember.TEMPLATES["Secret/SecretIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div class=\"btn-group\">\r\n                                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\r\n                                            data-toggle=\"dropdown\">\r\n                                        <span class=\"glyphicon glyphicon-cog\"></span>\r\n                                        Manage\r\n                                    </button>\r\n                                    <ul class=\"dropdown-menu caret-left\">\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </ul>\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.edit", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.edit", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.move", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.move", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n\r\n                                            <li>\r\n                                                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteCard", "card", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete card</a>\r\n                                            </li>\r\n                                        ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    Edit card\r\n                                                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    Move card to another vault\r\n                                                ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberIndex", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberIndex", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n                                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    Share\r\n                                                ");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n                                        ");
  return buffer;
  }
function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    Add secret\r\n                                                ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"vlt-secret-box\">\r\n                        <div class=\"vlt-visual\">\r\n                            <div class=\"vlt-visual-bg\"></div>\r\n                        </div>\r\n                        ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n\r\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemView", {hash:{
    'secret': ("content")
  },hashTypes:{'secret': "ID"},hashContexts:{'secret': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <div class=\"jumbotron vlt-bigbox vlt-secret\">\r\n                                <div class=\"vlt-header\">\r\n                                    <div class=\"vlt-icon\">\r\n                                    </div>\r\n                                    <div class=\"vlt-title\">\r\n                                        <h1>You do not have any secret yet</h1>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                    ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                    <p>\r\n                                        This card is empty.\r\n                                        Please create one or more secrets on this card.\r\n                                        Secret are secured by encryption and accessible only to you and your team.\r\n                                        Secret could be password, note, credit card number or key file\r\n                                    </p>\r\n\r\n                                    <p class=\"top-30\">\r\n                                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </p>\r\n                                ");
  return buffer;
  }
function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                            Add secret\r\n                                        ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "card.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }

function program22(depth0,data) {
  
  
  data.buffer.push("\r\n                            No description given\r\n                        ");
  }

function program24(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                <div\r\n                                        class=\"vlt-button-wrapper\"\r\n                                        data-toggle=\"tooltip\"\r\n                                        title=\r\n                                                \"\r\n                                                 Create one or more secrets on this card.\r\n                                                 Secrets are secured by encryption and accessible only to you and your team.\r\n                                                 Secret could be password, note, credit card number or key file\r\n                                                 \"\r\n                                        data-placement=\"bottom\"\r\n                                        >\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program25(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                        Add secret\r\n                                    ");
  }

function program27(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div class=\"btn-group\">\r\n                                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\r\n                                            data-toggle=\"dropdown\">\r\n                                        <span class=\"glyphicon glyphicon-cog\"></span>\r\n                                        Properties\r\n                                    </button>\r\n                                    <ul class=\"dropdown-menu caret-left\">\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </ul>\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.edit", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.edit", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n\r\n                                            <li>\r\n                                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.move", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.move", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n\r\n                                        ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n\r\n                                            <li>\r\n                                                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteCard", "card", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete card</a>\r\n                                            </li>\r\n                                        ");
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                <div\r\n                                        class=\"vlt-button-wrapper\"\r\n                                        data-toggle=\"tooltip\"\r\n                                        title=\r\n                                                \"\r\n                                     Invite new team members to collaborate over this card\r\n                                     or  grant access permission to current team members\r\n                                     \"\r\n                                        data-placement=\"bottom\"\r\n                                        >\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberInvite", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberInvite", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program33(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                        Invite\r\n                                    ");
  }

function program35(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                <div\r\n                                        class=\"vlt-button-wrapper\"\r\n                                        data-toggle=\"tooltip\"\r\n                                        title=\r\n                                                \"\r\n                                     Invite new team members to collaborate over this card\r\n                                     or  grant access permission to current team members\r\n                                     \"\r\n                                        data-placement=\"bottom\"\r\n                                        >\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberIndex", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberIndex", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program36(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"glyphicon glyphicon-user\"></span>\r\n                                        Team\r\n                                    ");
  }

  data.buffer.push("<div class=\"container-full\">\r\n    <div class=\"vlt-page vlt-page-with-sidebar\">\r\n\r\n        <div class=\"vlt-page-content\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\"vlt-page-content-responsive-header\">\r\n                    <div class=\"row-fluid\">\r\n                        <div class=\"col-xs-3\">\r\n                            ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( card.perms.update || card.perms.delete || card.perms.create || card.perms.invite )", options) : helperMissing.call(depth0, "exp", "( card.perms.update || card.perms.delete || card.perms.create || card.perms.invite )", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n\r\n                        <div class=\"col-xs-9\">\r\n                            <h2>Card: ");
  stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h2>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"top-30 vlt-items\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(16, program16, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n             </div>\r\n        </div>\r\n\r\n        <div class=\"vlt-page-sidebar\">\r\n            <div class=\"vlt-sidebar-block\">\r\n                <div class=\"vlt-sidebar-block-heading\">\r\n                    <div class=\"vlt-header\">\r\n                        <img src=\"/static/vaultier/images/icon-vault-grey.png\" class=\"vlt-icon\">\r\n\r\n                        <h3 class=\"vlt-title\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </h3>\r\n                    </div>\r\n                    <div class=\"vlt-body\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "card.description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"vlt-controls\">\r\n                        <div>\r\n\r\n                            ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( card.perms.update || card.perms.delete)", options) : helperMissing.call(depth0, "exp", "( card.perms.update || card.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"vlt-sidebar-block-sharing\">\r\n                    <div class=\"vlt-header\">\r\n                        <img src=\"/static/vaultier/images/icon-team-grey.png\" class=\"vlt-icon\">\r\n\r\n                        <h3 class=\"vlt-title\">\r\n                            Sharing with\r\n                        </h3>\r\n                    </div>\r\n                    <div class=\"vlt-body\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("card")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"vlt-controls\">\r\n                        <div>\r\n                            ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretTypeNoteView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretTypePasswordView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretTypeFileView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n            <form>\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Edit secret</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n\n                        ");
  stack1 = helpers['if'].call(depth0, "isNote", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        ");
  stack1 = helpers['if'].call(depth0, "isPassword", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        ");
  stack1 = helpers['if'].call(depth0, "isFile", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("saveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Save changes\n                        </button>\n                    </div>\n\n                </div>\n            </form>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                <a>\r\n                                    Choose secret you want to create\r\n                                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                                </a>\r\n                            ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                                <a>\r\n                                    Fillout data\r\n                                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                                </a>\r\n                            ");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                                <span class=\"glyphicon glyphicon-ok\"></span>\r\n                                Submit\r\n                            </a>\r\n                        ");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page vlt-page-plain\">\r\n            <div class=\"vlt-dialog col-md-10 col-md-offset-1 top-50\">\r\n\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>Create new secret wizard</h2>\r\n\r\n                        <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\r\n                            ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("createSelect")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("createSubmit")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "tab", options) : helperMissing.call(depth0, "outlet", "tab", options))));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"javascript:history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            Back\r\n                        </a>\r\n                        ");
  stack1 = helpers['if'].call(depth0, "submitButtonShown", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretTypeSelect"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon password\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret password</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    This type of secret allows yout to save ordinary password\r\n                    together with username, url and related note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon note\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret note</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    Secret as note, you can save whatever text you want.\r\n                    You can use markdown to format note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon file\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret file</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    Store file up to 25KB filesize, you can also anotate file with username,\r\n                    password and note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

  data.buffer.push("<div class=\"vlt-create-secret col-md-10 col-md-offset-1\">\r\n\r\n    <h4>Please select type of secret you would like to create</h4>\r\n\r\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Secret.createSubmit", "password", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "password", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Secret.createSubmit", "note", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "note", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Secret.createSubmit", "file", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "file", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretTypeNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n<div class=\"col-md-5 bottom-15\">\r\n    <div class=\"callout callout-info\">\r\n        <h4>Secret will be shared with:</h4>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("card")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isCreateAction:col-md-7:col-md-10 view.isCreateAction::col-md-offset-1 ")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n\r\n\r\n    <h4>Title</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        <span class=\"error\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n    <div class=\"help-block\">\r\n        Informational field. Do not enter any sensitive information. This field is not encrypted\r\n    </div>\r\n\r\n\r\n    <h4 class=\"top-30\">Please fillout your note</h4>\r\n    <hr class=\"top-0\"/>\r\n    <div class=\"form-group\">\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.EditorInput", {hash:{
    'elementId': ("secret-description"),
    'valueBinding': ("content.note"),
    'class': ("form-control"),
    'rows': (8)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        <div class=\"help-block\">\r\n            Markdown is available. Markdown manual <a\r\n                href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\" target=\"_blank\">here</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  stack1 = helpers.unless.call(depth0, "content.id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretTypePassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n<div class=\"col-md-5 bottom-15\">\r\n    <div class=\"callout callout-info\">\r\n        <h4>Secret will be shared with:</h4>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("card")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isCreateAction:col-md-7:col-md-10 view.isCreateAction::col-md-offset-1 ")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n\r\n\r\n    <h4>Title</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        <span class=\"error\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n    </div>\r\n    <div class=\"help-block\">\r\n        Informational field. Do not enter any sensitive information. This field is not cyphered\r\n    </div>\r\n\r\n    <h4 class=\"top-30\">Please fillout data for your password secret</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.url:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-url\">URL</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-url"),
    'valueBinding': ("content.url"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.username:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-username\">Username</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-username"),
    'valueBinding': ("content.username"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.password:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-password\">Password</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.password", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['password-field'] || (depth0 && depth0['password-field']),options={hash:{
    'elementId': ("secret-password-component"),
    'inputId': ("secret-password"),
    'value': ("content.password")
  },hashTypes:{'elementId': "STRING",'inputId': "STRING",'value': "ID"},hashContexts:{'elementId': depth0,'inputId': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "password-field", options))));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.note:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-note\">Note</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.note", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("secret-note"),
    'valueBinding': ("content.note"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n    <div class=\"help-block\">\r\n        Markdown is available. Markdown manual <a\r\n            href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\"\r\n            target=\"_blank\">\r\n        here\r\n    </a>\r\n    </div>\r\n</div>\r\n\r\n");
  stack1 = helpers.unless.call(depth0, "content.id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div class=\"clearfix\"></div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretTypeFile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n<div class=\"col-md-5 bottom-15\">\r\n    <div class=\"callout callout-info\">\r\n        <h4>Secret will be shared with:</h4>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user"),
    'object': ("card")
  },hashTypes:{'roles': "ID",'user': "ID",'object': "ID"},hashContexts:{'roles': depth0,'user': depth0,'object': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.isCreateAction:col-md-7:col-md-10 view.isCreateAction::col-md-offset-1 ")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n\r\n\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-name\">Name</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        <div class=\"help-block\">\r\n            Informational field. Do not enter any sensitive information. This field is not cyphered\r\n        </div>\r\n    </div>\r\n\r\n    <h4>Please fillout data for your file secret</h4>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.url:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-url\">URL</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-url"),
    'valueBinding': ("content.url"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.username:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-username\">Username</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-username"),
    'valueBinding': ("content.username"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.password:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-password\">Password</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.password", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['password-field'] || (depth0 && depth0['password-field']),options={hash:{
    'elementId': ("secret-password-component"),
    'inputId': ("secret-password"),
    'value': ("content.password")
  },hashTypes:{'elementId': "STRING",'inputId': "STRING",'value': "ID"},hashContexts:{'elementId': depth0,'inputId': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "password-field", options))));
  data.buffer.push("\r\n    </div>\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-file\" class=\"control-label\">Secret file</label>\r\n\r\n        <div class=\"input-group\">\r\n            <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("content.filename")
  },hashTypes:{'value': "STRING"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                    type=\"text\"\r\n                    class=\"form-control vlt-filename\"\r\n                    readonly=\"\"\r\n                    placeholder=\"Select your key\">\r\n\r\n            <span class=\"vlt-secret-type-file input-group-btn btn btn-default btn-file\">\r\n                Browse <input type=\"file\">\r\n            </span>\r\n\r\n        </div>\r\n        <div class=\"help-block\">\r\n            Store file up to 25KB filesize\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n        <label for=\"secret-note\">Note</label>\r\n        ");
  stack1 = helpers._triageMustache.call(depth0, "errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("secret-note"),
    'valueBinding': ("content.note"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n\r\n");
  stack1 = helpers.unless.call(depth0, "content.id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div class=\"clearfix\"></div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretIndexItemNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <h3 class=\"top-0\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                <div class=\"vlt-attrs\">\r\n                    <div class=\"vlt-markdown\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.renderMarkdown || (depth0 && depth0.renderMarkdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "note", options) : helperMissing.call(depth0, "renderMarkdown", "note", options))));
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                <div class=\"alert alert-warning top-15\">\r\n                    Encrypted data cannot be decrypted\r\n                </div>\r\n            ");
  }

  data.buffer.push("<div class=\"vlt-secret-item-note\">\r\n    <div class=\"vlt-wrapper\">\r\n        <div class=\"vlt-visual\">\r\n            <div class=\"vlt-icon\">\r\n            </div>\r\n            <div class=\"vlt-type\">\r\n                Note\r\n            </div>\r\n        </div>\r\n        <div class=\"vlt-inner\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "decrypted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretIndexItemPassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <h3 class=\"top-0\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <div class=\"vlt-attrs\">\r\n                    <table class=\"table table-bordered\">\r\n                        <colgroup>\r\n                            <col class=\"col-lg-1\">\r\n                            <col class=\"col-lg-7\">\r\n                        </colgroup>\r\n                        <tbody>\r\n                        ");
  stack1 = helpers['if'].call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "note", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    URL\r\n                                </td>\r\n                                <td><a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("url")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" target=\"_blank\">");
  stack1 = helpers._triageMustache.call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Username\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Password\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Note\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"vlt-markdown\">\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.renderMarkdown || (depth0 && depth0.renderMarkdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "note", options) : helperMissing.call(depth0, "renderMarkdown", "note", options))));
  data.buffer.push("\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program12(depth0,data) {
  
  
  data.buffer.push("\r\n                <div class=\"alert alert-warning top-15\">\r\n                    Encrypted data cannot be decrypted\r\n                </div>\r\n            ");
  }

  data.buffer.push("<div class=\"vlt-secret-item-password\">\r\n    <div class=\"vlt-wrapper\">\r\n        <div class=\"vlt-visual\">\r\n            <div class=\"vlt-icon\">\r\n            </div>\r\n            <div class=\"vlt-type\">\r\n                Password\r\n            </div>\r\n        </div>\r\n        <div class=\"vlt-inner\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "decrypted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretIndexItemFile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <div class=\"vlt-attrs\">\r\n                    <table class=\"table table-bordered\">\r\n                        <colgroup>\r\n                            <col class=\"col-lg-1\">\r\n                            <col class=\"col-lg-7\">\r\n                        </colgroup>\r\n                        <tbody>\r\n                        ");
  stack1 = helpers['if'].call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "filename", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "filesize", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "__hidden__filetype", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "note", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemControlsView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    URL\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Username\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Password\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "password", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Filename\r\n                                </td>\r\n                                <td>\r\n                                    ");
  stack1 = helpers._triageMustache.call(depth0, "filename", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadBlob", "content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-default btn-sm pull-right\">\r\n                                        <span class=\"glyphicon glyphicon-save\"></span>\r\n                                        Save to computer\r\n                                    </a>\r\n                                </td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Filesize\r\n                                </td>\r\n                                <td>");
  data.buffer.push(escapeExpression((helper = helpers.humanFilesize || (depth0 && depth0.humanFilesize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "filesize", options) : helperMissing.call(depth0, "humanFilesize", "filesize", options))));
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Mime type\r\n                                </td>\r\n                                <td>");
  stack1 = helpers._triageMustache.call(depth0, "filetype", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                            <tr>\r\n                                <td class=\"vlt-attr-name\">\r\n                                    Note\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"vlt-markdown\">\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.renderMarkdown || (depth0 && depth0.renderMarkdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "note", options) : helperMissing.call(depth0, "renderMarkdown", "note", options))));
  data.buffer.push("\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                        ");
  return buffer;
  }

function program16(depth0,data) {
  
  
  data.buffer.push("\r\n                <div class=\"alert alert-warning top-15\">\r\n                    Encrypted data cannot be decrypted\r\n                </div>\r\n            ");
  }

  data.buffer.push("<div class=\"vlt-secret-item-file\">\r\n    <div class=\"vlt-wrapper\">\r\n        <div class=\"vlt-visual\">\r\n            <div class=\"vlt-icon\">\r\n            </div>\r\n            <div class=\"vlt-type\">\r\n                File\r\n            </div>\r\n        </div>\r\n        <div class=\"vlt-inner\">\r\n            <h3 class=\"top-0\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "decrypted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(16, program16, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretIndexItemControls"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n        <div class=\"vlt-buttons col-md-6\">\r\n            <div class=\"btn-group\">\r\n                <a type=\"button\"\r\n                   class=\"btn btn-default dropdown-toggle btn-sm\"\r\n                   data-toggle=\"dropdown\">\r\n                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                </a>\r\n                <ul class=\"dropdown-menu caret-left\">\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  stack1 = helpers['if'].call(depth0, "perms.delete", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <li>\r\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Secret.edit", "id", options) : helperMissing.call(depth0, "link-to", "Secret.edit", "id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Secret.move", "id", options) : helperMissing.call(depth0, "link-to", "Secret.move", "id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </li>\r\n                    ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Edit secret");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Move secret to another card");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li>\r\n                            <a href=\"javascript:\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSecret", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">Delete secret</a>\r\n                        </li>\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-controls\">\r\n    <div class=\"vlt-author col-md-6\">\r\n        <div class=\"vlt-footer-item help-block pull-left\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{
    'ellipsis': (12),
    'prefix': ("Created by:")
  },hashTypes:{'ellipsis': "INTEGER",'prefix': "STRING"},hashContexts:{'ellipsis': depth0,'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "created_by", options) : helperMissing.call(depth0, "printUser", "created_by", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"vlt-footer-item help-block pull-right\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.printAgo || (depth0 && depth0.printAgo),options={hash:{
    'prefix': ("Latest modification at:")
  },hashTypes:{'prefix': "STRING"},hashContexts:{'prefix': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "updated_at", options) : helperMissing.call(depth0, "printAgo", "updated_at", options))));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"clearfix\"></div>\r\n    </div>\r\n\r\n    ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "(perms.update || perms.delete)", options) : helperMissing.call(depth0, "exp", "(perms.update || perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretMove"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        <div class=\"vlt-dialog vlt-dialog-window\">\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Move secret to another card</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <h4>Please select target card</h4>\n                        <div class=\"vlt-tree\">\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Tree", {hash:{
    'content': ("treeNodes")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        </div>\n                        <div class=\"help-block\">\n                            Also all granted permissions will be moved.\n                        </div>\n                        <div class=\"clearfix\"></div>\n                   </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("moveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Move\n                        </button>\n                    </div>\n\n                </div>\n        </div>\n    </div>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretMoveVaultNode"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-node vlt-vault\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.loading:vlt-loading")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "view.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["Secret/SecretMoveCardNode"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-node vlt-card\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("view.loading:vlt-loading")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n\n    <label>\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Radio", {hash:{
    'name': ("move-target"),
    'value': ("view.content.id")
  },hashTypes:{'name': "STRING",'value': "ID"},hashContexts:{'name': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
  stack1 = helpers._triageMustache.call(depth0, "view.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </label>\n</div>");
  return buffer;
  
});

//# sourceMappingURL=secrets.tpl.js.map