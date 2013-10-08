Ember.TEMPLATES["Vault/IndexItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("\r\n    <a href=\"#\" class=\"panel panel-primary pull-left vlt-item vlt-vault-item\">\r\n        <div class=\"panel-icon\">\r\n            <img src=\"/static/images/icon-vault.png\">\r\n        </div>\r\n        <div class=\"panel-header\">\r\n            <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"panel-footer\">\r\n            <div class=\"row\">\r\n                <small>\r\n                    <div class=\"col-md-4 vlt-cards\">\r\n                        Cards: 22\r\n                    </div>\r\n                    <div class=\"col-md-8 vlt-updated\">\r\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.test", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                        Updated: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "updatedAgo", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                    </div>\r\n                </small>\r\n            </div>\r\n        </div>\r\n    </a>\r\n\r\n");
  return buffer;
  
});
