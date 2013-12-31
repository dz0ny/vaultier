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
    // LOG_TRANSITIONS_INTERNAL: true,

    ready: function () {
        LGTM.configure('defer', Ember.RSVP.defer);

        $.notify.defaults({
            className: 'success',
            style: 'bootstrap',
            position: 'bottom center'
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

var keypressBindings = [
    {
        "keys"          : "alt s",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
            $('.vlt-search-box select')[0].selectize.focus()
            return false;
        },
        "on_keyup"      : function(e) {
            //pass
        },
        "this"          : window
    }
];
keypress.register_many(keypressBindings);


$(document).ready(function () {
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });
})


