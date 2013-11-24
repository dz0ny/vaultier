Po.NS('Service');

Service.Coder = Ember.Object.extend({

    TestingGenerator: Ember.Object.extend({

        getPrivateKey: function () {
            return this.private
        },

        getPublicKey: function () {
            return this.public
        },

        getKey: function (callback) {
            this.private = $('div.vlt-test-private-key').text().trim()
            this.public = $('div.vlt-test-public-key').text().trim()

            if (callback) {
                return callback(this)
            } else {
                return this
            }
        }

    }),

    generateKeys: function (callback) {
//        var generator = new JSEncrypt({default_key_size: 1024});
        var generator = this.TestingGenerator.create();

        var build = function () {
            return  {
                privateKey: generator.getPrivateKey(),
                publicKey: generator.getPublicKey()
            }
        }

        if (callback) {
            generator.getKey(function () {
                callback(build())
            });
        } else {
            generator.getKey()
            return build();
        }
    },

    sign: function (value, privateKey) {
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(privateKey);
        var signature = hex2b64(rsa.signString(value, 'sha1'));

        return signature;
    },

    encryptRSA: function (value, publicKey) {
        var decoder = new JSEncrypt();
        decoder.setPublicKey(publicKey)
        var result = decoder.encrypt(value);

        return result;
    },


    decryptRSA: function (value, privateKey) {
        var decoder = new JSEncrypt();
        decoder.setPrivateKey(privateKey);
        var result = decoder.decrypt(value);

        return result;
    },

    generateWorkspaceKey: function () {
        var min = 10;
        var max = 20;
        var length = Math.floor(Math.random() * (max - min + 1)) + min;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    decryptAES: function (value, passPhrase) {
        return CryptoJS.AES.decrypt(value, passPhrase).toString(CryptoJS.enc.Utf8);
    },

    encryptAES: function (value, passPhrase) {
        return CryptoJS.AES.encrypt(value, passPhrase).toString()
    }



});

Service.Auth.reopenClass(Utils.Singleton);
