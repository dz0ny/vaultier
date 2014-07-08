Ember.TEMPLATES["Layout/Footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div id=\"vlt-footer\">\n    <div class=\"container\">\n        <div class=\"pull-left vlt-business\">\n            <p>\n                <a href=\"http://rightclick.formees.cz/f/vaultier/\" class=\"btn btn-success\" target=\"_blank\">\n                    Enterprise Edition & Business Solutions\n                </a>\n                <a href=\"mailto:info@rclick.cz\" class=\"btn btn-default\">\n                    Contact us\n                </a>\n            </p>\n        </div>\n        <div class=\"pull-right vlt-rclick\">\n            <a href=\"http://www.rclick.cz/\" target=\"_blank\">\n                <img height=\"35px\" src=\"/static/vaultier/images/rclick.png\">\n            </a></p>\n        </div>\n        <div class=\"pull-right vlt-version\">\n           Vaultier  ");
  stack1 = helpers._triageMustache.call(depth0, "config.VERSION", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});