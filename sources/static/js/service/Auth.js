Po.NS('Service');

Service.Auth = Ember.Object.extend({

    init: function () {
        this._super(arguments);
        this.promises = Service.AuthPromises.create({
            store: this.store,
            coder: this.coder
        })

    },

    /**
     * @DI store:main
     */
    store: null,

    /**
     * @DI service:coder
     */
    coder: null,

    /**
     * @DI router:main
     */
    router: null,

    /**
     * @DI service:session
     */
    session: null,
    callbacks: [],
    token: null,

    /**
     * Current authenticated user model
     */
    user: null,
    checked: false,
    privateKey: null,

    /**
     * Transition to be retried after successfull login
     */
    transition: null,

    isAuthenticated: function () {
        return this.get('user.id') !== null
    }.property('user'),

    isChecked: function () {
        return this.get('checked') == true
    }.property('user', 'checked'),

    generateKeys: function (callback) {
        var coder = this.get('coder');
        return this.coder.generateKeys(callback);
    },


    checkPermissions: function (transition, check, noPromise) {
        var fn = function (model) {
            var result = false;
            try {
                result = check(model)
            } catch (e) {
                console.error(e.stack)
            }

            if (!result) {
                var e = new Error('Missing client permission');
                e.status = 403
                throw e
            }
            return result
        }.bind(this)

        if (noPromise) {
            return fn()
        } else {
            return fn
        }

    },


    /**
     * Logs in user promise
     *
     * if success promise returns Vaultier.User model
     * if error promise returns null
     *
     * @param email
     * @param privateKey
     * @param bool transitionAfterLogin
     * @returns {Ember.RSVP.Promise}
     */
    login: function (email, privateKey, transitionAfterLogin) {
        return this.promises.login(email, privateKey)
            .then(
                // successfull login
                function (user) {
                    // save credentials
                    this.setAuthenticatedUser(user, privateKey, this.promises.get('token'))

                    // transition to previously requested page
                    if (transitionAfterLogin) {
                        var transition = this.get('transition');
                        if (transition) {
                            transition.retry()
                        } else {
                            this.get('router').transitionTo('index')
                        }
                    }

                    return user
                }.bind(this),

                // unsuccessfull login
                function () {
                    this.setAuthenticatedUser(null)
                    return Ember.RSVP.reject()
                }.bind(this))
    },

    /**
     * Used to reload user by token from server
     * returns true or false - user token is valid / user token is invalid
     * @returns {Ember.RSVP.Promise}
     */
    reload: function () {
        var session = this.loadFromSession() || {};
        var sessionUser = session.user || null
        var sessionPrivateKey = session.privateKey || null;
        var sessionToken = session.token || null;

        return this.promises.user(sessionUser, sessionToken)
            .then(
                //success
                function (user) {
                    return this.setAuthenticatedUser(
                        user,
                        sessionPrivateKey,
                        sessionToken
                    )
                }.bind(this),
                //fail
                function () {
                    return this.setAuthenticatedUser(null)
                }.bind(this))
    },


    logout: function () {
        return this.promises.logout()
            .then(function () {
                this.setAuthenticatedUser(null);
            }.bind(this))
    },

    /**
     * Checks if user is authenticated
     * if not redirects to login and store transition to be retried after succesfull login
     * @param {Transition} transition
     */
    checkAuthenticatedOrLogin: function (transition) {
        if (!this.get('isAuthenticated')) {
            // abort transition
            $.notify('You do not have access to secured area. Please login', 'error');
            transition.abort();

            // store transition
            this.set('transition', transition)

            //redirect to login
            this.get('router').transitionTo('AuthLogin');
            return false;
        }
        return true;
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
        this.session.set('auth', {
            token: this.get('token'),
            email: this.get('user.email'),
            user: this.get('user.id'),
            privateKey: this.get('privateKey')
        });
    },

    loadFromSession: function () {
        return this.session.get('auth');
    },

    deleteFromSession: function () {
        this.session.remove('auth');
    }

//    @todo saving credentials
//    saveToStorage: function (ttl) {
//        this.storage.set('auth', {
//            email: this.get('user').get('email'),
//            privateKey: this.get('privateKey')
//        }, ttl);
//    },
//
//    loadFromStorage: function () {
//        return this.storage.get('auth');
//    },
//
//    deleteFromStorage: function () {
//        this.storage.remove('auth');
//    }

})
;
