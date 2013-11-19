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


/**************************************************
 **************************************************
 * Stack trace logging
 **************************************************
 **************************************************
 */

Ember.RSVP.configure('onerror', function (error) {
    console.error(error.message);
    console.error(error.stack);
});

Ember.Router.reopenClass({
      _defaultErrorHandler: function(error, transition) {
            this._super(error, transition)
          console.log(error.stack)
  }
})

Ember.onerror = function(error) {
    console.error(error.message);
    console.log(error.stack);
}
