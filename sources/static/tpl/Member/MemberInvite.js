Ember.TEMPLATES["Member/MemberInvite"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"vlt-dialog vlt-tabs-modal\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>Invite collaborators</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n\r\n                        <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                            <div class=\"form-group\">\r\n                                <label for=\"card-name\">Select users</label>\r\n                                <input type=\"text\" id=\"card-name\" class=\"form-control\"/>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <label for=\"card-description\">Description</label>\r\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errors.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n                                ");
  hashContexts = {'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0};
  hashTypes = {'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("invite-form-role"),
    'contentBinding': ("roles"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("role")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            Back\r\n                        </a>\r\n                        <button ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("isButtonNextEnabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "invited", "role", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                            Create new card\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
