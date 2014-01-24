Vaultier.AuthLoginController = Ember.Controller.extend({
    latestUser: null,
    rememberOptions: [
        {ttl: 0, text: 'Do not remember'},
        {ttl: 24 * 3600 * 1000, text: 'Remember for one day'},
        {ttl: 7 * 24 * 3600 * 1000, text: 'Remember for one week'},
        {ttl: 31 * 24 * 3600 * 1000, text: 'Remember for one month'},
        {ttl: 365 * 24 * 3600 * 1000, text: 'Remember for one year'}
    ]
});

Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/AuthLogin',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var el = $(this.get('element'));
        var input = el.find('.vlt-login-key');
        var controller = this.controller;

        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsText(files[0], function (evt) {
                if (evt.type == 'load') {
                    // Success
                    controller.set('privateKey', evt.result);
                    controller.set('filename', files[0].name);
                }
            })
        })
    }
});

Vaultier.AuthLoginRoute = Ember.Route.extend({
    setupController: function (ctrl) {
        //   testing
        if (this.get('config.FT_FEATURES.dev_shared_key')) {
            var auth = this.get('auth');
            var keys = auth.generateKeys();
            var pkey = keys.privateKey
            ctrl.set('email', 'jan.misek@rclick.cz');
            ctrl.set('privateKey', pkey)
        }

        // remembering
        this.loadRemebered();
    },

    loadRemebered: function () {
        var auth = this.get('auth');
        var user = auth.getRememberedUser();
        var ctrl = this.get('controller');
        if (user) {
            ctrl.set('latestUser', true)
            ctrl.set('email', user.email);
            ctrl.set('privateKey', user.privateKey);
            ctrl.set('ttl', user.ttl);
        } else {
            ctrl.set('latestUser', false)
        }
    },

    actions: {
        switchUser: function () {
            var auth = this.get('auth');
            auth.rememberUser(null);
            this.loadRemebered();
        },

        loginUser: function () {
            var ctrl = this.get('controller');
            var email = ctrl.get('email');
            var ttl = ctrl.get('ttl');
            var privateKey = ctrl.get('privateKey');

            var auth = this.get('auth');
            var promise = auth
                .login(email, privateKey, true)
                .then(
                    function (user) {
                        auth.rememberUser(email, privateKey, ttl)
                        $.notify('You have been successfully logged in.', 'success');
                    }.bind(this),
                    function () {
                        auth.rememberUser(null)
                        this.loadRemebered();
                        $.notify('We are sorry, but your login failed', 'error');
                    }.bind(this)
                );
            ApplicationLoader.promise(promise)
        }

    }
});

