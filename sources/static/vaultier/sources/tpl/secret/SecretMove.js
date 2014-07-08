Ember.TEMPLATES["Secret/SecretMove"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n    <div class=\"col-md-12\">\n\n        <div class=\"vlt-dialog vlt-dialog-window\">\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Move secret to another card</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <h4>Please select target card</h4>\n                        <div class=\"vlt-tree\">\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Tree", {hash:{
    'content': ("treeNodes")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        </div>\n                        <div class=\"help-block\">\n                            Also all granted permissions will be moved.\n                        </div>\n                        <div class=\"clearfix\"></div>\n                   </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("moveDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Move\n                        </button>\n                    </div>\n\n                </div>\n        </div>\n    </div>\n</div>\n\n");
  return buffer;
  
});