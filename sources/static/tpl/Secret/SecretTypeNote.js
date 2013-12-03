Ember.TEMPLATES["Secret/SecretTypeNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"col-md-10 col-md-offset-1\">\r\n\r\n    <h4>Title</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("secret-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        <span class=\"error\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n    </div>\r\n    <div class=\"help-block\">\r\n        Informational field. Do not enter any sensitive information. This field is not cyphered\r\n    </div>\r\n\r\n\r\n    <h4 class=\"top-30\">Please fillout your note</h4>\r\n    <hr class=\"top-0\"/>\r\n\r\n    <div class=\"form-group\">\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.EpicEditorInput", {hash:{
    'elementId': ("card-description"),
    'valueBinding': ("content.note"),
    'class': ("form-control"),
    'rows': (8)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        <div class=\"help-block\">\r\n            Markdown is available. Markdown manual <a\r\n                href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\" target=\"_blank\">here</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n");
  return buffer;
  
});
