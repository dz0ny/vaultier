Service.AuthPromises = Ember.Object.extend({

    token: null,
    /**
     * @DI Vaultier.store.
     */
    store: null,
    /**
     * @DI Service.Coder
     */
    coder: null,

    _auth: function (email, privateKey) {
        var coder = this.coder;
        var date = new Date();
        var dateInISO = date.toISOString();
        var signature = coder.sign(email + dateInISO, privateKey);

        return Utils.RSVPAjax({
            url: '/api/auth/auth',
            type: 'post',
            data: {
                email: email,
                date: dateInISO,
                signature: signature
            }})
    },

    _retrieveUser: function (id) {
        if (!id) {
           return Ember.RSVP.reject('User id not specified')
        }
        return this.get('store').find('User', id)
            .catch(function (error) {
                throw Error('Cannot retrieve user with id {id}'.replace('{id}', id))
            })
    },

    _useToken: function (token) {
        Ember.$.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Vaultier-Token', token);
            }
        });
        this.set('token', token);
        return Ember.RSVP.resolve();
    },

    _resetToken: function () {
        Ember.$.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Vaultier-Token', '');
            }
        });
        this.set('token', null)

        return Ember.RSVP.resolve();
    },

    _unauth: function () {
        return Utils.RSVPAjax({
            url: '/api/auth/logout',
            type: 'post'
        })
    },

    user: function (user, token) {
        this._useToken(token)
        return this._retrieveUser(user)
    },

    logout: function () {
        return Ember.RSVP.resolve()
            .then(this._unauth())
            .then(this._resetToken())
    },

    login: function (email, privateKey) {
        var user;
        var token;
        return Ember.RSVP.resolve()
            .then(function() {
                return this._auth(email, privateKey)
            }.bind(this))

            .then(function(response) {
                user = response.user;
                token = response.token;
                return this._useToken(token)
            }.bind(this))

            .then(function() {
                return this._retrieveUser(user)
            }.bind(this))
    }

})
;
