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


        LGTM.configure('defer', Ember.RSVP.defer);

        /**************************************************
         **************************************************
         * Notifications
         **************************************************
         **************************************************
         */

        $.notify.defaults({
            className: 'success',
            style: 'bootstrap',
            position: 'bottom center'
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
         * Tooltiops
         **************************************************
         **************************************************
         */

        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });

        /**************************************************
         **************************************************
         * Global UI bindings
         **************************************************
         **************************************************
         */

        // instead css overflow-y:scroll
//        var minHeight = function () {
//            $('html').css('height', $(window).height()+1);
//        }
//        $(window).resize(minHeight());
//        minHeight();

        var keypressBindings = [
            {
                "keys": "alt s",
                "is_exclusive": true,
                "on_keydown": function () {
                    var $searchbox = $('.vlt-search-box select');
                    if ($searchbox.length) {
                        $searchbox[0].selectize.focus();
                    }

                    return false;
                },
                "on_keyup": function (e) {
                    //pass
                },
                "this": window
            }
        ];
        var setKeypressBindings = function () {
            keypress.register_many(keypressBindings);
        };

        var unsetKeypressBindings = function () {
            keypress.unregister_many(keypressBindings);
        };

        $(document).on('ApplicationLoaderShow', function (event) {
            setKeypressBindings();
        });
        $(document).on('ApplicationLoaderHide', function (event) {
            unsetKeypressBindings();
        });

        setKeypressBindings();

        this.registerDI(this);

    }
});
Vaultier.deferReadiness();
