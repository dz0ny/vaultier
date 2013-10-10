Vaultier.AuthRegisterRoute = Ember.Route.extend({
    tabFlow: ['AuthRegisterBefore', 'AuthRegisterKeys', 'AuthRegisterCreds', 'AuthRegisterSum'],
    tabIdx: 1,

    actions: {
        next: function () {
            this.tabIdx++;
            this.selectTab(this.tabFlow[this.tabIdx]);
        },

        finish: function () {
        }

    },

    selectTab: function (name) {
        var controller = this.controllerFor('AuthRegister');
        controller.set('activeTab', name);
        if (this.tabIdx == this.tabFlow.length - 1) {
            controller.set('lastTab', true);
        }
        this.renderTab(name);
    },

    renderTab: function (name) {
        this.render(name, {
            into: 'AuthRegister',
            outlet: 'tab'
        });
    },

    renderTemplate: function (controller, model) {
        this.render();
        this.selectTab(this.tabFlow[this.tabIdx]);
    }

});


Vaultier.AuthRegisterController = Ember.Controller.extend({
    value: 'some value',
    lastTab: false,
    activeTab: null,
    isNextDisabled: false,
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.register', 'Register')
})


Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/Register',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        this.controller.addObserver('activeTab', this.renderActiveTab.bind(this));
        this.renderActiveTab();
    },

    renderActiveTab: function () {
        var el = this.get('element');
        $(el).find('.vlt-register-tabs li.active').removeClass('active');
        $(el).find('.vlt-register-tabs li.' + this.controller.get('activeTab')).addClass('active');
    }


});

Vaultier.AuthRegisterBeforeController = Ember.Controller.extend({

});


Vaultier.AuthRegisterBeforeView = Ember.View.extend({
    templateName: 'Auth/RegisterBefore',

    didInsertElement: function () {
        Ember.run.later(this, function () {
            this.controller.set('value', 'another value')
        }, 1000);
    }

});

Vaultier.AuthRegisterKeysController = Ember.Controller.extend({
    keysReady: false,
    privateKey: null,
    publicKey: null,

    needs: ['AuthRegister'],

    init: function () {
        this._super(arguments);
        var authRegister = this.get('controllers.AuthRegister');
        authRegister.set('isNextDisabled', true);

        //2048 is required
        var generator = new JSEncrypt({default_key_size: 1024});
        generator.getKey(function () {
            this.set('privateKey', generator.getPrivateKey());
            this.set('publicKey', generator.getPublicKey());
            this.set('keysReady', true);

            authRegister.set('value', 'test');
            authRegister.set('isNextDisabled', false);
        }.bind(this));

    },
});


Vaultier.AuthRegisterKeysView = Ember.View.extend({
    templateName: 'Auth/RegisterKeys'
});

Vaultier.AuthRegisterCredsView = Ember.View.extend({
    templateName: 'Auth/RegisterCreds'
});

Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/RegisterSum'
});

