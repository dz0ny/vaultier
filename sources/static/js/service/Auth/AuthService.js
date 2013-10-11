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

    isAuthenticated: function () {
        return this.get('user.id') !== null
    }.property('user'),

    isChecked: function () {
        return this.get('checked') == true
    }.property('user', 'checked'),

    auth: function (props) {

        var promise = Ember.RSVP.Promise(function (resolve, reject) {
            // ecxchange for jquery call
            Ember.run.later(promise, function () {
                resolve(
                    {
                        id: 1,
                        nickname: 'misan',
                        email: 'jan.misek@rclick.cz',
                        public_key: 'ppk'
                    }
                );
            }, 100);
        });

        promise.then(
            // when authenticated
            function (user) {
                this._afterAuthenticate(user)
            }.bind(this),

            // when not authenticated
            function (error) {
                this._afterAuthenticate(null)
            }.bind(this)
        );


        return promise;
    },

    logout: function () {

    },

    didAuthenticate: function (callback) {
        this.callbacks.push(callback);
        callback(this.status);
    },

    _afterAuthenticate: function (user) {
        //@todo: clear store for previous users

        // is user, creates AutheticatedUser record
        if (user) {
            user = this.store.push('AuthenticatedUser', user);
        }

        // set status
        this.set('user', user);
        this.set('checked', true)

        // run didAuthenticate callbacks
        this.callbacks.forEach(function (c) {
            c(this);
        }.bind(this));
    }

});
Vaultier.Services.Auth.AuthService.reopenClass(Utils.Singleton);
