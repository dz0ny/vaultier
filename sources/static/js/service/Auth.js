Po.NS('Service');

Service.AuthService = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.store = Vaultier.__container__.lookup('store:main');
        this.session = Vaultier.Services.Auth.SessionService.current();
    },

    store: null,

    session: null,

    storage: null,

    callbacks: [],

    token: null,

    user: null,

    checked: false,

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

        promise.then(
            // when authenticated
            function (user) {
                this.setAuthenticate({
                    user: user,
                    privateKey: props.privateKey,
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
     *  }
     *
     * @param {object|null} result
     * @returns {*}
     */
    setAuthenticate: function (result) {
        result = result || {};

        var user = result.user || null;
        var email = user ? user.email : null;
        var privateKey = result.privateKey || this.session.getKeyOfUser(email);
        var token = result.token || null

        // create user object
        user = user && privateKey ? Ember.Object.create(user) : null;

        // associate authenticated user
        this.set('user', user);
        this.set('checked', true);
        this.set('privateKey', result.privateKey);
        this.set('token', token);

        // save to session
        this.session.set('auth', {
            email: email,
            privateKey: privateKey
        });

        // run afterAuthenticated callbacks
        this.callbacks.forEach(function (c) {
            c(this);
        }.bind(this));

        return user;
    },

    persistAuth: function (ttl) {
        this.storage.set('auth', {
            email: this.get('user').get('email'),
            privateKey: this.get('privateKey')
        }, ttl);
    },

    unpersistAuth: function () {
        this.storage.set('auth', {});
    }

});
Service.AuthService.reopenClass(Utils.Singleton);
