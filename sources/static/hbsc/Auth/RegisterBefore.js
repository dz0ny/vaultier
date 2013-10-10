Ember.TEMPLATES["Auth/RegisterBefore"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"callout callout-info\">\r\n    <h4>How our security works - ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\r\n\r\n    <p>\r\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu\r\n        nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n    </p>\r\n\r\n    <h4>Steps of registration</h4>\r\n\r\n    <p>\r\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu\r\n        nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n    </p>\r\n\r\n</div>\r\n");
  return buffer;
  
});
