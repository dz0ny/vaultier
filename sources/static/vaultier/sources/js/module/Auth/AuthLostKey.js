'use strict';

Vaultier.AuthLostKeyRoute = Ember.Route.extend({
        setupController: function (ctrl, model) {
            this._super(ctrl, model);
            ctrl.set('email', 'whatever@rclick.cz');
            ctrl.set('content', model || {});
        },

        actions: {
            sendRecoveryKeyRequest: function () {
                var content = this.get('controller.content');
                console.log(content);
                var record = Vaultier.AuthLostKey.create({email: content.email});
                record.saveRecord()
                    .then(function (R) {
                        console.log(R);
                        $.notify('An email was send to you with the link to recover your key', 'success');
                    }.bind(this)
                    ).catch(function (E) {
                        console.log(E);
                        $.notify('An error just happened please try again', 'error');
                    }.bind(this));
            }
        }

    });

Vaultier.AuthLostKeyController = Ember.Controller.extend({
    needs: ['application']
});

Vaultier.AuthLostKeyView = Ember.View.extend({
    templateName: 'Auth/AuthLostKey',
    layoutName: 'Layout/LayoutStandard'
});

