Ember.TEMPLATES["Error/ErrorGeneric"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            Go to homepage\n        ");
  }

  data.buffer.push("<div class=\"col-md-6 col-md-offset-3 top-150 bottom-150 alert alert-danger\">\n    <div class=\"text-center\">\n        <h4>");
  stack1 = helpers._triageMustache.call(depth0, "view.controller.content.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n        <br/>\n\n        <p>\n            ");
  stack1 = helpers._triageMustache.call(depth0, "view.controller.content.message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </p>\n    </div>\n\n    <div class=\"text-center\">\n        <br/>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        <a href=\"javascript:history.go(-1)\" class=\"btn btn-default\">Go back</a>\n    </div>\n</div>\n");
  return buffer;
  
});