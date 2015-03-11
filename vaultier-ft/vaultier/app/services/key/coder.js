import Ember from 'ember';
//@todo: to many globals - elaborate
/* global JSEncrypt, CryptoJS, RSAKey, hex2b64 */

export default Ember.Object.extend({

    TestingGenerator: Ember.Object.extend({

        config: null,

        getPrivateKey: function () {
            return this.private;
        },

        getPublicKey: function () {
            return this.public;
        },

        getKey: function (callback) {
            var config = this.get('config');

            this.private = config.dev_shared_key_private;
            this.public = config.dev_shared_key_public;
            if (callback) {
                return callback(this);
            } else {
                return this;
            }
        }
    }),

    generateKeys: function (callback) {

        var generator;
        if (this.get('config.dev_shared_key')) {
            // development generator
            generator = this.TestingGenerator.create({config: this.get('config')});
        } else {
            // production generator
            generator = new JSEncrypt({default_key_size: 2048});
        }

        var build = function () {
            return  {
                privateKey: generator.getPrivateKey(),
                publicKey: generator.getPublicKey()
            };
        };

        if (callback) {
            generator.getKey(function () {
                callback(build());
            });
        } else {
            generator.getKey();
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
        decoder.setPublicKey(publicKey);
        var result = decoder.encrypt(value);

        return result;
    },

    encryptNodeKey: function(value, publicKey) {
        return this.encryptRSA(value, publicKey);
    },

    decryptRSA: function (value, privateKey) {
        var decoder = new JSEncrypt();
        decoder.setPrivateKey(privateKey);
        var result = decoder.decrypt(value);

        return result;
    },

    decryptNodeKey: function(value, privateKey) {
        return this.decryptRSA(value, privateKey);
    },

    generateNodeKey: function () {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 32;
        var randomstring = '';
        var charCount = 0;
        var numCount = 0;

        for (var i = 0; i < string_length; i++) {
            // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value.
            if ((Math.floor(Math.random() * 2) === 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
                var rnum2 = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum2, rnum2 + 1);
                charCount += 1;
            }
        }
        return randomstring;
    },


    decryptAES: function (value, passPhrase) {
        return CryptoJS.AES.decrypt(value, passPhrase).toString(CryptoJS.enc.Utf8);
    },

    encryptAES: function (value, passPhrase) {
        return CryptoJS.AES.encrypt(value, passPhrase).toString();
    },

    decryptNodeData: function(data, nodeKey) {
        return this.decryptAES(data, nodeKey);
    },

    encryptNodeData: function(data, nodeKey) {
        return this.encryptAES(data, nodeKey);
    }



});
