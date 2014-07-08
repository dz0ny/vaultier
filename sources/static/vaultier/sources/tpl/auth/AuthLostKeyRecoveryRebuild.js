Ember.TEMPLATES["Auth/AuthLostKeyRecoveryRebuild"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n            <div class=\"vlt-dialog-content\">\n                <div class=\"vlt-dialog-header\">\n                    <h2>Private key</h2>\n                </div>\n                <div class=\"vlt-dialog-body\">\n\n                    <div class=\"col-md-8 col-md-offset-2\">\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['change-key'] || (depth0 && depth0['change-key']),options={hash:{
    'action': ("save")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "change-key", options))));
  data.buffer.push("\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});