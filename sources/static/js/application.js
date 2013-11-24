LGTM.configure('defer', Ember.RSVP.defer);

$.notify.defaults({
    className: 'success',
    style: 'bootstrap',
    position: 'top center'
})

Ember.FEATURES["query-params"] = true

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true,

    ready: function() {
        // Coder service
        this.register('service:coder', Service.Coder)

        // Members service
        this.register('service:members', Service.Members)
        this.inject('service:members', 'store', 'store:main');
        this.inject('service:members', 'coder', 'service:coder')
        this.inject('route:Workspace',  'members', 'service:members' )
        this.inject('route:WorkspaceMemberApprove',  'members', 'service:members' )

    }

});

Utils.HandlebarsHelpers.current().register();


$.cookie.json = true;


Po.NS('Vaultier.config');
Vaultier.config.authPersistTTL = 0; // one day


/**************************************************
 **************************************************
 * Global UI bindings
 **************************************************
 **************************************************
 */

$(document).ready(function () {
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });
})



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
    _defaultErrorHandler: function (error, transition) {
        this._super(error, transition)
        console.log(error.stack)
    }
})

Ember.onerror = function (error) {
    console.error(error.message);
    console.log(error.stack);
}

