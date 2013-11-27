Ember.FEATURES["query-params"] = true
Ember.MODEL_FACTORY_INJECTIONS = true;

/**************************************************
 **************************************************
 * Application boostrap
 **************************************************
 **************************************************
 */

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true,

    ready: function () {
        LGTM.configure('defer', Ember.RSVP.defer);

        $.notify.defaults({
            className: 'success',
            style: 'bootstrap',
            position: 'top center'
        })

        Utils.HandlebarsHelpers.current().register();

        $.cookie.json = true;

        this.registerDI(this)

    }
});

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


