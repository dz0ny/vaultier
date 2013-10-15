LGTM.configure('defer', Ember.RSVP.defer);

$.notify.defaults({
    className: 'success',
    style: 'bootstrap',
    position: 'top center',
})

Ember.FEATURES["query-params"] = true

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true
});

$.cookie.json = true;


Po.NS('Vaultier.config');
Vaultier.config.authPersistTTL = 0; // one day


Ember.RSVP.configure('onerror', function(error) {
    console.error(error.message);
    console.error(error.stack);
});

Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    urls: {
        AuthenticatedUser: '/api/auth/user'
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
            return this._super(type, id)
        }
    },
    namespace: 'api'
});

