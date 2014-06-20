'use strict';

Vaultier.AuthLostKeyRecoveryRebuildRoute = Ember.Route.extend({

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
            var content = this.modelFor('AuthLostKeyRecoveryRebuild');
            content.set('public_key', keys.publicKey);
            content.set('recover_type', Vaultier.LostKey.proto().recoverType['REBUILD'].value);

            var promise = content.saveRecord()
                .then(function (response) {
                    this.set('controller.stepKeys', false);
                    this.set('controller.stepSuccess', true);
                    this.get('auth').login(response.created_by.email, keys.privateKey, true);
                }.bind(this))
                .catch(function (error) {
                    $.notify('There was an error during update of your key, please try again later', 'error');
                    this.get('errors').consoleError(error);
                }.bind(this));
            ApplicationLoader.promise(promise);
            result.promise = promise;
        }
    }
});

Vaultier.AuthLostKeyRecoveryRebuildController = Ember.Controller.extend({
    needs: ['AuthLostKeyRecovery'],
    stepInfo: true,
    stepKeys: false,
    stepSuccess: false,
    keys: null
});

Vaultier.AuthLostKeyRecoveryRebuildView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryRebuild',
    layoutName: 'Layout/LayoutStandard'
});
