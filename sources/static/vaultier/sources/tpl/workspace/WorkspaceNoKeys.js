Ember.TEMPLATES["Workspace/WorkspaceNoKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                            No description given\n                        ");
  }

  data.buffer.push("<div class=\"container-full\">\n    <div class=\"vlt-page vlt-page-with-sidebar\">\n        <div class=\"vlt-page-content\">\n            <div class=\"col-md-12\">\n\n                <div class=\"vlt-page-content-responsive-header\">\n                    <div class=\"row-fluid\">\n                        <div class=\"col-xs-12 text-center\">\n                            <h2>Workspace: ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h2>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                </div>\n\n                <div class=\"top-50\">\n                    <div class=\"jumbotron vlt-bigbox vlt-no-keys\">\n                        <div class=\"vlt-header\">\n                            <div class=\"vlt-icon\">\n\n                            </div>\n                            <div class=\"vlt-title\">\n                                <h1>You do not have keys to workspace yet </h1>\n                            </div>\n                        </div>\n                        <p>\n                            Please wait till keys will be automatically transfered to you\n                            when somebody of team goes online. You will get email once keys received.\n                            <br/>\n                            <br/>\n                            Keys are used to encrypt and decrypt workspace data\n\n                        </p>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"vlt-page-sidebar\">\n            <div class=\"vlt-sidebar-block\">\n                <div class=\"vlt-sidebar-block-heading\">\n                    <div class=\"vlt-header\">\n                        <img src=\"/static/vaultier/images/icon-workspace-grey.png\" class=\"vlt-icon\">\n\n                        <h3 class=\"vlt-title\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "workspace.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </h3>\n                    </div>\n                    <div class=\"vlt-body\">\n                        ");
  stack1 = helpers['if'].call(depth0, "workspace.description", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"vlt-sidebar-block-sharing\">\n                    <div class=\"vlt-header\">\n                        <img src=\"/static/vaultier/images/icon-team-grey.png\" class=\"vlt-icon\">\n\n                        <h3 class=\"vlt-title\">\n                            Sharing with\n                        </h3>\n                    </div>\n                    <div class=\"vlt-body\">\n                         ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n");
  return buffer;
  
});