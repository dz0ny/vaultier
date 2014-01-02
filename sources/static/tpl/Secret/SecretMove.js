Ember.TEMPLATES["Secret/SecretMove"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        <div class=\"vlt-dialog vlt-dialog-window\">\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Move secret to another card</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <h4>Please select target card</h4>\n                        <div class=\"vlt-tree\">\n                            ");
  hashContexts = {'content': depth0};
  hashTypes = {'content': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Tree", {hash:{
    'content': ("treeNodes")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        </div>\n                        <div class=\"help-block\">\n                            Also all granted permissions will be moved.\n                        </div>\n                        <div class=\"clearfix\"></div>\n                   </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("moveDisabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Move\n                        </button>\n                    </div>\n\n                </div>\n        </div>\n    </div>\n</div>\n\n");
  return buffer;
  
});
