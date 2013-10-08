Ember.TEMPLATES["Vault/Create"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rollback", "content", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"close\" data-dismiss=\"modal\"\r\n                                                  aria-hidden=\"true\">&times;</button>\r\n                <h4 class=\"modal-title\">Modal title</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n\r\n                    <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("errors.name:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n                        <label for=\"vault-name\">Vault name</label>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("vault-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"vault-description\">Vault description</label>\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("vault-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rollback", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n                    Close\r\n                </button>\r\n                <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "commit", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary\">\r\n                    Save\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});
