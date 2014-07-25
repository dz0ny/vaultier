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

    setupController: function(ctrl, model) {
        ctrl.set('content', model);
        ctrl.set('error', false);
    },

    actions: {
        sendRecoveryKeyRequest: function () {
            var ctrl = this.get('controller');
            var record = ctrl.get('content');

            var promise = record.saveRecord()
                .then(function (response) {
                    this.transitionTo('AuthLostKey.success');
                }.bind(this)
            ).catch(function (error) {
                    ctrl.set('error', true);
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthLostKeyIndexController = Ember.Controller.extend({
    email: null,
    error: false
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

        save: function (keys, result) {
            this.set('controller.keys', keys);
            var content = this.modelFor('AuthLostKeyRecoveryRebuild');
            content.set('public_key', keys.publicKey);
            content.set('recover_type', Vaultier.LostKey.proto().recoverType['REBUILD'].value);

            var promise = content.saveRecord()
                .then(function (response) {
                    this.get('auth').login(response.created_by.email, keys.privateKey, false);
                    $.notify('You have successfully rebuild your new private key', 'success');
                    this.transitionTo('AuthLostKeyRecovery.success');
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
    keys: null
});

Vaultier.AuthLostKeyRecoveryRebuildView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryRebuild',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.AuthLostKeyRecoverySuccessView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoverySuccess',
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

//# sourceMappingURL=auth.js.map