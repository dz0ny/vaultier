Ember.TEMPLATES["Secret/SecretTypeNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n<div class=\"col-md-5 bottom-15\">\r\n    <div class=\"callout callout-info\">\r\n        <h4>Secret will be shared with:</h4>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
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