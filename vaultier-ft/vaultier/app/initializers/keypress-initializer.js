/*global $, keypress */

/**
 * Global keypress bindings to setup here
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * @class Vaultier.initializers.Keypress
 *
 */
export default {
    name: 'vaultier-keypress',
    after: 'vaultier-boot',

    initialize: function (container, app) {

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

        $(document).on('ApplicationKernel.UI.LoaderShown', function (event) {
            setKeypressBindings();
        });
        $(document).on('ApplicationKernel.UI.LoaderHidden', function (event) {
            unsetKeypressBindings();
        });

        setKeypressBindings();

    }
};

