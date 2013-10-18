Po.NS('Vaultier.Services.Auth');

Vaultier.Services.Auth.AuthService = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.store = Vaultier.__container__.lookup('store:main');
        this.session = Vaultier.Services.Auth.SessionService.current();
    },

    store: null,

    session: null,

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
                url: '/api/auth/user',
                type: 'get'
            }).then(
                    function (user) {
                        user = this.setAuthenticate({
                            user: user
                        });
                        resolve(user);

                    }.bind(this),

                    function (error) {
                        this.setAuthenticate(null);
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

                    if (password) {
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
                    } else {
                        reject();
                    }
                }.bind(this))

        });
//
        promise.then(
            // when authenticated
            function (user) {
                this.setAuthenticate({
                    user: user,
                    privateKey: props.privateKey,
                    persist: props.persist,
                    persistTTL: props.persistTTL
                })
            }.bind(this),

            // when not authenticated
            function (error) {
                this.logout();
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
                    this.setAuthenticate(null);
                    resolve();
                }.bind(this));
        }.bind(this));

        return promise;
    },

    afterAuthenticated: function (callback) {
        this.callbacks.push(callback);
        callback(this.status);
    },


    /**
     * accepts:
     *  {
     *      privateKey: 'privateKey string',
     *      email: 'user email'
     *      persistTTL: 'time to live in ms - integer'
     *  }
     *
     * @param {object|null} result
     * @returns {*}
     */
    setAuthenticate: function (result) {
        result = result || {};

        var persist = result.persist || null;
        var ttl = result.persistTTL;

        var user = result.user || null;
        var email = user ? user.email : null;
        var privateKey = result.privateKey || this.session.getKeyOfUser(email);

        // create user object
        user = user && privateKey ? Ember.Object.create(user) : null;

        // associate authenticated user
        this.set('user', user);
        this.set('checked', true);
        this.set('privateKey', result.privateKey);

        // save to session for browser inter-tab-window operability
        this.session.setAuth(email, privateKey);

        // persist login
        if (persist) {
            if (ttl == 0 || !user) {
                this.session.clearPersistAuth();
            } else {
                this.session.setPersistAuth(email, privateKey, ttl);
            }
        }

        // run afterAuthenticated callbacks
        this.callbacks.forEach(function (c) {
            c(this);
        }.bind(this));

        return user;
    }

});
Vaultier.Services.Auth.AuthService.reopenClass(Utils.Singleton);
