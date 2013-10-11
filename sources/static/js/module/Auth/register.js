/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////

var BaseRegisterRoute = Ember.Route.extend({
    step: null,
    renderTemplate: function () {
        var ctrl = this.controllerFor(this.step);
        ctrl.set('step', this.step);
        ctrl.set('route', this);
        this.render('AuthRegister', {controller: this.step});
        this.render(this.step, { into: 'AuthRegister', outlet: 'tab'})
    }
});

var BaseRegisterController = Ember.Controller.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.register', 'Register')
});

Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/Register',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var step = this.controller.get('step');
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

Vaultier.AuthRegisterKeysController = BaseRegisterController.extend({
    privateKey: false,
    publicKey: false,
    keysReady: false
});

Vaultier.AuthRegisterKeysRoute = BaseRegisterRoute.extend({
    step: 'AuthRegisterKeys',
    actions: {
        next: function () {
            this.transitionTo('AuthRegisterCreds');
        },

        downloadPublicKey: function () {
            var ctrl = this.get('controller');
            // start download
            var blob = new Blob([ctrl.get('privateKey')], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier-private-key.pem");

            //enable next button
            ctrl.set('isNextDisabled', false);
        }
    },

    setupController: function (ctrl) {
        if (!ctrl.get('keysReady')) {
            ctrl.set('isNextDisabled', true);
            //2048 is required
            var generator = new JSEncrypt({default_key_size: 256});
            generator.getKey(function () {
                ctrl.set('privateKey', generator.getPrivateKey());
                ctrl.set('publicKey', generator.getPublicKey());
                ctrl.set('keysReady', true);
            }.bind(this));
        }
    }

});

Vaultier.AuthRegisterKeysView = Ember.View.extend({
    templateName: 'Auth/RegisterKeys',
});


Vaultier.AuthRegisterCredsView = Ember.View.extend({
    templateName: 'Auth/RegisterCreds'
});

Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/RegisterSum'
});

