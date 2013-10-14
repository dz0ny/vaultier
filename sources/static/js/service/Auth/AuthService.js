Po.NS('Vaultier.Services.Auth');

Vaultier.Services.Auth.AuthService = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.store = Vaultier.__container__.lookup('store:main')
    },

    store: null,

    callbacks: [],

    user: null,

    checked: true,

    privateKey: null,

    isAuthenticated: function () {
        return this.get('user.id') !== null
    }.property('user'),

    isChecked: function () {
        return this.get('checked') == true
    }.property('user', 'checked'),


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

    status: function () {
        var promise = Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                url: '/api/auth/status',
                type: 'get'
            }).then(
                    function (user) {
                        user = this._afterAuthenticate({
                            user: user,
                            privateKey: null
                        });
                        resolve(user);

                    }.bind(this),

                    function () {
                        this._afterAuthenticate(null);
                        resolve(null);
                    }.bind(this)
                )
        }.bind(this));

        return promise;
    },

    auth: function (props) {

        var promise = Ember.RSVP.Promise(function (resolve, reject) {
            // handshake
            Ember.$.ajax({
                url: '/api/auth/handshake',
                type: 'post',
                data: {
                    email: props.email
                }
            }).then(function (handshakeResponse) {
                    var decoder = new JSEncrypt();
                    decoder.setPrivateKey(props.privateKey);
                    var password = decoder.decrypt(handshakeResponse.challenge);

                    // login
                    Ember.$.ajax({
                        url: '/api/auth/auth',
                        type: 'post',
                        data: {
                            email: props.email,
                            password: password
                        }
                    }).then(
                            function (authResponse) {
                                resolve(authResponse);
                            }.bind(this),
                            function () {
                                reject();
                            }.bind(this)
                        )
                }.bind(this))

        });
//
        promise.then(
            // when authenticated
            function (user) {
                this._afterAuthenticate({
                    user: user,
                    privateKey: props.privateKey
                })
            }.bind(this),

            // when not authenticated
            function (error) {
                this._afterAuthenticate(null)
            }.bind(this)
        );


        return promise;
    },

    logout: function () {

        var promise = Ember.RSVP.Promise(function (resolve, reject) {

            Ember.$.ajax({
                url: '/api/auth/logout',
                type: 'post'
            }).always(function () {
                    this._afterAuthenticate(null);
                    resolve();
                }.bind(this));
        }.bind(this));

        return promise;
    },

    didAuthenticate: function (callback) {
        this.callbacks.push(callback);
        callback(this.status);
    },

    _afterAuthenticate: function (result) {
        result = result || {user: null, privateKey: null}

        //@todo: clear store for previous users

        // is user, creates AutheticatedUser record
        if (result.user) {
            user = this.store.push('AuthenticatedUser', result.user);
        } else {
            user = null
        }

        // set status
        this.set('user', user);
        this.set('checked', true);
        this.set('privateKey', result.privateKey)

        // run didAuthenticate callbacks
        this.callbacks.forEach(function (c) {
            c(this);
        }.bind(this));

        return user;
    }

});
Vaultier.Services.Auth.AuthService.reopenClass(Utils.Singleton);
