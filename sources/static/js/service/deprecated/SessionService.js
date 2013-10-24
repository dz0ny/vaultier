Po.NS('Vaultier.Services.Auth');

Vaultier.Services.Auth.SessionService = Ember.CoreObject.extend({

    prefix: 'vaultier.',

    set: function (key, value, options) {
        $.cookie(this.prefix + key, value, options);
    },

    get: function (key) {
        return $.cookie(this.prefix + key);
    },

    remove: function (key) {
        return $.removeCookie(this.prefix + key)
    },

    getAuth: function () {
        var session = this.get('auth');
        if (session && session.user && session.key) {
            return session
        } else {
            return false;
        }
    },

    setAuth: function (user, key) {
        if (user && key) {
            this.set('auth', {user: user, key: key}, { path: '/' });
        } else {
            this.remove('auth');
        }
    },

    getPersistAuth: function () {
        var session = this.get('persist-auth');
        if (session && session.user && session.key) {
            return session
        } else {
            return false;
        }
    },

    setPersistAuth: function (user, key, ttl) {
            var ttl = ttl || Vaultier.config.authPersistTTL;
            this.set('persist-auth', {user: user, key: key, ttl: ttl}, { path: '/', expires: ttl});
    },

    clearPersistAuth: function() {
        this.remove('persist-auth');
    },

    getKeyOfUser: function (user) {
        var auth = this.getAuth();
        if (user && auth && auth.user == user && auth.key) {
            return auth.key
        } else {
            return null
        }
    }

});
Vaultier.Services.Auth.SessionService.reopenClass(Utils.Singleton);