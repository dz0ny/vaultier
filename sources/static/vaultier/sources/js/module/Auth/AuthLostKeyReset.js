'use strict';


Vaultier.AuthLostKeyResetRoute = Ember.Route.extend({

    hash: null,

    model: function (params, transition) {
        var hash = params.hash;
        this.set('hash', hash);
        var lostkey = this.get('store')
            .find('LostKey', {id: params.id, hash: hash});

        return lostkey;
    },

    setupController: function (ctrl, model) {
        this._super.apply(this, arguments);
        ctrl.set('content', model);
    },

    generateKey: function () {
        var ctrl = this.get('controller');
        var blob = new Blob([ctrl.get('props.keys.privateKey')], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "vaultier.key");
    },

    actions: {

        rebuildKey: function () {
            console.log('sendRebuildKeyRequest', this.get('hash'));
            var ctrl = this.get('controller');
            var record = ctrl.get('content');
            this.generateKey();

            record.set('public_key', ctrl.get('props.keys.publicKey'));

            record.saveRecord()
                .then(function (response) {
                    $.notify('An email was send to you with the link to recover your key', 'success');
                }.bind(this)
            ).catch(function (error) {
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
        },
        disableKey: function () {
            console.log('sendDisableCurrentKeyRequest', this.get('hash'));
            var record = this.get('controller.content');
            record.set('isDirty', true);
            record.saveRecord()
                .then(function (response) {
                    $.notify('An email was send to you with the link to recover your key', 'success');
                }.bind(this)
            ).catch(function (error) {
                    $.notify('An error just happened please try again', 'error');
                }.bind(this));
        }

    }

});

Vaultier.AuthLostKeyResetController = Ember.Controller.extend({
        needs: ['application'],
        id: null,
        memberships: [],
        created_by: null,
        public_key: null
    }
);

Vaultier.AuthLostKeyResetView = Ember.View.extend({
    templateName: 'Auth/AuthLostKeyReset',
    layoutName: 'Layout/LayoutStandard'
});

