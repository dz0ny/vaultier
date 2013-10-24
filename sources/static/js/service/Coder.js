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
    }


});
Service.Coder.reopenClass(Utils.Singleton);
