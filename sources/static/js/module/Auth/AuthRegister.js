/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////


var RegisterProps = Ember.Object.extend({
    nextButtonTitle: false,
    nextButtonDisable: false,
    keysReady: false,
    keys: null,
    loginButtonHidden: false
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
            return tab == this.get('parentView.controller.controllers.application.currentPath');
        }.property('parentView.controller.controllers.application.currentPath')
    });
});


Vaultier.AuthRegisterRoute = Ember.Route.extend({
    redirect: function () {
        if (Vaultier.Services.Auth.AuthService.current().get('isAuthenticated')) {
            this.transitionTo('AuthRegister.sum');
        } else {
            this.transitionTo('AuthRegister.before');
        }
    }
});


Vaultier.AuthRegisterController = Ember.Controller.extend({
    needs: ['application']
});

/////////////////////////////////////////////////////////////////
//// STEP1 - Before
/////////////////////////////////////////////////////////////////


Vaultier.AuthRegisterBeforeRoute = Ember.Route.extend({
    step: 'AuthRegisterBefore',

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
        if (!ctrl.get('props.keysReady')) {
            ctrl.set('props.nextButtonDisabled', true);
            //2048 is required
            var auth = Vaultier.Services.Auth.AuthService.current();
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

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    setupController: function (ctrl) {
        this._super(arguments);

        // prepare user model
        var user = ctrl.get('content');
        if (!user) {
            var user = this.get('store').createRecord('AuthenticatedUser');
            ctrl.set('content', user);
        }

        //test
//        var keys = Vaultier.Services.Auth.AuthService.current().generateKeys();
//        ctrl.set('props.keys', keys);
//        ctrl.set('props.keysReady', true);
//        user.set('email', 'jan');
//        user.set('nickname', 'jan');
//        user.set('public_key', keys.publicKey);


        // check if keys, otherwise go to step 1
        if (!ctrl.get('props.keysReady')) {
            this.transitionTo('AuthRegister');
        }
    },

    actions: {
        next: function () {

            // prepare data
            var auth = Vaultier.Services.Auth.AuthService.current();
            var ctrl = this.get('controller');
            var user = ctrl.get('content');
            var keys = ctrl.get('props.keys');


            // saves user
            if (user.get('currentState').stateName != 'root.loaded.created.invalid') {

                // update model
                user.set('public_key', keys.publicKey);

                // preapre controller
                ctrl.set('props.nextButtonDisabled', true);

                var promise = user.save();

                // try to register and authenticate
                promise.then(
                    function () {
                        auth.auth({
                            email: user.get('email'),
                            privateKey: keys.privateKey,
                            publicKey: keys.publicKey
                        }).then(function () {
                                this.transitionTo('AuthRegister.sum');
                            }.bind(this));

                    }.bind(this),
                    function (errors) {
                        ctrl.set('errors', Ember.Object.create(errors.errors));
                        ctrl.set('props.nextButtonDisabled', false);
                    }.bind(this));
            }


        }
    }
});

Vaultier.AuthRegisterCredsController = BaseRegisterController.extend({
    init: function () {
        this._super(arguments)
        this.set('props.nextButtonTitle', 'Create your account')
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
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    setupController: function (ctrl) {
        this._super(arguments);
        ctrl.set('props.loginButtonHidden', true);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', 'Start using vaultier')
        ctrl.set('auth', Vaultier.Services.Auth.AuthService.current());
    },

    actions: {

        downloadKey: function () {
            // start download
            var blob = new Blob([Vaultier.Services.Auth.AuthService.current().get('privateKey')], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");
        },

        next: function () {
            this.transitionTo('index');
        }
    }
});


Vaultier.AuthRegisterSumController = BaseRegisterController.extend({
    auth: null
});


Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/AuthRegisterSum'
});

