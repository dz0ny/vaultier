Ember.TEMPLATES["Auth/AuthLostKeyRecoveryDisable"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Disable your workspaces</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"col-md-8 col-md-offset-2\">\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"text-center\">\n                            You are about to disable all your workspaces and your key.\n                            If you continue no one will access them, not even you.\n                            Please take a minute into consideration.\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "disable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Disable</a>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});