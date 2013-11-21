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

    decrypt: function (value, privateKey) {
        var decoder = new JSEncrypt();
        decoder.setPrivateKey(privateKey);
        var result = decoder.decrypt(value);

        return result;
    }


});
