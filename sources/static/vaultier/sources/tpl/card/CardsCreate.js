Ember.TEMPLATES["Card/CardsCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n            <form>\n                <div class=\"vlt-dialog-content\">\n                    <div class=\"vlt-dialog-header\">\n                        <h2>Create new card</h2>\n                    </div>\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"row\">\n\n                            <div class=\"col-md-7\">\n\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.name:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    <label for=\"card-name\">Name</label>\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'elementId': ("card-name"),
    'valueBinding': ("content.name"),
    'class': ("form-control")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                    <span class=\"error\">\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </span>\n                                </div>\n\n                                <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.description:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                                    <label for=\"card-description\">Description</label>\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'elementId': ("card-description"),
    'valueBinding': ("content.description"),
    'class': ("form-control"),
    'rows': (5)
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'rows': "INTEGER"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                                    <span class=\"error\">\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </span>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-5 bottom-15\">\n\n                                <div class=\"callout callout-info\">\n                                    <h4>Card will be shared with:</h4>\n\n                                     ");
  data.buffer.push(escapeExpression((helper = helpers['member-box'] || (depth0 && depth0['member-box']),options={hash:{
    'roles': ("memberships"),
    'user': ("auth.user")
  },hashTypes:{'roles': "ID",'user': "ID"},hashContexts:{'roles': depth0,'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "member-box", options))));
  data.buffer.push("\n                                </div>\n                            </div>\n\n\n                            <div class=\"clearfix\"></div>\n                        </div>\n\n\n                    </div>\n                    <div class=\"vlt-dialog-footer\">\n                        <a href=\"javascript:window.history.go(-1)\" class=\"btn btn-default btn-sm\">\n                            <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                            Back\n                        </a>\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                            Create new card\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>");
  return buffer;
  
});