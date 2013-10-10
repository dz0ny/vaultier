/////////////////////////////////////////////////////////////////
//// ROUTE
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterRoute = Ember.Route.extend({
    tabFlow: ['AuthRegisterBefore', 'AuthRegisterKeys', 'AuthRegisterCreds', 'AuthRegisterSum'],
    initialTabIdx: 0,
    activeTabIdx: null,
    activeTabName: null,
    isLastTab: null,

    actions: {
        next: function () {
            var idx = this.activeTabIdx + 1;
            this.selectTab(idx);
            this.renderTab();
        },

        finish: function () {
            alert('done')
        }

    },

    selectTab: function (idx) {
        this.activeTabIdx = idx;
        this.activeTabName = this.tabFlow[idx];
        this.isLastTab = (idx == this.tabFlow.length - 1)

        var controller = this.controllerFor('AuthRegister');
        controller.set('activeTabName', this.activeTabName);
        controller.set('isLastTab', this.isLastTab);
        controller.set('isNextDisabled', false);

    },

    renderTab: function () {
        this.render(this.activeTabName, {
            into: 'AuthRegister',
            outlet: 'tab'
        });
    },

    renderTemplate: function (controller, model) {
        this.selectTab(this.initialTabIdx);

        this.render();
        this.renderTab();
    }

});

/////////////////////////////////////////////////////////////////
//// AuthRegister
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterController = Ember.Controller.extend({
    isLastTab: false,
    activeTabName: null,
    isNextDisabled: false,
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.register', 'Register')
});

Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/Register',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        this.controller.addObserver('activeTab', this.renderActiveTab.bind(this));
        this.renderActiveTab();
    },

    renderActiveTab: function () {
        var ctrl = this.controller;
        if (ctrl) {
            var el = this.get('element');
            $(el).find('.vlt-register-tabs li.active').removeClass('active');
            $(el).find('.vlt-register-tabs li.' + ctrl.get('activeTabName')).addClass('active');

        }
    }
});


/////////////////////////////////////////////////////////////////
//// AuthRegisterBefore
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterBeforeView = Ember.View.extend({
    templateName: 'Auth/RegisterBefore',

    didInsertElement: function () {
        console.log(Vaultier.resolve('route:AuthRegister'));
        console.log(this.get('this'));

//        Ember.run.later(this, function () {
//            this.controller.set('value', 'another value')
//        }, 1000);
    }

});

/////////////////////////////////////////////////////////////////
//// AuthRegisterKeys
/////////////////////////////////////////////////////////////////

Vaultier.AuthRegisterKeysController = Ember.Controller.extend({
    needs: ['AuthRegister'],
    privateKey: false,
    publicKey: false,
    keysReady: false
});

Vaultier.AuthRegisterKeysView = Ember.View.extend({
    templateName: 'Auth/RegisterKeys',
    actions: {

        downloadPublicKey: function () {
            // native download solution
            // document.location = 'data:Application/octet-stream,' + encodeURIComponent(this.privateKey);

            // start download
            var blob = new Blob([this.privateKey], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier-private-key.pem");

            //enable next button
            this.get('controller.controllers.AuthRegister')
                .set('isNextDisabled', false);
        }
    },

    willInsertElement: function () {

        this.get('controller.controllers.AuthRegister')
            .set('isNextDisabled', true);

        this.controller.set('keysReady', false);

        //2048 is required
        var generator = new JSEncrypt({default_key_size: 256});
        generator.getKey(function () {
            this.controller.set('privateKey', generator.getPrivateKey());
            this.controller.set('publicKey', generator.getPublicKey());
            this.controller.set('keysReady', true);
        }.bind(this));
    }

});

Vaultier.AuthRegisterCredsView = Ember.View.extend({
    templateName: 'Auth/RegisterCreds'
});

Vaultier.AuthRegisterSumView = Ember.View.extend({
    templateName: 'Auth/RegisterSum'
});

