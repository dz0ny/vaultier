Ember.TEMPLATES["Error/Error404"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                Go to homepage\r\n            ");
  }

  data.buffer.push("<div class=\"col-md-6 col-md-offset-3 top-150 bottom-150 alert alert-danger\">\r\n        <div>\r\n            <h4>Oooups! 404 Page not found</h4>\r\n\r\n            <p>\r\n                Page you are trying to access does not exists on our server\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"btn-group pull-right\">\r\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n</div>");
  return buffer;
  
});