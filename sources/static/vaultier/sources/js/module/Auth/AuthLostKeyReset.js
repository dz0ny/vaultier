/**
 * Created by rauluccocm on 5/28/14.
 */
'use strict';

Vaultier.AuthLostKeyResetRoute = Ember.Route.extend({


    model: function (params, transition) {
        var lostkey = this.modelFor('AuthLostKey');
        var store = this.get('store');
        return store.find('AuthLostKey', {lostkey: lostkey.get('id') + '/?hash=' + lostkey.get('hash') });
    },

    actions: {
        sendRebuildKeyRequest: function () {
            var model = this.get('controller.content');
            var record = Vaultier.AuthLostKey.create({email: model.email});
            record.saveRecord()
                .then(function (R) {
                    $.notify('An email was send to you with the link to recover your key', 'success');
                }.bind(this)
            ).catch(function (E) {
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
        },
        sendDisableCurrentKeyRequest: function () {
            var model = this.get('controller.model');
            var record = Vaultier.AuthLostKey.create({email: model.email});
            record.saveRecord()
                .then(function (R) {
                    $.notify('An email was send to you with the link to recover your key', 'success');
                }.bind(this)
            ).catch(function (E) {
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
        }

    }

});

Vaultier.AuthLostKeyResetController = Ember.Controller.extend({
});

Vaultier.AuthLostKeyResetView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyReset',
    layoutName: 'Layout/LayoutStandard'
});

