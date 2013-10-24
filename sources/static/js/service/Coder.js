Po.NS('Service');

Service.Coder = Ember.Object.extend({

    generateKeys: function (callback) {
        var build = function () {
            return  {
                privateKey: generator.getPrivateKey(),
                publicKey: generator.getPublicKey()
            }
        }

        var generator = new JSEncrypt({default_key_size: 1024});
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
