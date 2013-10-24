Po.NS('Service');

Service.Auth = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.store = Vaultier.__container__.lookup('store:main');
        this.session = Service.Session.current();
        this.promises = Service.AuthPromises.create()
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

    login: function (email, privateKey) {
        return this.promises.login(email, privateKey)
            .then(
                // successfull login
                function (user) {
                    this.setAuthenticatedUser(user, privateKey, this.promises.get('token'))
                }.bind(this),

                // unsuccessfull login
                function () {
                    this.setAuthenticatedUser(null)
                    return Ember.RSVP.reject()
                }.bind(this))
    },


    reload: function () {
        var session = this.loadFromSession() || {};
        var sessionUser = session.user || null;
        var sessionPrivateKey = session.privateKey || null;
        var sessionToken = session.token || null;

        this.promises._useToken()(sessionToken);
        this.setAuthenticatedUser(sessionUser, sessionPrivateKey, sessionToken)

        return Ember.RSVP.resolve();
    },


    logout: function () {
        return this.promises.logout()
            .then(function () {
                this.setAuthenticatedUser(null);
            }.bind(this))
    },

    afterAuthenticated: function (callback) {
        this.callbacks.push(callback);
        callback(this.status);
    },

    setAuthenticatedUser: function (user, privateKey, token) {
        var result;

        if (user && privateKey && token) {

            result = true;
            this.setProperties({
                checked: true,
                isAuthenticated: true,
                user: user,
                privateKey: privateKey,
                token: token
            })

        } else {

            result = false;

            this.setProperties({
                checked: true,
                isAuthenticated: false,
                user: null,
                privateKey: null,
                token: null
            })


        }
        // saves to session
        this.saveToSession();

        // run afterAuthenticated callbacks
        this.callbacks.forEach(function (c) {
            c(this);
        }.bind(this));

        return result;
    },

    saveToSession: function () {
        var email = this.get('user') ? this.get('user').email : null;
        this.session.set('auth', {
            token: this.get('token'),
            email: email,
            user: this.get('user'),
            privateKey: this.get('privateKey')
        });
    },

    loadFromSession: function () {
        return this.session.get('auth');
    },

    deleteFromSession: function () {
        this.session.remove('auth');
    },

    saveToStorage: function (ttl) {
        this.storage.set('auth', {
            email: this.get('user').get('email'),
            privateKey: this.get('privateKey')
        }, ttl);
    },

    loadFromStorage: function () {
        return this.storage.get('auth');
    },

    deleteFromStorage: function () {
        this.storage.remove('auth');
    }

})
;
Service.Auth.reopenClass(Utils.Singleton);
