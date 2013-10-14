Ember.FEATURES["query-params"] = true

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true
});

Ember.RSVP.configure('onerror', function(error) {
    console.error(error.message);
    console.error(error.stack);
});

Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    urls: {
        'AuthenticatedUser': '/api/auth/user'
    },
    buildURL: function (type, id) {
        if (this.urls[type]) {
            url = this.urls[type];
            if (id) {
                if (url.charAt(url.length - 1) !== '/') {
                    url += '/';
                }
                url = url + id;
            }
            return url;
        } else {
            return this._super(arguments)
        }
    },
    namespace: 'api'
});

