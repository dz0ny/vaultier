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

Utils.HandlebarsHelpers.current().register();


$.cookie.json = true;


Po.NS('Vaultier.config');
Vaultier.config.authPersistTTL = 0; // one day


Ember.RSVP.configure('onerror', function (error) {
    console.error(error.message);
    console.error(error.stack);
});


