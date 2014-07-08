Ember.TEMPLATES["Secret/SecretIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <div class=\"btn-group\">\r\n                                <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\r\n                                        data-toggle=\"dropdown\">\r\n                                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                                    Manage\r\n                                </button>\r\n                                <ul class=\"dropdown-menu caret-left\">\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </ul>\r\n                            </div>\r\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.edit", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.edit", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.move", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.move", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n\r\n                                        <li>\r\n                                            <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteCard", "card", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete card</a>\r\n                                        </li>\r\n                                    ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                                                Edit card\r\n                                            ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                                Move card to another vault\r\n                                            ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberIndex", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberIndex", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n                                    ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                                                Share\r\n                                            ");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n                                    ");
  return buffer;
  }
function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                                                Add secret\r\n                                            ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers['if'].call(depth0, "isNote", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "isPassword", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "isFile", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemNoteView", {hash:{
    'class': ("vlt-secret vlt-note")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemPasswordView", {hash:{
    'class': ("vlt-secret vlt-password")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.SecretIndexItemFileView", {hash:{
    'class': ("vlt-secret vlt-file")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n\r\n                        <div class=\"jumbotron vlt-bigbox vlt-secret\">\r\n                            <div class=\"vlt-header\">\r\n                                <div class=\"vlt-icon\">\r\n\r\n                                </div>\r\n                                <div class=\"vlt-title\">\r\n                                    <h1>You do not have any secret yet</h1>\r\n                                </div>\r\n                            </div>\r\n\r\n                            ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n\r\n                ");
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n                                <p>\r\n                                    This card is empty.\r\n                                    Please create one or more secrets on this card.\r\n                                    Secret are secured by encryption and accessible only to you and your team.\r\n                                    Secret could be password, note, credit card number or key file\r\n                                </p>\r\n\r\n                                <p class=\"top-30\">\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </p>\r\n\r\n                            ");
  return buffer;
  }
function program23(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                        Add secret\r\n                                    ");
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "card.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program27(depth0,data) {
  
  
  data.buffer.push("\r\n                        No description given\r\n                    ");
  }

function program29(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            <div\r\n                                    class=\"vlt-button-wrapper\"\r\n                                    data-toggle=\"tooltip\"\r\n                                    title=\r\n                                            \"\r\n                                             Create one or more secrets on this card.\r\n                                             Secrets are secured by encryption and accessible only to you and your team.\r\n                                             Secret could be password, note, credit card number or key file\r\n                                             \"\r\n                                    data-placement=\"bottom\"\r\n                                    >\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Secret.createSelect", options) : helperMissing.call(depth0, "link-to", "Secret.createSelect", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        ");
  return buffer;
  }
function program30(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                    Add secret\r\n                                ");
  }

function program32(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <div class=\"btn-group\">\r\n                                <button type=\"button\" class=\"btn btn-default dropdown-toggle\"\r\n                                        data-toggle=\"dropdown\">\r\n                                    <span class=\"glyphicon glyphicon-cog\"></span>\r\n                                    Properties\r\n                                </button>\r\n                                <ul class=\"dropdown-menu caret-left\">\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "card.perms.update", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </ul>\r\n                            </div>\r\n                        ");
  return buffer;
  }
function program33(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.edit", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.edit", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n\r\n                                        <li>\r\n                                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.move", "card.slug", options) : helperMissing.call(depth0, "link-to", "Card.move", "card.slug", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        </li>\r\n\r\n                                    ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n\r\n                                        <li>\r\n                                            <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteCard", "card", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" >Delete card</a>\r\n                                        </li>\r\n                                    ");
  return buffer;
  }

function program37(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            <div\r\n                                    class=\"vlt-button-wrapper\"\r\n                                    data-toggle=\"tooltip\"\r\n                                    title=\r\n                                            \"\r\n                                 Invite new team members to collaborate over this card\r\n                                 or  grant access permission to current team members\r\n                                 \"\r\n                                    data-placement=\"bottom\"\r\n                                    >\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(38, program38, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberInvite", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberInvite", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        ");
  return buffer;
  }
function program38(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"glyphicon glyphicon-plus\"></span>\r\n                                    Invite\r\n                                ");
  }

function program40(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            <div\r\n                                    class=\"vlt-button-wrapper\"\r\n                                    data-toggle=\"tooltip\"\r\n                                    title=\r\n                                            \"\r\n                                 Invite new team members to collaborate over this card\r\n                                 or  grant access permission to current team members\r\n                                 \"\r\n                                    data-placement=\"bottom\"\r\n                                    >\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "Card.memberIndex", "card", options) : helperMissing.call(depth0, "link-to", "Card.memberIndex", "card", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        ");
  return buffer;
  }
function program41(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <span class=\"glyphicon glyphicon-user\"></span>\r\n                                    Team\r\n                                ");
  }

  data.buffer.push("<div class=\"container-full\">\r\n    <div class=\"vlt-page vlt-page-with-sidebar\">\r\n\r\n    <div class=\"vlt-page-content\">\r\n        <div class=\"col-md-12\">\r\n\r\n            <div class=\"vlt-page-content-responsive-header\">\r\n                <div class=\"row-fluid\">\r\n                    <div class=\"col-xs-3\">\r\n                        ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( card.perms.update || card.perms.delete || card.perms.create || card.perms.invite )", options) : helperMissing.call(depth0, "exp", "( card.perms.update || card.perms.delete || card.perms.create || card.perms.invite )", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n\r\n                    <div class=\"col-xs-9\">\r\n                        <h2>Card: ");
  stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h2>\r\n                    </div>\r\n\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"top-30\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"vlt-page-sidebar\">\r\n        <div class=\"vlt-sidebar-block\">\r\n            <div class=\"vlt-sidebar-block-heading\">\r\n                <div class=\"vlt-header\">\r\n                    <img src=\"/static/vaultier/images/icon-vault-grey.png\" class=\"vlt-icon\">\r\n\r\n                    <h3 class=\"vlt-title\">\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </h3>\r\n                </div>\r\n                <div class=\"vlt-body\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "card.description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"vlt-controls\">\r\n                    <div>\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.create", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = (helper = helpers.exp || (depth0 && depth0.exp),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(32, program32, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "( card.perms.update || card.perms.delete)", options) : helperMissing.call(depth0, "exp", "( card.perms.update || card.perms.delete)", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"vlt-sidebar-block-sharing\">\r\n                <div class=\"vlt-header\">\r\n                    <img src=\"/static/vaultier/images/icon-team-grey.png\" class=\"vlt-icon\">\r\n\r\n                    <h3 class=\"vlt-title\">\r\n                        Sharing with\r\n                    </h3>\r\n                </div>\r\n                <div class=\"vlt-body\">\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\r\n                </div>\r\n                <div class=\"vlt-controls\">\r\n                    <div>\r\n                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "card.perms.invite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n");
  return buffer;
  
});