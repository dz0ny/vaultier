Ember.TEMPLATES["Layout/Layout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"navbar navbar-default navbar-fixed-top\">\r\n\r\n    <div class=\"container\">\r\n\r\n        <div class=\"navbar-header\">\r\n\r\n            <div class=\"navbar-brand vlt-branding\">\r\n                <div class=\"vlt-brand\">\r\n                    <a href=\"#\">\r\n                        <img class=\"vlt-brandimg\" src=\"/static/images/logo.png\">\r\n\r\n                        <div class=\"vlt-brandname\">\r\n                            Vaultier\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"navbar-right\">\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.LayoutSecurityBox", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.LayoutAccountBox", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n            <div class=\"clearfix\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"vlt-breads\">\r\n    <div class=\"container\">\r\n        <ol class=\"breadcrumb\">\r\n            <li><a href=\"#\">Home</a></li>\r\n            <li><a href=\"#\">This</a></li>\r\n            <li><a href=\"#\">Bread</a></li>\r\n            <li><a href=\"#\">is</a></li>\r\n            <li class=\"active\"><h2>Active</h2></li>\r\n        </ol>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"container vlt-page\">\r\n\r\n    <div class=\"vlt-page-nav\">\r\n\r\n        <ul class=\"vlt-page-tabs nav nav-tabs\">\r\n            <li class=\"active\"><a href=\"#\">Home</a></li>\r\n            <li><a href=\"#\">Profile</a></li>\r\n            <li><a href=\"#\">Messages</a></li>\r\n        </ul>\r\n\r\n        <div class=\"vlt-page-toolbar pull-right\">\r\n            <div class=\"btn-group\">\r\n\r\n                <a href=\"#\" class=\"btn btn-sm btn-default\">\r\n                    <span class=\"glyphicon glyphicon-pencil\"></span>\r\n                    Edit vault\r\n                </a>\r\n\r\n                <div class=\"btn-group\">\r\n                    <a href=\"#\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <span class=\"glyphicon glyphicon-sort\"></span>\r\n                        Dropdown\r\n                        <b class=\"caret\"></b>\r\n                    </a>\r\n\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a href=\"#\">Most recent</a></li>\r\n                        <li><a href=\"#\">Alphabetically</a></li>\r\n                        <li class=\"divider\"></li>\r\n                        <li><a href=\"#\">Separated link</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n\r\n            <a href=\"#\" class=\"btn btn-primary\">\r\n                <span class=\"glyphicon glyphicon-plus\"></span>\r\n                New card\r\n            </a>\r\n\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n\r\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n<div class=\"vlt-footer\">\r\n    <div class=\"container\">\r\n        <p>&copy; Company 2013</p>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
