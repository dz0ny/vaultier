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