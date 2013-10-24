LGTM.configure('defer', Ember.RSVP.defer);

$.notify.defaults({
    className: 'success',
    style: 'bootstrap',
    position: 'top center'
})

Ember.FEATURES["query-params"] = true

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true
});

Utils.HandlebarsHelpers.create().register();


$.cookie.json = true;


Po.NS('Vaultier.config');
Vaultier.config.authPersistTTL = 0; // one day


Ember.RSVP.configure('onerror', function (error) {
    console.error(error.message);
    console.error(error.stack);
});


Vaultier.Store = DS.Store.extend({

    loadMore: function (type, query) {
        query = typeof query == 'object' ? query : {};
        return this._super(type, query);
    },

    loadOne: function (type, id) {
        type = this.modelFor(type);
        var record = this.recordForId(type, id);
        if (record.currentState.stateName != 'root.empty' && reload) {
            return record.reload()
        } else {
            return this.findById(type, id);
        }
    }
});

Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    urls: {
        AuthenticatedUser: '/api/auth/user'
    },

    ajaxError: function (error) {
        var superError = this._super(error);
        superError.status = error.status;
        return superError;
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

