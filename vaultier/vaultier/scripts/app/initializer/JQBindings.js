/**
 * @module vaultier-initializer
 */

ApplicationKernel.namespace('Vaultier.initializers');

/**
 * Setup all jquery dom bindings here
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * @class Vaultier.initializers.JQBindings
 *
 */
Vaultier.initializers.JQBindings = {
    name: 'vaultier-jqbindings',
    after: 'vaultier-boot',

    initialize: function (container, app) {

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


    }
}

Vaultier.initializer(Vaultier.initializers.JQBindings);

