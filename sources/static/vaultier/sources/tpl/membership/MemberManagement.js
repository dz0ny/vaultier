Ember.TEMPLATES["Member/MemberManagement"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        <span class=\"glyphicon glyphicon-user\"></span>\n                        Invite\n                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['member-manager-accordion'] || (depth0 && depth0['member-manager-accordion']),options={hash:{
    'member': ("member"),
    'deleteMember': ("deleteMember"),
    'loadRoles': ("loadRoles"),
    'deleteRole': ("deleteRole")
  },hashTypes:{'member': "ID",'deleteMember': "STRING",'loadRoles': "STRING",'deleteRole': "STRING"},hashContexts:{'member': depth0,'deleteMember': depth0,'loadRoles': depth0,'deleteRole': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-manager-accordion", options))));
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