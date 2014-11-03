'use strict';

Vaultier.keypressBindings = function () {

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
};
