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
        ctrl.set('props.loginButtonHidden', false);
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

    beforeModel: function (transition) {
        if (this.get('auth').get('isAuthenticated')) {
            transition.router.replaceWith('AuthRegister.sum');
        }
    },

    renderTemplate: function () {
        this.render(this.step, { outlet: 'AuthRegister'})
    },

    setupController: function (ctrl) {
        this._super(arguments);

        ctrl.set('props.loginButtonHidden', false);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', 'Sumit your credentials');

        // prepare user model
        var user = ctrl.get('content');
        if (!user) {
            var user = this.get('store').createRecord('AuthenticatedUser');
            ctrl.set('content', user);
        }

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

            // saves user
            if (user.get('currentState').stateName != 'root.loaded.created.invalid') {

                // update model
                user.set('public_key', keys.publicKey);

                // preapre controller
                ctrl.set('props.nextButtonDisabled', true);

                // register promise
                var promise = user.save();

                // authenticate promise
                promise.then(
                    // success create
                    function () {
                        return auth.login(user.get('email'), keys.privateKey)
                            .then(function () {
                                this.transitionTo('AuthRegister.sum');
                            }.bind(this));
                    }.bind(this),

                    // unsuccess create
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
    },

    actions: {

        downloadKey: function () {
            // start download
            var blob = new Blob([this.get('auth.privateKey')], {type: "text/plain;charset=utf-8"});
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

