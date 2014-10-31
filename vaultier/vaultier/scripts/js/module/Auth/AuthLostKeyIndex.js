'use strict';

Vaultier.AuthLostKeyIndexRoute = Ember.Route.extend({

    /**
     * Creates a new LostKey model instance, must be done by hand
     * because of the different name
     */
    model: function () {
        return this.get('store').createRecord('LostKey');
    },

    setupController: function(ctrl, model) {
        ctrl.set('content', model);
        ctrl.set('error', false);
    },

    actions: {
        sendRecoveryKeyRequest: function () {
            var ctrl = this.get('controller');
            var record = ctrl.get('content');

            var promise = record.saveRecord()
                .then(function (response) {
                    this.transitionTo('AuthLostKey.success');
                }.bind(this)
            ).catch(function (error) {
                    ctrl.set('error', true);
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

Vaultier.AuthLostKeyIndexController = Ember.Controller.extend({
    email: null,
    error: false
});

Vaultier.AuthLostKeyIndexView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.AuthLostKeySuccessView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeySuccess',
    layoutName: 'Layout/LayoutStandard'
});