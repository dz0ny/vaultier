Vaultier.SettingsKeysRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsKeys', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
            ctrl.set('stepInfo', true);
            ctrl.set('stepSuccess', false);
            ctrl.set('stepKeys', false)
        },

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

                var promise = this.get('changekey')
                    .changeKey(keys)
                    .then(function () {
                        this.set('controller.stepKeys', false);
                        this.set('controller.stepSuccess', true);
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('There was an error during update of your key', 'error');
                        this.get('errors').consoleError(error)
                    }.bind(this))

                result.promise = promise

            }
        }

    });


Vaultier.SettingsKeysView = Ember.View.extend({
    templateName: 'Settings/SettingsKeys'
});