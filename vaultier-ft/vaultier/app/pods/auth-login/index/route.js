import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function (ctrl) {


        //   testing
        if (this.get('config.dev_shared_key') ) {
            var auth = this.get('auth');
            var keys = auth.generateKeys();
            var pkey = keys.privateKey;
            ctrl.set('email', this.get('config.dev_email'));
            ctrl.set('privateKey', pkey);
        }
        ctrl.set('registration_enforce', this.get('config.registration_enforce'));
        ctrl.set('registration_allow', this.get('config.registration_allow'));


        //this.get('store')
        //    .find('News')
        //    .then(function(news){
        //        ctrl.set('news', news);
        //    }.bind(this));

        // remembering
        //this.loadRemebered();
    },

    loadRemebered: function () {
        var auth = this.get('auth');
        var user = auth.getRememberedUser();
        var ctrl = this.get('controller');
        if (user) {
            ctrl.set('latestUser', true);
            ctrl.set('email', user.email);
            ctrl.set('privateKey', user.privateKey);
            ctrl.set('ttl', user.ttl);
        } else {
            ctrl.set('latestUser', false);
        }
    },

    actions: {
        switchUser: function () {
            var auth = this.get('auth');
            auth.rememberUser(null);
            this.loadRemebered();
        },

        loginUser: function () {
            //ApplicationKernel.UI.showLoader();

            var ctrl = this.get('controller');
            var email = ctrl.get('email');
            var ttl = ctrl.get('ttl');
            var privateKey = ctrl.get('privateKey');

            var auth = this.get('auth');
            var promise = auth
                .login(email, privateKey, true)
                .then(function (user) {
                    auth.rememberUser(email, privateKey, ttl);
//                    $.notify('You have been successfully logged in.', 'success');
                }.bind(this))
                .catch(function () {
                    auth.rememberUser(null);
                    this.loadRemebered();
                    //ApplicationKernel.UI.hideLoader();
//                    $.notify('We are sorry, but your login failed', 'error');
                }.bind(this)
                );

        }

    }
});

