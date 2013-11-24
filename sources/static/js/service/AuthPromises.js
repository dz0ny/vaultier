Service.AuthPromises = Ember.Object.extend({

    token: null,

    _auth: function (email, privateKey) {
        return function (password) {
            return Ember.RSVP.Promise(function (resolve, reject) {

                var coder = Service.Coder.current();
                var signature = coder.sign(email, privateKey);

                Ember.$.ajax({
                    url: '/api/auth/auth',
                    type: 'post',
                    data: {
                        email: email,
                        signature: signature
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
                    function (error) {
                        console.error('User cannot be retrieved');
                        reject(error);
                    }

                )
            });
        }
    },

    _useToken: function () {
        return function (token) {
            Ember.$.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Vaultier-Token',token);
                }
            });
            this.set('token', token);

            return Ember.RSVP.resolve();
        }.bind(this);
    },

    _resetToken: function () {
        return function () {
            Ember.$.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Vaultier-Token', '');
                }
            });
            this.set('token', null)

            return Ember.RSVP.resolve();
        }.bind(this);
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

    user: function () {
        return Ember.RSVP.resolve()
            .then(this._retrieveUser(token))
    },

    logout: function () {
        return Ember.RSVP.resolve()
            .then(this._unauth())
            .then(this._resetToken())
    },

    login: function (email, privateKey) {
        return Ember.RSVP.resolve()
            .then(this._auth(email, privateKey))
            .then(this._useToken())
            .then(this._retrieveUser())
    }


})
;
