Ember.TEMPLATES["Layout/Confirm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal fade\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                <h4 class=\"modal-title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "text", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                </p>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <a href=\"#\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</a>\r\n                <a href=\"#\" ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "ID"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "ok", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary\">Ok</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});
