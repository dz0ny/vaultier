Vaultier.AuthLoginController = Ember.Controller.extend({
    latestUser: null,
    rememberOptions: [
        {ttl: 0, text: 'Do not remember'},
        {ttl: 24 * 3600 * 1000, text: 'Remember for one day'},
        {ttl: 7 * 24 * 3600 * 1000, text: 'Remember for one week'},
        {ttl: 31 * 24 * 3600 * 1000, text: 'Remember for one month'},
        {ttl: 365 * 24 * 3600 * 1000, text: 'Remember for one year'}
    ]
});

Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/AuthLogin',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-login-key');
        var controller = this.controller;

        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsText(files[0], function (evt) {
                if (evt.type == 'load') {
                    // Success
                    controller.set('privateKey', evt.result);
                    controller.set('filename', files[0].name);
                }
            })
        })
    }
});

Vaultier.AuthLoginRoute = Ember.Route.extend({
    setupController: function (ctrl) {
        //   testing
        if (this.get('config.FT_FEATURES.dev_shared_key') ) {
            var auth = this.get('auth');
            var keys = auth.generateKeys();
            var pkey = keys.privateKey
            ctrl.set('email', this.get('config.FT_FEATURES.dev_email'));
            ctrl.set('privateKey', pkey)
        }

        // remembering
        this.loadRemebered();
    },

    loadRemebered: function () {
        var auth = this.get('auth');
        var user = auth.getRememberedUser();
        var ctrl = this.get('controller');
        if (user) {
            ctrl.set('latestUser', true)
            ctrl.set('email', user.email);
            ctrl.set('privateKey', user.privateKey);
            ctrl.set('ttl', user.ttl);
        } else {
            ctrl.set('latestUser', false)
        }
    },

    actions: {
        switchUser: function () {
            var auth = this.get('auth');
            auth.rememberUser(null);
            this.loadRemebered();
        },

        loginUser: function () {
            ApplicationLoader.showLoader();

            var ctrl = this.get('controller');
            var email = ctrl.get('email');
            var ttl = ctrl.get('ttl');
            var privateKey = ctrl.get('privateKey');

            var auth = this.get('auth');
            var promise = auth
                .login(email, privateKey, true)
                .then(function (user) {
                    auth.rememberUser(email, privateKey, ttl)
                    $.notify('You have been successfully logged in.', 'success');
                }.bind(this))
                .catch(function () {
                    auth.rememberUser(null)
                    this.loadRemebered();
                    ApplicationLoader.hideLoader()
                    $.notify('We are sorry, but your login failed', 'error');
                }.bind(this)
                );

        }

    }
});



'use strict';


Vaultier.LostKey = RL.Model.extend(
    Vaultier.CreatedUpdatedMixin,
    {
        email: RL.attr('string'),
        recover_type: RL.attr('integer'),
        hash: RL.attr('string'),
        public_key: RL.attr('key'),
        memberships: RL.hasMany('Vaultier.LostKeyMemberships'),
        recoverType: new Utils.ConstantList({
            'REBUILD': {
                value: 1,
                text: 'REBUILD'
            },
            'DISABLE': {
                value: 2,
                text: 'DISABLE'
            }
        })
    });

Vaultier.LostKeyMemberships = RL.Model.extend({
    workspace_name: RL.attr('string'),
    is_recoverable: RL.attr('boolean')
});


'use strict';

Vaultier.AuthLostKeyIndexRoute = Ember.Route.extend({

    /**
     * Creates a new LostKey model instance, must be done by hand
     * because of the different name
     */
    model: function () {
        return this.get('store').createRecord('LostKey');
    },

    beforeModel: function(model, transition) {
        var ctrl = this.controllerFor('AuthLostKeyIndex');
        ctrl.set('emailWasSuccessfullySend', false);
    },

    actions: {
        sendRecoveryKeyRequest: function () {
            var ctrl = this.get('controller');
            var record = ctrl.get('content');

            var promise = record.saveRecord()
                .then(function (response) {
                    ctrl.set('emailWasSuccessfullySend', true);
                }.bind(this)
            ).catch(function (error) {
                    ctrl.set('error', true);
                    ctrl.set('emailSuccess', false);
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthLostKeyIndexController = Ember.Controller.extend({
    email: null,
    emailSuccess: false,
    error: false,
    emailWasSuccessfullySend: false
});

Vaultier.AuthLostKeyIndexView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyIndex',
    layoutName: 'Layout/LayoutStandard'
});
Vaultier.AuthLostKeySuccessView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeySuccess',
    layoutName: 'Layout/LayoutStandard'
});


/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////

var RegisterProps = Ember.Object.extend({
    nextButtonTitle: false,
    nextButtonDisable: false,
    keysReady: false,
    keys: null,
    loginButtonHidden: false,
    /**
     * Stores transition created by newuserinit service to redirect to proper page after success registration
     */
    transitionAfterRegister: false,
    /**
     * Stores default workspace if created by newuserinitservice
     */
    defaultWorkspace: false,
    /**
     * Stores default vault if created by newuserinitservice
     */
    defaultVault: false

});

RegisterProps.reopenClass(Utils.Singleton);

var BaseRegisterController = Ember.Controller.extend({
    props: RegisterProps.current()
});

Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/AuthRegister',
    layoutName: 'Layout/LayoutStandard',

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var path = this.get('parentView.controller.controllers.application.currentPath');
            var route = path.split('.')[path.split('.').length - 1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    })
});

Vaultier.AuthRegisterController = BaseRegisterController.extend({
    needs: ['application']
});

Vaultier.AuthRegisterRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        } else {
            transition.router.replaceWith('AuthRegister.before');
        }
    },

    model: function () {
        var auth = this.get('auth');
        if (auth.get('isAuthenticated')) {
            return auth.get('user');
        } else {
            return this.get('store').createRecord('User');
        }
    },

    deactivate: function () {
        var user = this.modelFor(user);
        if (user) {
            this.get('store').unloadRecord(user);
        }
    }

});

Vaultier.AuthRegisterIndexRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        } else {
            transition.router.replaceWith('AuthRegister.before');
        }
    }
});


/////////////////////////////////////////////////////////////////
//// STEP1 - Before
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterBeforeRoute = Ember.Route.extend({
    step: 'AuthRegisterBefore',

    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        }
    },

    setupController: function (ctrl) {
        ctrl.set('props.loginButtonHidden', false);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', null)
    },

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    actions: {
        next: function () {
            this.transitionTo('AuthRegister.keys');
        }
    }
});

Vaultier.AuthRegisterBeforeView = Ember.View.extend({
    templateName: 'Auth/AuthRegisterBefore'
});

Vaultier.AuthRegisterBeforeController = BaseRegisterController.extend();

/////////////////////////////////////////////////////////////////
//// STEP2 - keys
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterKeysController = BaseRegisterController.extend();

Vaultier.AuthRegisterKeysRoute = Ember.Route.extend({
    step: 'AuthRegisterKeys',

    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        }
    },

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    actions: {
        next: function () {
            this.transitionTo('AuthRegister.creds');
        },

        downloadKey: function () {

            var ctrl = this.get('controller');

            // start download
            var blob = new Blob([ctrl.get('props.keys.privateKey')], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");

            //enable next button
            ctrl.set('props.nextButtonDisabled', false);
        }
    },

    setupController: function (ctrl) {
        ctrl.set('props.loginButtonHidden', true);
        ctrl.set('props.nextButtonTitle', null)

        if (!ctrl.get('props.keysReady')) {
            ctrl.set('props.nextButtonDisabled', true);
            var auth = this.get('auth');
            auth.generateKeys(function (keys) {
                ctrl.set('props.keys', keys);
                ctrl.set('props.keysReady', true);
            }.bind(this));
        }
    }

});

Vaultier.AuthRegisterKeysView = Ember.View.extend({
    templateName: 'Auth/AuthRegisterKeys'
});

/////////////////////////////////////////////////////////////////
//// STEP3 - Creds
/////////////////////////////////////////////////////////////////


Vaultier.AuthRegisterCredsRoute = Ember.Route.extend({
    step: 'AuthRegisterCreds',

    /**
     * Reference to service newuserinit which is used to initialize user environment
     * after successfull registration
     * @DI service:newuserinit
     */
    newuserinit: null,

    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        }
    },

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    setupController: function (ctrl) {
        this._super.apply(this, arguments);

        ctrl.set('props.loginButtonHidden', true);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', 'Submit your credentials');

        // prepare user model
        var user = this.modelFor('AuthRegister');

        // testing
//        var u = 'jan' + Math.round(Math.random() * 100000) + '@rclick.cz';
//        user.setProperties({
//            email: u,
//            nickname: u
//        });

        ctrl.set('content', user);

        // check if keys, otherwise go to step 1
        if (!ctrl.get('props.keysReady')) {
            this.transitionTo('AuthRegister');
        }
    },

    actions: {
        next: function () {

            // prepare data
            var auth = this.get('auth');
            var ctrl = this.get('controller');
            var user = ctrl.get('content');
            var keys = ctrl.get('props.keys');

            // update model
            user.set('public_key', keys.publicKey);

            // preapre controller
            ctrl.set('props.nextButtonDisabled', true);

            // register promise
            var promise = user

                // save record
                .saveRecord()

                // login
                .then(function (response) {
                    console.log(response);
                    return auth.login(user.get('email'), keys.privateKey, false)
                        .then(function () {
                            auth.rememberUser(null);
                            this.transitionTo('AuthRegister.sum');
                        }.bind(this));
                }.bind(this))

                // unsuccessfull login
                .catch(function (errors) {
                    console.log(errors);
                    ctrl.set('errors', Ember.Object.create(errors.errors));
                    ctrl.set('props.nextButtonDisabled', false);
                    $.notify('We are sorry, but your account cannot be created', 'error');
                    return Ember.RSVP.reject(errors);
                }.bind(this))

                // create default user environment
                .then(function () {
                    return this.get('newuserinit').initializeUser();
                }.bind(this))

                // save transition and created workspace and vault
                .then(function (newuservalues) {
                    ctrl.get('props').setProperties(newuservalues);
                }.bind(this));

            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthRegisterCredsController = BaseRegisterController.extend({
    init: function () {
        this._super(arguments);
        this.set('props.nextButtonTitle', 'Create your account');
    }

});

Vaultier.AuthRegisterCredsView = Ember.View.extend({
    templateName: 'Auth/AuthRegisterCreds'
});

/////////////////////////////////////////////////////////////////
//// STEP4 - Sum
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterSumRoute = Ember.Route.extend({
    step: 'AuthRegisterSum',

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'});
    },

    setupController: function (ctrl) {
        // prepare user model
        var user = this.modelFor('AuthRegister')
        ctrl.set('content', user);

        ctrl.set('props.loginButtonHidden', true);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', 'Start using vaultier');
    },

    actions: {

        downloadKey: function () {
            // start download
            var blob = new Blob([this.get('auth.privateKey')], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");
        },

        next: function () {
            // get transition function created by newuserinit service this function is used to transition to proper page after registration
            // in case user refreshes the page transition is not available anymore, in that case user is redirected to index
            var transition = this.get('controller.props.transitionAfterRegister');
            if (transition) {
                transition();
            } else {
                this.transitionTo('index');
            }
        }
    }
});


Vaultier.AuthRegisterSumController = BaseRegisterController.extend({
    auth: null
});


Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/AuthRegisterSum'
});


'use strict';

Vaultier.AuthLostKeyRecoveryRoute = Ember.Route.extend({

    model: function (params, transition) {
        var lostkey = this.get('store')
            .find('LostKey', {id: params.id, hash: params.hash})
            .then(function(response){
                response.set('hash', params.hash);
                return response;
            });

        return lostkey;
    },

    afterModel: function (model, transition) {
        this.transitionTo('AuthLostKeyRecovery.reset');
    }
});


'use strict';


Vaultier.AuthLostKeyRecoveryResetRoute = Ember.Route.extend({
    actions: {

        rebuildKey: function () {
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure?', function () {
                this.transitionTo('AuthLostKeyRecovery.rebuild');
            }.bind(this));
        },
        disableKey: function () {
            var model = this.modelFor('AuthLostKeyRecoveryReset');
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure that you want to continue?', function () {

                model.set('public_key', '-'); // This can't be an empty string
                model.set('recover_type', Vaultier.LostKey.proto().recoverType['DISABLE'].value);

                var promise = model.saveRecord()
                    .then(function (response) {
                        this.transitionTo('AuthLostKeyRecovery.disable');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('How embarrassing! There was an error, please try again later', 'error');
                        this.get('errors').consoleError(error);
                    }.bind(this));
                ApplicationLoader.promise(promise);
            }.bind(this));
        }

    }

})
;

Vaultier.AuthLostKeyRecoveryResetController = Ember.Controller.extend({
        needs: ['application'],
        memberships: [],
        created_by: null,
        public_key: null
    }
);

Vaultier.AuthLostKeyRecoveryResetView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryReset',
    layoutName: 'Layout/LayoutStandard'
});



'use strict';

Vaultier.AuthLostKeyRecoveryRebuildRoute = Ember.Route.extend({

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
            var content = this.modelFor('AuthLostKeyRecoveryRebuild');
            content.set('public_key', keys.publicKey);
            content.set('recover_type', Vaultier.LostKey.proto().recoverType['REBUILD'].value);

            var promise = content.saveRecord()
                .then(function (response) {
                    this.set('controller.stepKeys', false);
                    this.get('auth').login(response.created_by.email, keys.privateKey, true);
                     $.notify('You have successfully rebuild your new private key', 'success');
                }.bind(this))
                .catch(function (error) {
                    $.notify('There was an error during update of your key, please try again later', 'error');
                    this.get('errors').consoleError(error);
                }.bind(this));
            ApplicationLoader.promise(promise);
            result.promise = promise;
        }
    }
});

Vaultier.AuthLostKeyRecoveryRebuildController = Ember.Controller.extend({
    needs: ['AuthLostKeyRecovery'],
    stepInfo: true,
    stepKeys: false,
    keys: null
});

Vaultier.AuthLostKeyRecoveryRebuildView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryRebuild',
    layoutName: 'Layout/LayoutStandard'
});


'use strict';

Vaultier.AuthLostKeyRecoveryDisableRoute = Ember.Route.extend({

    actions: {
        disable: function () {

            var content = this.modelFor('AuthLostKeyRecoveryDisable');
            content.set('public_key', '-'); // This can't be an empty string
            content.set('recover_type', Vaultier.LostKey.proto().recoverType['DISABLE'].value);

            var promise = content.saveRecord()
                .then(function (response) {
                    this.transitionTo('AuthRegister');
                }.bind(this))
                .catch(function (error) {
                    $.notify('How embarrassing! There was an error during update of your key, please try again later', 'error');
                    this.get('errors').consoleError(error);
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthLostKeyRecoveryDisableController = Ember.Controller.extend({
    needs: ['AuthLostKeyRecovery']
});

Vaultier.AuthLostKeyRecoveryDisableView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryDisable',
    layoutName: 'Layout/LayoutStandard'
});

Ember.TEMPLATES["Auth/AuthLogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("email")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                                                disabled type=\"email\"\r\n                                                class=\"form-control\"\r\n                                                id=\"login-form-email\"\r\n                                                placeholder=\"Email\">\r\n                                                  <span class=\"input-group-btn\">\r\n                                                    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "switchUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"vlt-login-switch btn btn-default\">Switch\r\n                                                        user</a>\r\n                                                  </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("login-form-email"),
    'valueBinding': ("email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <input disabled\r\n                                           class=\"form-control\"\r\n                                           value=\"Using remebered key\"\r\n                                           id=\"login-form-key\"\r\n                                           placeholder=\"Key\">\r\n                                ");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <div class=\"input-group\">\r\n                                        <input ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'value': ("filename")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                                                type=\"text\"\r\n                                                class=\"form-control\"\r\n                                                readonly=\"\"\r\n                                                placeholder=\"Select your key\">\r\n\r\n                                            <span class=\"vlt-login-key input-group-btn btn btn-default btn-file\">\r\n                                                Browse <input type=\"file\">\r\n                                            </span>\r\n                                    </div>\r\n                                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Click\r\n                                        here.");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                            Create new account");
  }

  data.buffer.push("<div class=\"vlt-dialog  vlt-login col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>Login</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-md-5 bottom-15 pull-right\">\r\n\r\n                        <div class=\"callout callout-info\">\r\n                            <h4>How our security works</h4>\r\n\r\n                            <p>\r\n                                Vaultier uses encryption algorithms to keep your data safe.\r\n                                Because of strong security you log into the Vaultier with you email\r\n                                and private key instead of password.\r\n                                <br/>\r\n\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-7\">\r\n\r\n                        <div class=\"form-group ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\">\r\n                            <label for=\"login-form-email\" class=\"col-lg-4 control-label\">Email</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                            <label for=\"login-form-key\" class=\"col-lg-4 control-label\">Key</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "latestUser", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                <small>\r\n                                    <span class=\"text-muted\">Did you lost your key?</span>\r\n                                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn-link")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLostKey", options) : helperMissing.call(depth0, "link-to", "AuthLostKey", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </small>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <br/>\r\n\r\n                        <div class=\"form-group\">\r\n                            <label for=\"login-form-remember\"\r\n                                   class=\"col-lg-4 control-label\">Remember</label>\r\n\r\n                            <div class=\"col-lg-8\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'class': ("form-control"),
    'elementId': ("login-form-remember"),
    'contentBinding': ("rememberOptions"),
    'optionValuePath': ("content.ttl"),
    'optionLabelPath': ("content.text"),
    'valueBinding': ("ttl")
  },hashTypes:{'class': "STRING",'elementId': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING",'valueBinding': "STRING"},hashContexts:{'class': depth0,'elementId': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'valueBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n\r\n                                <p>\r\n                                    <small class=\"text-muted\">\r\n                                        Your credentials will be stored for selected period of time.\r\n                                        Remebering crednentials is not secure because key is being stored in your\r\n                                        browser.\r\n                                    </small>\r\n                                </p>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"vlt-dialog-footer\">\r\n\r\n                <div class=\"pull-right vlt-right-buttons\">\r\n                    <button type=\"submit\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginUser", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                        Login\r\n                    </button>\r\n                </div>\r\n\r\n                <div class=\"vlt-right-buttons text-left\">\r\n                    <div>\r\n                        Do not have account yet?\r\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegister"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Before you register\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Generate your keys\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Your credentials\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                    <a>\r\n                        Finish registration\r\n                        <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    </a>\r\n                ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                        Next\r\n                    ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        Do you have account already?\r\n                        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                            Login to your account here\r\n                        ");
  }

  data.buffer.push("<div class=\"vlt-dialog vlt-register col-xs-12 col-md-10 col-md-offset-1 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <div class=\"vlt-dialog-header\">\r\n            <h2>Register to Vaultier</h2>\r\n\r\n            <ul class=\"nav nav-pills nav-justified vlt-wizard-steps\">\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("before")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("keys")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("creds")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers.view.call(depth0, "view.TabView", {hash:{
    'tab': ("sum")
  },hashTypes:{'tab': "STRING"},hashContexts:{'tab': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-body\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "outlet", "AuthRegister", options))));
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"vlt-dialog-footer\">\r\n\r\n            <div class=\"pull-right vlt-right-buttons\">\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("props.nextButtonDisabled")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">\r\n                    <span class=\"glyphicon glyphicon glyphicon-chevron-right\"></span>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "props.nextButtonTitle", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </button>\r\n            </div>\r\n\r\n            <div class=\"vlt-left-buttons pull-left\">\r\n                    ");
  stack1 = helpers.unless.call(depth0, "props.loginButtonHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterBefore"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\r\n\r\n    <div class=\"col-md-5 col-md-offset-1\">\r\n        <h4>How our security works</h4>\r\n\r\n        <p>\r\n            Vaultier uses encryption algorithms to keep your data safe.\r\n            <br/>\r\n            <br/>\r\n            All secrets submited to vaultier are encrypted by your private key\r\n            and can be red only by you and your team.\r\n            <br/>\r\n            <br/>\r\n            Because of strong security you log into the Vaultier with you email\r\n            and private key instead of password.\r\n            <br/>\r\n            <br/>\r\n            <a href=\"http://en.wikipedia.org/wiki/RSA_(algorithm)\" target=\"_blank\">\r\n                Read more on topic on wikipedia\r\n            </a>\r\n\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"col-md-5\">\r\n        <h4>Steps of registration</h4>\r\n\r\n        <p>\r\n            Registration wizard will guide you throught follwoing step to became regular user of Vaultier\r\n\r\n        <ol>\r\n            <li>Generate keys - your private and public key will be generated</li>\r\n            <li>Submit credentials - You will be asked about your credentials - email, nickname ...</li>\r\n            <li>Summary of registration - final information before use</li>\r\n        </ol>\r\n\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n");
  
});

Ember.TEMPLATES["Auth/AuthRegisterKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-8 col-md-offset-2\">\r\n                <h4>We have generated your private and public key pair. </h4>\r\n\r\n                <p>\r\n                    Public key will be uploaded to Vaultier.\r\n                    But private key is only for you and will be used to log into the Vaultier and to encrypt your\r\n                    secrets.\r\n                </p>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1\">\r\n                    <p\r\n                            class=\"text-danger text-center\"\r\n                            data-toggle=\"tooltip\"\r\n                            title=\"\r\n                            Private key is used instead of password to log into Vaultier.\r\n                            Please keep private key safe and do not give it to anybody.\r\n                            Without private key you will not be able to log into Vaultier\r\n                            and your data will be rendered unreadable.\r\n                            \">\r\n\r\n                        <b>\r\n                            <span class=\"glyphicon glyphicon-exclamation-sign btn-lg\"></span>\r\n                            <br/>\r\n                            Save private key to local computer and keep it carefully. Do not loose the key\r\n                        </b>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row top-15\">\r\n                <div class=\"col-md-10 col-md-offset-1 text-center\">\r\n                    <a class=\"btn btn-primary btn-lg\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\r\n                         <span class=\"glyphicon glyphicon-save\"></span>\r\n                        Save the key\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"clearfix\"></div>\r\n\r\n    </div>\r\n\r\n\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n    <div class=\"generate\">\r\n        <h3>Please wait while generating your keys</h3>\r\n\r\n        <div class=\"vlt-preloader vlt-preloader-small\">\r\n        </div>\r\n    </div>\r\n");
  }

  data.buffer.push("<div class=\"vlt-register-keys\">\r\n");
  stack1 = helpers['if'].call(depth0, "props.keysReady", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterCreds"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-creds\">\r\n\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n        <div>\r\n            <h4>Please submit yout credentials</h4>\r\n\r\n            <p>\r\n                Please provide us with your credentials. Email will be used for login and delivering notifications to you.\r\n                By nickname you will be recognized by other users of Vaultier\r\n            </p>\r\n        </div>\r\n\r\n        <div class=\"bottom-30\">\r\n            <form class=\"form-horizontal\" role=\"form\">\r\n\r\n                <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.email:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                    <label for=\"register-form-email\" class=\"control-label\">Email *</label>\r\n\r\n                    <div>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Please enter valid email address")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("content.errors.nickname:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                    <label for=\"register-form-nickname\" class=\"control-label\">Your nickname *</label>\r\n\r\n                    <div>\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'elementId': ("register-form-nickname"),
    'valueBinding': ("content.nickname"),
    'class': ("form-control"),
    'placeholder': ("Please enter your nickname")
  },hashTypes:{'elementId': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'elementId': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        <span class=\"error\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n\r\n                <br/>\r\n\r\n            </form>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div class=\"col-md-12 center text-center\">\r\n                            <h2 class=\"text-success\">Your request was successfully send</h2>\r\n\r\n                            <p>\r\n                                We have send you an email with the instructions to recover your\r\n                                private key.\r\n                            </p>\r\n\r\n                            <p>\r\n                                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </p>\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                                    Return to login\r\n                                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div class=\"col-md-12 bottom-15\">\r\n\r\n                            <div class=\"callout callout-info\">\r\n                                <p>\r\n                                    You have forgotten your key, we are ready to renew your access key. Please enter\r\n                                    your email below and we will send email to you with further instructions.\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-8\">\r\n\r\n                            <div class=\"form-group\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("error:has-error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("emailSuccess:has-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <label for=\"login-form-email\" class=\"col-lg-4 control-label pull-left\">Email</label>\r\n\r\n                                <div class=\"col-lg-8\">\r\n                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("email"),
    'valueBinding': ("content.email"),
    'class': ("form-control"),
    'placeholder': ("Enter your email"),
    'require': ("true")
  },hashTypes:{'id': "STRING",'valueBinding': "STRING",'class': "STRING",'placeholder': "STRING",'require': "STRING"},hashContexts:{'id': depth0,'valueBinding': depth0,'class': depth0,'placeholder': depth0,'require': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                    <span class=\"error\">\r\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "content.errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\r\n    <div class=\"vlt-dialog-content\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n\r\n            <div class=\"vlt-dialog-header text-center\">\r\n                <h4>Retrieve your lost key</h4>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n                <div class=\"row\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "emailWasSuccessfullySend", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n\r\n                <div class=\"pull-right vlt-right-buttons\">\r\n                    <button type=\"submit\"\r\n                        ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendRecoveryKeyRequest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("emailWasSuccessfullySend")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\r\n                            class=\"btn btn-primary\">\r\n                        Send\r\n                    </button>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeySuccess"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    Return to login\n                ");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-6 col-md-offset-3 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Your request was successfully accepted.</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row\">\n                        <div class=\"col-md-12 text-center bottom-15\">\n                            <p>\n                                We have sent you an email with the instructions to recover your\n                                private key.\n                            </p>\n                        </div>\n                </div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthRegisterSum"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"vlt-register-sum\">\r\n\r\n\r\n    <div class=\"row bottom-15\">\r\n        <div class=\"col-md-8 col-md-offset-2\">\r\n            <h4>Your account has been successfully created</h4>\r\n\r\n            <p>\r\n                Before start using Vaultier please review your account credentials and\r\n                <b>do not forget to save your private key.</b>\r\n            </p>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-8 col-md-offset-2 alert alert-warning\">\r\n\r\n        <div class=\"row bottom-5\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your email and username:\r\n                </b>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"row bottom-15\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your nickname:\r\n                </b>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                ");
  stack1 = helpers._triageMustache.call(depth0, "auth.user.nickname", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"row top-15\">\r\n            <div class=\"col-md-5 col-md-offset-1\">\r\n                <b>\r\n                    Your private key\r\n                </b>\r\n                <br/>\r\n                    <span class=\"help-block\">\r\n                        Used instead of password. Please save if you did not yet.\r\n                    </span>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <a\r\n                    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "downloadKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        data-toggle=\"tooltip\"\r\n                        title=\"\r\n                            Private key is used instead of password to log into Vaultier.\r\n                            Please keep private key safe and do not give it to anybody.\r\n                            Without private key you will not be able to log into Vaultier\r\n                            and your data will be rendered unreadable.\r\n                            \"\r\n                        class=\"btn btn-default btn-sm\"\r\n                        >\r\n                    <span class=\"glyphicon glyphicon-save\"></span>\r\n                    Save your file\r\n\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryReset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                <tr>\n                                    <td>\n                                        ");
  stack1 = helpers._triageMustache.call(depth0, "workspace_name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </td>\n                                    <td>\n                                        ");
  stack1 = helpers['if'].call(depth0, "is_recoverable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                                    </td>\n                                </tr>\n                            ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                                            <strong class=\"text-success\">Yes</strong>\n                                        ");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                                            <strong class=\"text-danger\">No</strong>\n                                        ");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Rebuild your lost key</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"row bottom-15\">\n\n                    <div class=\"col-md-10 col-md-offset-1\">\n                        <h3>Workspace encrypted data recovery</h3>\n\n                        <p>\n                            After you rebuild your private key access to encrypted workspace data has to be recovered.\n                            Recovery is possible only to workspaces where more than one member exists.\n                            Your access will be recovered once at least one of your workspace collaborators goes online.\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row table-responsive\">\n                    <div class=\"col-md-10 col-md-offset-1\">\n                        <table class=\"table table-condensed\">\n                            <thead>\n                            <tr>\n                                <th>Workspace</th>\n                                <th>Possible recovery</th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            ");
  stack1 = helpers.each.call(depth0, "content.memberships", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "disableKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                        Disable current lost key\n                    </button>\n                    <button type=\"submit\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rebuildKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                        Rebuild your lost key\n                    </button>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryRebuild"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"text-center\">\n                            You are about to generate a new private key.\n                            Click the bottom bellow and follow the instructions.\n                            <br/>\n                            <br/>\n                            <a ");
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

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <div class=\"vlt-dialog-header\">\n            <h2>Private key</h2>\n        </div>\n        <div class=\"vlt-dialog-body\">\n\n            <div class=\"col-md-8 col-md-offset-2\">\n                ");
  stack1 = helpers['if'].call(depth0, "stepInfo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n                ");
  stack1 = helpers['if'].call(depth0, "stepKeys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["Auth/AuthLostKeyRecoveryDisable"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                        Register\n                    ");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 col-xs-12 top-50\">\n    <div class=\"vlt-dialog-content\">\n        <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"vlt-dialog-header\">\n                <h2>Disable your workspaces</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n                <div class=\"col-md-8 col-md-offset-2\">\n                    <div class=\"vlt-dialog-body\">\n                        <div class=\"text-center\">\n                            Your key was disabled.\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"vlt-dialog-footer\">\n\n                <div class=\"pull-right vlt-right-buttons\">\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n        </form>\n    </div>\n</div>\n");
  return buffer;
  
});

//# sourceMappingURL=auth.js.map