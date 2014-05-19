Ember.TEMPLATES["Secret/SecretTypePassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"col-md-10 col-md-offset-1\">\r\n\r\n    <h4>Title</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\" ");
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
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-password"),
    'valueBinding': ("content.password"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
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
  data.buffer.push("\r\n    </div>\r\n    <div class=\"help-block\">\r\n        Markdown is available. Markdown manual <a\r\n            href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\"\r\n            target=\"_blank\">\r\n        here\r\n    </a>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>");
  return buffer;
  
});