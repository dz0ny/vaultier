Ember.TEMPLATES["Error/Error400"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n            Go to homepage\r\n        ");
  }

  data.buffer.push("<div class=\"col-md-4 col-md-offset-4 top-150 bottom-150 alert alert-danger\">\r\n    <div>\r\n        <h4>Oooups! 400 Bad request</h4>\r\n\r\n        <p>\r\n            Something wrong happen here\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"btn-group pull-right\">\r\n        <a href=\"javascript:history.go(-1)\" class=\"btn btn-default\">\r\n            Go back\r\n        </a>\r\n\r\n        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("btn btn-primary")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});
