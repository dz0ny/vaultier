Ember.TEMPLATES["Vault/VaultHistoryIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-page-nav\">\n\n    <div class=\"vlt-page-toolbar pull-right\">\n        <div>\n\n            <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                Back\n            </a>\n\n            <a href=\"\" class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                Clear history\n            </a>\n\n        </div>\n    </div>\n\n    <div class=\"pull-left\">\n        <h2>History of vault \"My secrets\"</h2>\n    </div>\n\n    <div class=\"clearfix\"></div>\n</div>\n\n<div class=\"vlt-page-history\">\n\n    <div class=\"panel panel-default vlt-panel-history top-30\">\n        <div class=\"table vlt-table\">\n\n            <div class=\"vlt-row\">\n                <div class=\"col-md-3 vlt-col vlt-col-user\">\n                    ");
  hashContexts = {'size': depth0};
  hashTypes = {'size': "INTEGER"};
  options = {hash:{
    'size': (50)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "none", options) : helperMissing.call(depth0, "printUser", "none", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-2 vlt-col vlt-col-desc\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "date", options) : helperMissing.call(depth0, "printAgo", "date", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-3 vlt-col vlt-col-desc\">\n                    Modified <b>name</b>, <b>description</b>\n                </div>\n\n                <div class=\"col-md-4 vlt-col vlt-col-controls text-right\">\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-eye-open\"></span>\n                    </button>\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                    </button>\n                    <button class=\"btn btn-success\">\n                        <span class=\"glyphicon glyphicon-repeat\"></span>\n                        Revert\n                    </button>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n\n            <div class=\"vlt-row\">\n                <div class=\"col-md-3 vlt-col vlt-col-user\">\n                    ");
  hashContexts = {'size': depth0};
  hashTypes = {'size': "INTEGER"};
  options = {hash:{
    'size': (50)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "none", options) : helperMissing.call(depth0, "printUser", "none", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-2 vlt-col vlt-col-desc\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "date", options) : helperMissing.call(depth0, "printAgo", "date", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-3 vlt-col vlt-col-desc\">\n                    Modified <b>name</b>, <b>description</b>\n                </div>\n\n                <div class=\"col-md-4 vlt-col vlt-col-controls text-right\">\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-eye-open\"></span>\n                    </button>\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                    </button>\n                    <button class=\"btn btn-success\">\n                        <span class=\"glyphicon glyphicon-repeat\"></span>\n                        Revert\n                    </button>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n\n            <div class=\"vlt-row\">\n                <div class=\"col-md-3 vlt-col vlt-col-user\">\n                    ");
  hashContexts = {'size': depth0};
  hashTypes = {'size': "INTEGER"};
  options = {hash:{
    'size': (50)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printUser || depth0.printUser),stack1 ? stack1.call(depth0, "none", options) : helperMissing.call(depth0, "printUser", "none", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-2 vlt-col vlt-col-desc\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.printAgo || depth0.printAgo),stack1 ? stack1.call(depth0, "date", options) : helperMissing.call(depth0, "printAgo", "date", options))));
  data.buffer.push("\n                </div>\n\n                <div class=\"col-md-3 vlt-col vlt-col-desc\">\n                    Modified <b>name</b>, <b>description</b>\n                </div>\n\n                <div class=\"col-md-4 vlt-col vlt-col-controls text-right\">\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-eye-open\"></span>\n                    </button>\n                    <button class=\"btn btn-default\">\n                        <span class=\"glyphicon glyphicon-trash\"></span>\n                    </button>\n                    <button class=\"btn btn-success\">\n                        <span class=\"glyphicon glyphicon-repeat\"></span>\n                        Revert\n                    </button>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n</div>");
  return buffer;
  
});
