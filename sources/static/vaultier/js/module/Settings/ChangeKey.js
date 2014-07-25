Vaultier.ChangeKeyComponent = Ember.Component.extend({
    layoutName: 'Settings/ChangeKey',

    keys: null,
    privateKeySaved: false,
    publicKeySaved: false,

    publicButtonDisabled: function () {
        return this.get('publicKeySaved') || !this.get('privateKeySaved');
    }.property('privateKeySaved', 'publicKeySaved'),

    didInsertElement: function () {
        if (!this.get('changekey')) {
            throw Error('service:changekey has to be injected into changekey component');
        }
        if (!this.get('keys')) {
            this.generate();
        }
    },

    generate: function () {
        var chk = this.get('changekey');
        chk.generateKeys(function (keys) {
            this.set('keys', keys);
        }.bind(this));
    },

    actions: {
        savePrivateKey: function () {
            // start download
            var raw = this.get('keys.privateKey');
            var blob = new Blob([raw], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vaultier.key");
            this.set('privateKeySaved', true);
        },

        savePublicKey: function () {
            this.set('publicKeySaved', true);
            var result = {};
            this.sendAction('action', this.get('keys'), result);
            if (result.promise) {
                result.promise
                    .catch(function (error) {
                        this.set('publicKeySaved', false);
                        throw error;
                    }.bind(this));
            }
        }
    }


});
