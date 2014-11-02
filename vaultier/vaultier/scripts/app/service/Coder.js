Po.NS('Service');

Service.Coder = Ember.Object.extend({

    TestingGenerator: Ember.Object.extend({

        config: null,

        getPrivateKey: function () {
            return this.private
        },

        getPublicKey: function () {
            return this.public
        },

        getKey: function (callback) {
            var config = this.get('config');

            this.private = config.dev_shared_key_private;
            this.public = config.dev_shared_key_public;
            if (callback) {
                return callback(this)
            } else {
                return this
            }
        }
    }),

    generateKeys: function (callback) {
        if (this.get('config.dev_shared_key')) {
            // development generator
            var generator = this.TestingGenerator.create({config: this.get('config')});
        } else {
            // production generator
            var generator = new JSEncrypt({default_key_size: 2048});
        }

        var build = function () {
            return  {
                privateKey: generator.getPrivateKey(),
                publicKey: generator.getPublicKey()
            }
        };

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

    encryptWorkspaceKey: function(value, publicKey) {
        return this.encryptRSA(value, publicKey);
    },

    decryptRSA: function (value, privateKey) {
        var decoder = new JSEncrypt();
        decoder.setPrivateKey(privateKey);
        var result = decoder.decrypt(value);

        return result;
    },

    decryptWorkspaceKey: function(value, privateKey) {
        return this.decryptRSA(value, privateKey);
    },

    generateWorkspaceKey: function () {
        var length = 32;
        var text = '';
        for (var i = 0; i < length; i++) {
            text = text + String.fromCharCode(
                Math.floor(Math.random() * (255))
            )
       }
        return text;
    },


    decryptAES: function (value, passPhrase) {
        return CryptoJS.AES.decrypt(value, passPhrase).toString(CryptoJS.enc.Utf8);
    },

    encryptAES: function (value, passPhrase) {
        return CryptoJS.AES.encrypt(value, passPhrase).toString()
    },

    decryptWorkspaceData: function(data, workspaceKey) {
        return this.decryptAES(data, workspaceKey)
    },

    encryptWorkspaceData: function(data, workspaceKey) {
        return this.encryptAES(data, workspaceKey)
    }



});
