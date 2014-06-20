'use strict';

Vaultier.AuthLostKeyIndexRoute = Ember.Route.extend({

    /**
     * Creates a new LostKey model instance, must be done by hand
     * because of the different name
     */
    model: function () {
        return this.get('store').createRecord('LostKey');
    },

    beforeModel: function(model, transition) {
        var ctrl = this.controllerFor('AuthLostKeyIndex');
        ctrl.set('emailWasSuccessfullySend', false);
    },

    actions: {
        sendRecoveryKeyRequest: function () {
            var ctrl = this.get('controller');
            var record = ctrl.get('content');

            var promise = record.saveRecord()
                .then(function (response) {
                    ctrl.set('emailWasSuccessfullySend', true);
                }.bind(this)
            ).catch(function (error) {
                    ctrl.set('error', true);
                    ctrl.set('emailSuccess', false);
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthLostKeyIndexController = Ember.Controller.extend({
    email: null,
    emailSuccess: false,
    error: false,
    emailWasSuccessfullySend: false
});

Vaultier.AuthLostKeyIndexView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyIndex',
    layoutName: 'Layout/LayoutStandard'
});
Vaultier.AuthLostKeySuccessView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeySuccess',
    layoutName: 'Layout/LayoutStandard'
});
