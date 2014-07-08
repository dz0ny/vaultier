Ember.TEMPLATES["Member/MemberInvite"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"vlt-page vlt-page-plain\">\r\n<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Invite collaborators</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"invite-form-invited\">Select users</label>\r\n\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Vaultier.MemberInviteInput", {hash:{
    'store': ("store"),
    'workspace': ("workspace"),
    'auth': ("auth"),
    'class': ("form-control"),
    'elementId': ("invite-form-invited"),
    'valueBinding': ("invited")
  },hashTypes:{'store': "ID",'workspace': "ID",'auth': "ID",'class': "STRING",'elementId': "STRING",'valueBinding': "STRING"},hashContexts:{'store': depth0,'workspace': depth0,'auth': depth0,'class': depth0,'elementId': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"help-block\"><b>Select existing users or invite new by email</b>. You can invite more users at once. Seperate them with space, comma or semicolon</span>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"checkbox\">\r\n                            <label for=\"invite-form-resend\">\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'elementId': ("invite-form-resend"),
    'checkedBinding': ("resend")
  },hashTypes:{'type': "ID",'elementId': "STRING",'checkedBinding': "STRING"},hashContexts:{'type': depth0,'elementId': depth0,'checkedBinding': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                Resend invitation to already invited user\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label for=\"invite-form-role\">Permissions</label>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'class': ("form-control"),
    'elementId': ("invite-form-role"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\r\n                    <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                    Back\r\n                </a>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isSubmitDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "invited", "role", "resend", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],data:data})));
  data.buffer.push("\r\n                        class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon-ok\"></span>\r\n                    Submit\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n</div>\r\n");
  return buffer;
  
});