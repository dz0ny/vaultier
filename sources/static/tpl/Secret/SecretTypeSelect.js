Ember.TEMPLATES["Secret/SecretTypeSelect"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon password\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret password</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    This type of secret allows yout to save ordinary password\r\n                    together with username, url and related note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon note\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret note</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    Secret as note, you can save whatever text you want.\r\n                    You can use markdown to format note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"list-item vlt-select-secret-item\">\r\n            <div class=\"vlt-visual\">\r\n                <div class=\"vlt-icon file\"></div>\r\n            </div>\r\n            <div class=\"vlt-desc\">\r\n                <h4>Secret file</h4>\r\n\r\n                <p class=\"help-block\">\r\n                    Store file up to 25KB filesize, you can also anotate file with username,\r\n                    password and note\r\n                </p>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n        </div>\r\n    ");
  }

  data.buffer.push("<div class=\"vlt-create-secret col-md-10 col-md-offset-1\">\r\n\r\n    <h4>Please select type of secret you would like to create</h4>\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.createSubmit", "password", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "password", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.createSubmit", "note", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "note", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Secret.createSubmit", "file", options) : helperMissing.call(depth0, "link-to", "Secret.createSubmit", "file", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n");
  return buffer;
  
});
