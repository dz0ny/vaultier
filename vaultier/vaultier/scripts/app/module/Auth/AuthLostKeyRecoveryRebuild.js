'use strict';

Vaultier.AuthLostKeyRecoveryRebuildRoute = Ember.Route.extend({

    actions: {

        save: function (keys, result) {
            this.set('controller.keys', keys);
            var content = this.modelFor('AuthLostKeyRecoveryRebuild');
            content.set('public_key', keys.publicKey);
            content.set('recover_type', Vaultier.dal.model.LostKey.proto().recoverType['REBUILD'].value);

            var promise = content.saveRecord()
                .then(function (response) {
                    this.get('auth').login(response.created_by.email, keys.privateKey, false);
                    $.notify('You have successfully rebuild your new key', 'success');
                    this.transitionTo('AuthLostKeyRecovery.success');
                }.bind(this))
                .catch(function (error) {
                    $.notify('There was an error during update of your key, please try again later', 'error');
                    this.get('errors').consoleError(error);
                }.bind(this));
            ApplicationKernel.UI.showLoaderUponPromise(promise);
            result.promise = promise;
        }
    }
});

Vaultier.AuthLostKeyRecoveryRebuildController = Ember.Controller.extend({
    needs: ['AuthLostKeyRecovery'],
    keys: null
});

Vaultier.AuthLostKeyRecoveryRebuildView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryRebuild',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.AuthLostKeyRecoverySuccessView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoverySuccess',
    layoutName: 'Layout/LayoutStandard'
});