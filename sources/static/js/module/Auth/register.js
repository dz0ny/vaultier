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

var BaseRegisterRoute = Ember.Route.extend({
    step: null,
    renderTemplate: function () {
        var ctrl = this.controllerFor(this.step);
        ctrl.set('props.step', this.step);
        ctrl.set('props.route', this);
        this.render('AuthRegister', {controller: this.step});
        this.render(this.step, { into: 'AuthRegister', outlet: 'tab'})


        ctrl.set('breadcrumbs',
            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addLink('AuthRegister', 'Register')
        );
    }
});

var BaseRegisterController = Ember.Controller.extend({
    props: RegisterProps.current(),
});

Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/Register',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var step = this.controller.get('props.step');
        var el = this.get('element');
        $(el).find('.vlt-register-tabs li.active').removeClass('active');
        $(el).find('.vlt-register-tabs li.' + step).addClass('active');

    }
});


/////////////////////////////////////////////////////////////////
//// STEP1 - Before
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('AuthRegisterBefore');
    }
});

Vaultier.AuthRegisterBeforeRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterBefore',
    actions: {
        next: function () {
            this.transitionTo('AuthRegisterKeys');
        }
    }
});

Vaultier.AuthRegisterBeforeView = Ember.View.extend({
    templateName: 'Auth/RegisterBefore'
});

Vaultier.AuthRegisterBeforeController = BaseRegisterController.extend();

/////////////////////////////////////////////////////////////////
//// STEP2 - keys
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterKeysController = BaseRegisterController.extend();

Vaultier.AuthRegisterKeysRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterKeys',
    actions: {
        next: function () {
            this.transitionTo('AuthRegisterCreds');
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
    templateName: 'Auth/RegisterKeys'
});

/////////////////////////////////////////////////////////////////
//// STEP3 - Creds
/////////////////////////////////////////////////////////////////


Vaultier.AuthRegisterCredsRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterCreds',

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
                                this.transitionTo('AuthRegisterSum');
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
    templateName: 'Auth/RegisterCreds'
});

/////////////////////////////////////////////////////////////////
//// STEP4 - Sum
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterSumRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterSum',

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
    auth: null,
});


Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/RegisterSum'
});

