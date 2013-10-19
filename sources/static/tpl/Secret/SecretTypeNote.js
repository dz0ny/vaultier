Ember.TEMPLATES["Secret/SecretTypeNote"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"col-md-10 col-md-offset-1\">\r\n\r\n\r\n    <div class=\"form-group\">\r\n        <label for=\"card-description\">\r\n            <h4>Please enter your note text:</h4>\r\n        </label>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("card-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (8)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n\r\n");
  return buffer;
  
});
