Ember.TEMPLATES["Layout/SecurityBox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"panel panel-default vlt-security-box dropdown pull-right\">\r\n    <img class=\"vlt-avatar\" src=\"http://www.gravatar.com/avatar/");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "avatar", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\r\n\r\n    <a href=\"#\" class=\"vlt-username dropdown-toggle\" data-toggle=\"dropdown\">\r\n        Jan Misek\r\n    </a>\r\n\r\n    <ul class=\"dropdown-menu vlt-dropdown\">\r\n        <li><a href=\"#\">Separated link</a></li>\r\n        <li><a href=\"#\">One more separated link</a></li>\r\n    </ul>\r\n</div>\r\n");
  return buffer;
  
});
