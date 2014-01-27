Ember.TEMPLATES["Member/MemberInvite"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n\r\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2\">\r\n            <form>\r\n                <div class=\"vlt-dialog-content\">\r\n                    <div class=\"vlt-dialog-header\">\r\n                        <h2>Invite collaborators</h2>\r\n                    </div>\r\n                    <div class=\"vlt-dialog-body\">\r\n\r\n                        <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                            <div class=\"form-group\">\r\n                                <label for=\"invite-form-invited\">Select users</label>\r\n\r\n                                ");
  hashContexts = {'store': depth0,'workspace': depth0,'auth': depth0,'class': depth0,'elementId': depth0,'valueBinding': depth0};
  hashTypes = {'store': "ID",'workspace': "ID",'auth': "ID",'class': "STRING",'elementId': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MemberInviteInput", {hash:{
    'store': ("store"),
    'workspace': ("workspace"),
    'auth': ("auth"),
    'class': ("form-control"),
    'elementId': ("invite-form-invited"),
    'valueBinding': ("invited")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                <span class=\"help-block\"><b>Select existing users or invite new by email</b>. You can invite more users at once. Seperate them with space, comma or semicolon</span>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <div class=\"checkbox\">\r\n                                    <label for=\"invite-form-resend\">\r\n                                        ");
  hashContexts = {'type': depth0,'elementId': depth0,'checkedBinding': depth0};
  hashTypes = {'type': "ID",'elementId': "STRING",'checkedBinding': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'elementId': ("invite-form-resend"),
    'checkedBinding': ("resend")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                        Resend invitation to already invited user\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"form-group\">\r\n                                <label for=\"invite-form-role\">Permissions</label>\r\n                                ");
  hashContexts = {'role': depth0,'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0};
  hashTypes = {'role': "ID",'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control"),
    'elementId': ("invite-form-role"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                    </div>\r\n                    <div class=\"vlt-dialog-footer\">\r\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                            Back\r\n                        </a>\r\n                        <button ");
  hashContexts = {'disabled': depth0};
  hashTypes = {'disabled': "ID"};
  options = {hash:{
    'disabled': ("isSubmitDisabled")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "invited", "role", "resend", {hash:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                                class=\"btn btn-primary\">\r\n                            <span class=\"glyphicon glyphicon-ok\"></span>\r\n                            Submit\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
