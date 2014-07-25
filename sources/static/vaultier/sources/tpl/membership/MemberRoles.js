Ember.TEMPLATES["Member/MemberRoles"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                                     Card\n                                 ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                     ");
  stack1 = helpers['if'].call(depth0, "role.to_vault", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                 ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                                         Vault\n                                     ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                         ");
  stack1 = helpers['if'].call(depth0, "role.to_workspace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                     ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("\n                                             Workspace\n                                         ");
  }

  data.buffer.push("<div class=\"list-group-item\">\n    <div class=\"col-md-3\">\n                             <span data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"type\">\n                                 ");
  stack1 = helpers['if'].call(depth0, "role.to_card", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                             </span>\n    </div>\n    <div class=\"col-md-3\">\n        <span data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"name\">object name</span>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"col-md-8 vlt-edit-perms\">\n\n            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.Select", {hash:{
    'role': ("role"),
    'selection': ("role.level"),
    'class': ("form-control vlt-perms"),
    'contentBinding': ("roleLevels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.text")
  },hashTypes:{'role': "ID",'selection': "ID",'class': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'role': depth0,'selection': depth0,'class': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        </div>\n        <div class=\"col-md-4\">\n            <a class=\"vlt-delete btn btn-default btn-sm\">\n                <span class=\"glyphicon glyphicon-trash\"></span>\n            </a>\n        </div>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>");
  return buffer;
  
});