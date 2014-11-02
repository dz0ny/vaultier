/**************************************************
 **************************************************
 * Ember
 **************************************************
 **************************************************
 */

Ember.FEATURES["query-params"] = true
Ember.MODEL_FACTORY_INJECTIONS = true;

/**************************************************
 **************************************************
 * Application
 **************************************************
 **************************************************
 */

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,

    ready: function () {

        /**************************************************
         **************************************************
         * Initialize config
         **************************************************
         **************************************************
         */
        InitializeConfig(this);


        //@todo: lgtm does not work, was removed temporary
        //LGTM.configure('defer', Ember.RSVP.defer);

        /**************************************************
         **************************************************
         * Notifications
         **************************************************
         **************************************************
         */

        $.notify.defaults({
            className: 'success',
            style: 'bootstrap',
            position: 'bottom center',
            autoHideDelay: 7000,
            css: "vlt-notification"
        })

        /**************************************************
         **************************************************
         * Handlebars
         **************************************************
         **************************************************
         */
        Utils.HandlebarsHelpers.current().register();

        /**************************************************
         **************************************************
         * Cookies
         **************************************************
         **************************************************
         */
        $.cookie.json = true;

        /**************************************************
         **************************************************
         * Tooltips
         **************************************************
         **************************************************
         */

        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        /**************************************************
         **************************************************
         * Sticky footer
         **************************************************
         **************************************************
         */

        setInterval(function () {
            var body = $('body').height();
            var win = $(window).height();
            var footer = $('#vlt-footer').height();
            if (body + footer < win) {
                $('#vlt-footer').css({position: 'fixed'})
            } else {
                $('#vlt-footer').css({position: 'relative'})
            }
        }, 500)

        /**************************************************
         **************************************************
         * Global UI bindings
         **************************************************
         **************************************************
         */

        this.keypressBindings();
        this.registerDI(this);

        //include components
        Vaultier.AnimatedIfView = EmberExt.AnimatedIf.AnimatedIfView;
        Vaultier.AnimatedUnlessView = EmberExt.AnimatedIf.AnimatedUnlessView;
    }
});

Vaultier.runApplication = function() {
    ApplicationLoader.hideLoader(1000);
    this.advanceReadiness();
}


Vaultier.deferReadiness();
