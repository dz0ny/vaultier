Vaultier.ChangeKeyComponent = Ember.Component.extend({
    layoutName: 'Settings/ChangeKey',

    keys: null,
    privateKeySaved: false,
    publicKeySaved: false,

    publicButtonDisabled: function () {
        return this.get('publicKeySaved') || !this.get('privateKeySaved');
    }.property('privateKeySaved', 'publicKeySaved'),

    didInsertElement: function () {
        if (!this.get('changekey')) {
            throw Error('service:changekey has to be injected into changekey component');
        }
        if (!this.get('keys')) {
            this.generate();
        }
    },

    generate: function () {
        var chk = this.get('changekey');
        chk.generateKeys(function (keys) {
            this.set('keys', keys);
        }.bind(this));
    },

    actions: {
        savePrivateKey: function () {
            // start download
            var raw = this.get('keys.privateKey');
            var blob = new Blob([raw], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");
            this.set('privateKeySaved', true);
        },

        savePublicKey: function () {
            this.set('publicKeySaved', true);
            var result = {};
            this.sendAction('action', this.get('keys'), result);
            if (result.promise) {
                result.promise
                    .catch(function (error) {
                        this.set('publicKeySaved', false);
                        throw error;
                    }.bind(this));
            }
        }
    }


});


Vaultier.SettingsRoute = Ember.Route.extend({

    beforeModel: function (transition) {
        // only authenticated user can access
        if (!this.get('auth').checkAuthenticatedOrLogin(transition)) {
            return false;
        }
    },

    deactivate: function () {
        this.get('auth.user').rollback()
    }

})

Vaultier.SettingsView = Ember.View.extend({

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var path = this.get('parentView.controller.controllers.application.currentPath');
            var route = path.split('.')[path.split('.').length - 1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    }),

    templateName: 'Settings/SettingsIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.SettingsController = Ember.Controller.extend({
    needs: ['application']
})

Vaultier.SettingsIndexRoute = Ember.Route.extend({

    beforeModel: function (transition) {
        transition.abort()
        this.transitionTo('Settings.personal');
    }
})


Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'))

                        // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addSettings()
                    .addText('Personal settings')
            );
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your changes has been successfully saved.', 'success');
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    })

                ApplicationLoader.promise(promise)
            }

        }
    });

Vaultier.SettingsPersonalController = Ember.ObjectController.extend({
    needs: ['Settings']
});

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});

Vaultier.SettingsKeysRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsKeys', {outlet: 'Settings'});
        },

        setupController: function (ctrl) {
            ctrl.set('stepInfo', true);
            ctrl.set('stepSuccess', false);
            ctrl.set('stepKeys', false);

            // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addSettings()
                    .addText('Regenerate private key')
            );
        },

        actions: {
            generate: function () {
                this.set('controller.stepInfo', false);
                this.set('controller.stepKeys', true);
            },

            savePrivateKey: function () {
                // start download
                var raw = this.get('controller.keys.privateKey');
                var blob = new Blob([raw], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "vaultier.key");
                this.set('privateKeySaved', true);
            },


            save: function (keys, result) {
                this.set('controller.keys', keys);

                var promise = this.get('changekey')
                    .changeKey(keys)
                    .then(function () {
                        this.set('controller.stepKeys', false);
                        this.set('controller.stepSuccess', true);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('There was an error during update of your key', 'error');
                        this.get('errors').consoleError(error)
                    }.bind(this))

                ApplicationLoader.promise(promise)

                result.promise = promise

            }
        }

    });

Vaultier.SettingsKeysController = Ember.Controller.extend({
    needs: ['Settings']
})


Vaultier.SettingsKeysView = Ember.View.extend({
    templateName: 'Settings/SettingsKeys'
});

Ember.TEMPLATES["Settings/ChangeKey"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n\n    <p>\n        Your public and private keypair has been generated.\n        Please follow steps to finish procedure\n    </p>\n\n\n    <div class=\"bottom-15 top-30\">\n        <h4>\n            <div class=\"label label-header\">1</div>\n            Save private key key to your computer\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your private key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Used instead of password. Please save the key.\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePrivateKey", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn view.privateKeySaved:btn-default:btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                    >\n                Save private key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"bottom-15  top-30\">\n        <h4>\n            <div class=\"label label-header\">2</div>\n            Send your public key to server\n        </h4>\n    </div>\n\n    <div class=\"top-15 padding-15 panel panel-default\">\n\n        <div class=\"col-md-5 col-md-offset-1\">\n            <b>\n                Your public key\n            </b>\n            <br/>\n                <span class=\"help-block\">\n                    Will be sent to server and cyphers is going to be rebuilt\n                </span>\n        </div>\n        <div class=\"col-md-4\">\n            <button\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("view.publicButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn view.privateKeySaved:btn-primary:btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePublicKey", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    class=\"btn btn-default\">\n                Submit public key\n            </button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n\n\n\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\" text-center top-30\">\n        <h4>Please wait while generating your keys...</h4>\n\n        <div class=\"vlt-preloader vlt-preloader-small\">\n        </div>\n    </div>\n");
  }

  stack1 = helpers['if'].call(depth0, "view.keys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["Settings/SettingsIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Settings.personal", options) : helperMissing.call(depth0, "link-to", "Settings.personal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                                My profile\n                            ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "Settings.keys", options) : helperMissing.call(depth0, "link-to", "Settings.keys", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\n                                Private key\n                            ");
  }

  data.buffer.push("<div class=\"container\">\n    <div class=\"vlt-page vlt-page-plain\">\n        <div class=\"row\">\n            <div class=\"top-50\">\n                <div class=\"col-md-3\">\n                    <ul class=\"nav nav-pills nav-stacked\">\n                        ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("personal")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                        ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("keys")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </ul>\n                </div>\n\n                <div class=\"col-md-9\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "Settings", options) : helperMissing.call(depth0, "outlet", "Settings", options))));
  data.buffer.push("\n                </div>\n            </div>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Settings/SettingsPersonal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-dialog\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>Personal settings</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2\">\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.email:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"register-form-email\" class=\"control-label\">Email *</label>\n\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                    <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.nickname:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label for=\"register-form-nickname\" class=\"control-label\">Your nickname *</label>\n\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        <span class=\"error\">\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                    </div>\n\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Save changes</a>\n            </div>\n\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Settings/SettingsKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"text-center\">\n                            If you want to generate new private key.\n                            Click the generate button and\n                            you will go throught generate process\n                            <br/>\n                            <br/>\n                            <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "generate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Generate new private key</a>\n                        </div>\n                    </div>\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['change-key'] || (depth0 && depth0['change-key']),options={hash:{
    'action': ("save")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "change-key", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <div class=\"top-30 bottom-30\">\n\n                        <div class=\" alert alert-success\">\n                            <b>\n                                Your private key has been successfully changed.\n                            </b>\n                        </div>\n\n                        <div class=\" bottom-30 text-center top-30\">\n                            <span class=\"help-block\">\n                                From now use new private key generated. Please be sure you have saved your private key.\n                            </span>\n\n                            <a class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "savePrivateKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">Save your new private key</a>\n                        </div>\n\n                        <div class=\"clearfix\"></div>\n                    </div>\n\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog\">\n    <div class=\"vlt-dialog-content\">\n        <div class=\"vlt-dialog-header\">\n            <h2>Private key</h2>\n        </div>\n        <div class=\"vlt-dialog-body\">\n\n            <div class=\"col-md-8 col-md-offset-2\">\n                ");
  stack1 = helpers['if'].call(depth0, "stepInfo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "stepKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "stepSuccess", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});

//# sourceMappingURL=settings.js.map