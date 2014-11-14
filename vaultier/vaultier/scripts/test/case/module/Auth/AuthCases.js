/**************************************************
 **************************************************
 * Authentication tests
 **************************************************
 **************************************************
 */


module("Integration Tests", {
    setup: function () {
        // we need to wait for initializers to finish
        wait();
    },
    teardown: function () {
        // we clean up
        Vaultier.reset();
    }

});

test("Login success", function () {
    Ember.run(function () {
        visit("/auth/login");
        //@todo: config retrieval and mocking must be normalized
        var config = Vaultier.Config;
        andThen(function () {
            equal(find(".vlt-dialog.vlt-login h2").text(), 'Login', "Should be on login page");
            fillIn('#login-form-email', 'jan.misek@rclick.cz');
            Vaultier.__container__.lookup('controller:AuthLogin').set('privateKey', config.get('dev_shared_key_private'));
            click('.vlt-login .btn-primary');
        });
        andThen(function () {
            equal(find('.vlt-security-box.dropdown').length, 1, "Authenticated user box should exists, user is authenticated");

        })

    });
});
