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
        this._super(arguments);

        ctrl.set('props.loginButtonHidden', false);
        ctrl.set('props.nextButtonDisabled', false);
        ctrl.set('props.nextButtonTitle', 'Sumit your credentials');

        // prepare user model
        var user = this.modelFor('AuthRegister')

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
                .then(function () {
                    return auth.login(user.get('email'), keys.privateKey, false)
                        .then(function () {
                            auth.rememberUser(null);
                            this.transitionTo('AuthRegister.sum');
                        }.bind(this));
                }.bind(this))

                // unsuccessfull login
                .catch(function (errors) {
                    ctrl.set('errors', Ember.Object.create(errors.errors));
                    ctrl.set('props.nextButtonDisabled', false);
                    return Ember.RSVP.reject(errors);
                }.bind(this))

                // create default user environment
                .then(function () {
                    return this.get('newuserinit').initializeUser()
                }.bind(this))

                // save transition and created workspace and vault
                .then(function (newuservalues) {
                    ctrl.get('props').setProperties(newuservalues)
                }.bind(this))

            ApplicationLoader.promise(promise)
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
        // prepare user model
        var user = this.modelFor('AuthRegister')
        ctrl.set('content', user);

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
            // get transition function created by newuserinit service this function is used to transition to proper page after registration
            // in case user refreshes the page transition is not available anymore, in that case user is redirected to index
            var transition = this.get('controller.props.transitionAfterRegister');
            if (transition) {
                transition()
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

