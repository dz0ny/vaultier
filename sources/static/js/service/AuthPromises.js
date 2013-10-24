Service.AuthPromises = Ember.Object.extend({

    _handshake: function (email) {
        return function () {
            return Ember.RSVP.Promise(function (resolve, reject) {
                console.log('a');
                Ember.$.ajax({
                    url: '/api/auth/handshake',
                    type: 'post',
                    data: {
                        email: props.email
                    }
                }).then(
                    function (response) {
                        resolve(response.challenge);
                    },
                    function () {
                        console.log('Handshake call unsuccessfull')
                        reject();
                    }
                )
            });
        }
    },

    _decryptHandshake: function (privateKey) {
        return function (challenge) {
            return Ember.RSVP.Promise(function (resolve, reject) {
                var decoder = new JSEncrypt();
                decoder.setPrivateKey(privateKey);
                var password = decoder.decrypt(challenge);

                if (password) {
                    resolve(password);
                } else {
                    console.error('Handshake response cannot be decoded');
                    reject();
                }

            })
        }
    },

    _auth: function (email) {
        return function (password) {
            return Ember.RSVP.Promise(function (resolve, reject) {
                Ember.$.ajax({
                    url: '/api/auth/auth',
                    type: 'post',
                    data: {
                        email: email,
                        password: password
                    }
                }).then(
                    function (response) {
                        // do set token here
                        resolve(response.token);
                    },
                    function () {
                        console.error('Auth call unsuccessfull');
                        reject();
                    }
                );
            });
        }
    },

    _retrieveUser: function () {
        return function () {
            return Ember.RSVP.Promise(function (resolve, reject) {
                Ember.$.ajax({
                    url: '/api/auth/user',
                    type: 'get'
                }).then(
                    function (user) {
                        resolve(user);
                    },
                    function () {
                        console.error('User cannot be retrieved');
                        reject(error);
                    }

                )
            });
        }
    },

    _useToken: function () {
        return function (token) {
            //todo
        }
    },

    _resetToken: function () {
        return function () {
            //todo
        }
    },

    _unauth: function () {
        return function () {
            return Ember.RSVP.Promise(function (resolve, reject) {
                Ember.$.ajax({
                    url: '/api/auth/logout',
                    type: 'post'
                }).always(function () {
                        resolve();
                    });
            });
        }
    },

    getToken: function () {
        //todo
    },

    user: function() {
        return Ember.RSVP.resolve()
            .then(this._retrieveUser())
    },

    logout: function() {
        return Ember.RSVP.resolve()
            .then(this._unauth())
            .then(this._resetToken())
    },

    login: function (email, privateKey) {
        return Ember.RSVP.resolve()
            // do auth
            .then(this._handshake(email))
            .then(this._decryptHandshake(privateKey))
            .then(this._auth(email))

            // initialize token and user
            .then(this._useToken())
            .then(this._retrieveUser())
    }


})
;
