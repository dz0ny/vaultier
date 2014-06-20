'use strict';


Vaultier.AuthLostKeyRecoveryResetRoute = Ember.Route.extend({
    actions: {

        rebuildKey: function () {
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure?', function () {
                this.transitionTo('AuthLostKeyRecovery.rebuild');
            }.bind(this));
        },
        disableKey: function () {
            Vaultier.confirmModal(this, 'This action can not be undone. Are you sure that you want to continue?', function () {
                this.transitionTo('AuthLostKeyRecovery.disable');
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

