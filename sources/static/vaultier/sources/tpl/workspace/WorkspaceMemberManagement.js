Ember.TEMPLATES["Workspace/WorkspaceMemberManagement"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-page-nav\">\n\n            <div class=\"vlt-page-toolbar pull-right\">\n                <div>\n                    <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                        Back\n                    </a>\n\n                </div>\n            </div>\n\n            <div class=\"pull-left\">\n                <h2>");
  stack1 = helpers._triageMustache.call(depth0, "content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MemberManagementView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});