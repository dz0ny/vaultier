/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////

var BaseRegisterRoute = Ember.Route.extend({
    step: null,
    renderTemplate: function () {
        var ctrl = this.controllerFor(this.step);
        ctrl.set('props.step', this.step);
        ctrl.set('props.route', this);
        this.render('AuthRegister', {controller: this.step});
        this.render(this.step, { into: 'AuthRegister', outlet: 'tab'})
    }
});

var BaseRegisterController = Ember.Controller.extend({
    props: Ember.Object.create(),
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.register', 'Register')
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

        downloadPublicKey: function () {
            var ctrl = this.get('controller');
            // start download
            var blob = new Blob([ctrl.get('props.privateKey')], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier-private-key.pem");

            //enable next button
            ctrl.set('props.isNextDisabled', false);
        }
    },

    setupController: function (ctrl) {
        if (!ctrl.get('props.keysReady')) {
            ctrl.set('props.isNextDisabled', true);
            //2048 is required
            var generator = new JSEncrypt({default_key_size: 256});
            generator.getKey(function () {
                ctrl.set('props.privateKey', generator.getPrivateKey());
                ctrl.set('props.publicKey', generator.getPublicKey());
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

AuthService = Ember.Object.extend({

    auth: function(username) {

    }

});


Vaultier.AuthenticatedUser = DS.Model.extend({
    email: DS.attr('string'),
    nickname: DS.attr('string'),
    public_key: DS.attr('string')
});

Vaultier.AuthRegisterCredsRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterCreds',
    setupController: function (ctrl) {
        this._super(arguments);

        var keysCtrl = this.controllerFor('AuthRegisterCreds');
        var publicKey = keysCtrl.get('props.publicKey');
        publicKey = 'test';

        if (!publicKey || publicKey == '') {
            this.transitionTo('AuthRegister');
        }

        var user = ctrl.get('content');
        if (!user) {
            var user = this.get('store').createRecord('AuthenticatedUser');
            user.set('public_key', publicKey);
            ctrl.set('content', user);
        }

    },
    actions: {
        next: function () {
            var ctrl = this.get('controller');
            var user = ctrl.get('content');

            var promise = user.save();

            promise.then(
                function () {
                    console.log('a');
                },
                function (errors) {
                    ctrl.set('errors', Ember.Object.create(errors.errors));
                });
        }
    }
});

Vaultier.AuthRegisterCredsController = BaseRegisterController.extend({
    nextAsFinish: true
});

Vaultier.AuthRegisterCredsView = Ember.View.extend({
    templateName: 'Auth/RegisterCreds'
});

/////////////////////////////////////////////////////////////////
//// STEP4 - Sum
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/RegisterSum'
});

