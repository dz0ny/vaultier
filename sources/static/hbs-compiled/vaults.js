Ember.TEMPLATES["vaults"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n\r\n        <a href=\"#\" class=\"panel panel-primary pull-left vlt-item vlt-vault-item\">\r\n            <div class=\"panel-icon\">\r\n                <img src=\"/static/images/icon-vault.png\">\r\n            </div>\r\n            <div class=\"panel-header\">\r\n                <h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("  This is vault with very long name. Lorem ipsum dolor sit amet </h3>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n                Mauris quis est turpis. Aliquam varius, lorem a sollicitudin vehicula,\r\n                diam orci tincidunt augue, quis viverra mauris nibh at dui.\r\n                Nunc pretium mauris vel hendrerit interdum. Proin euismod interdum\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r\n                Mauris quis est turpis. Aliquam varius, lorem a sollicitudin vehicula,\r\n                diam orci tincidunt augue, quis viverra mauris nibh at dui.\r\n                Nunc pretium mauris vel hendrerit interdum. Proin euismod interdum\r\n            </div>\r\n            <div class=\"panel-footer\">\r\n                <div class=\"row\">\r\n                    <small>\r\n                        <div class=\"col-md-4 vlt-cards\">\r\n                            Cards: 22\r\n                        </div>\r\n                        <div class=\"col-md-8 vlt-updated\">\r\n                            Updated: 5 days ago\r\n                        </div>\r\n                    </small>\r\n                </div>\r\n            </div>\r\n        </a>\r\n\r\n    ");
  return buffer;
  }

  data.buffer.push("    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});
