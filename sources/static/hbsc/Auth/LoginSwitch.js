Ember.TEMPLATES["Auth/LoginSwitch"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"row\">\r\n\r\n    <div class=\"col-md-7\">\r\n\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n            <div class=\"form-group ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("error:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\r\n                <label for=\"login-form-email\" class=\"col-lg-4 control-label\">Email</label>\r\n\r\n                <div class=\"col-lg-8\">\r\n                    ");
  hashContexts = {'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("login-form-email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("error:has-error")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n                <label for=\"login-form-key\" class=\"col-lg-4 control-label\">Key</label>\r\n\r\n                <div class=\"col-lg-8\">\r\n                    <div class=\"input-group\">\r\n                        <input ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("filename")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("\r\n                                type=\"text\"\r\n                                class=\"form-control\"\r\n                                readonly=\"\"\r\n                                placeholder=\"Select your key\">\r\n\r\n                        <span class=\"vlt-login-key input-group-btn btn btn-default btn-file\">\r\n                            Browse <input type=\"file\">\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <br/>\r\n\r\n            <div class=\"form-group\">\r\n                <label for=\"login-form-remember\"\r\n                       class=\"col-lg-4 control-label\">Remember</label>\r\n\r\n                <div class=\"col-lg-8\">\r\n                    ");
  hashContexts = {'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0};
  hashTypes = {'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("login-form-remember"),
    'contentBinding': ("props.rememberOptions"),
    'optionValuePath': ("content.ttl"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("ttl")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n                    <span class=\"help-block\">\r\n                        Your credentials will be stored for selected period of time.\r\n                        Remebering crednentials is not so secure by it easy your login\r\n                    </span>\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </form>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-md-5\">\r\n\r\n        <div class=\"callout callout-info\">\r\n            <h4>How our security works</h4>\r\n\r\n            <p>\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam eu\r\n                nisl accumsan condimentum. Duis rhoncus enim a urna aliquet fringilla.\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n");
  return buffer;
  
});
