'use strict';


Vaultier.AuthLostKeyRecoveryResetRoute = Ember.Route.extend({
    actions: {

        rebuildKey: function () {
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure?', function () {
                this.transitionTo('AuthLostKeyRecovery.rebuild');
            }.bind(this));
        },
        disableKey: function () {
            var model = this.modelFor('AuthLostKeyRecoveryReset');
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure that you want to continue?', function () {

                model.set('public_key', '-'); // This can't be an empty string
                model.set('recover_type', Vaultier.LostKey.proto().recoverType['DISABLE'].value);

                var promise = model.saveRecord()
                    .then(function (response) {
                        this.transitionTo('AuthLostKeyRecovery.disable');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('How embarrassing! There was an error, please try again later', 'error');
                        this.get('errors').consoleError(error);
                    }.bind(this));
                ApplicationKernel.UI.showLoaderUponPromise(promise);
            }.bind(this));
        }

    }

})
;

Vaultier.AuthLostKeyRecoveryResetController = Ember.Controller.extend({
        needs: ['application'],
        memberships: [],
        created_by: null,
        public_key: null
    }
);

Vaultier.AuthLostKeyRecoveryResetView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyRecoveryReset',
    layoutName: 'Layout/LayoutStandard'
});

