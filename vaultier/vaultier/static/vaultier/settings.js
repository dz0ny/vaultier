Vaultier.ChangeKeyComponent = Ember.Component.extend({
    layoutName: 'Settings/ChangeKey',

    keys: null,
    privateKeySaved: false,
    publicKeySaved: false,

    publicButtonDisabled: function () {
        return this.get('publicKeySaved') || !this.get('privateKeySaved');
    }.property('privateKeySaved', 'publicKeySaved'),

    didInsertElement: function () {
        if (!this.get('changekey')) {
            throw Error('service:changekey has to be injected into changekey component');
        }
        if (!this.get('keys')) {
            this.generate();
        }
    },

    generate: function () {
        var chk = this.get('changekey');
        chk.generateKeys(function (keys) {
            this.set('keys', keys);
        }.bind(this));
    },

    actions: {
        savePrivateKey: function () {
            // start download
            var raw = this.get('keys.privateKey');
            var blob = new Blob([raw], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");
            this.set('privateKeySaved', true);
        },

        savePublicKey: function () {
            this.set('publicKeySaved', true);
            var result = {};
            this.sendAction('action', this.get('keys'), result);
            if (result.promise) {
                result.promise
                    .catch(function (error) {
                        this.set('publicKeySaved', false);
                        throw error;
                    }.bind(this));
            }
        }
    }


});


Vaultier.SettingsRoute = Ember.Route.extend({

    beforeModel: function (transition) {
        // only authenticated user can access
        if (!this.get('auth').checkAuthenticatedOrLogin(transition)) {
            return false;
        }
    },

    deactivate: function () {
        this.get('auth.user').rollback()
    }

})

Vaultier.SettingsView = Ember.View.extend({

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var path = this.get('parentView.controller.controllers.application.currentPath');
            var route = path.split('.')[path.split('.').length - 1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    }),

    templateName: 'Settings/SettingsIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.SettingsController = Ember.Controller.extend({
    needs: ['application']
})

Vaultier.SettingsIndexRoute = Ember.Route.extend({

    beforeModel: function (transition) {
        transition.abort()
        this.transitionTo('Settings.personal');
    }
})


Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'});
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'));

                        // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addSettings()
                    .addText('Personal settings')
            );
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your changes has been successfully saved.', 'success');
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    });

                ApplicationLoader.promise(promise);
            }

        }
    });

Vaultier.SettingsPersonalController = Ember.ObjectController.extend({
    needs: ['Settings']
});

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});

Vaultier.SettingsKeysRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsKeys', {outlet: 'Settings'});
        },

        setupController: function (ctrl) {
            ctrl.set('stepInfo', true);
            ctrl.set('stepSuccess', false);
            ctrl.set('stepKeys', false);

            // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addSettings()
                    .addText('Regenerate private key')
            );
        },

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

                var promise = this.get('changekey')
                    .changeKey(keys)
                    .then(function () {
                        this.set('controller.stepKeys', false);
                        this.set('controller.stepSuccess', true);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('There was an error during update of your key', 'error');
                        this.get('errors').consoleError(error)
                    }.bind(this));

                ApplicationLoader.promise(promise);

                result.promise = promise;

            }
        }

    });

Vaultier.SettingsKeysController = Ember.Controller.extend({
    needs: ['Settings']
});


Vaultier.SettingsKeysView = Ember.View.extend({
    templateName: 'Settings/SettingsKeys'
});

//# sourceMappingURL=settings.js.map