/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////

var LoginProps = Ember.Object.extend({
    init: function () {
        this._super(arguments);
        var session = Service.Session.current();
        //this.set('latestUser', session.getPersistAuth());
    },
    rememberOptions: [
        {ttl: 0, text: 'Do not remember'},
        {ttl: 1, text: 'Remember for one day'},
        {ttl: 7, text: 'Remember for one week'},
        {ttl: 30, text: 'Remember for one month'},
        {ttl: 365, text: 'Remember for one year'},
    ],
    latestUser: null
});
LoginProps.reopenClass(Utils.Singleton);

var selectTab = function () {
    var step = this.controller.get('tab');
    var el = Ember.$('body');
    $(el).find('.vlt-login-tabs li.active').removeClass('active');
    $(el).find('.vlt-login-tabs li.' + step).addClass('active');
}

Vaultier.AuthLoginIndexController = Ember.Controller.extend({
    props: LoginProps.current()
});

Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/AuthLogin',
    layoutName: 'Layout/LayoutStandard',
});

Vaultier.AuthLoginIndexRoute = Ember.Route.extend({
    redirect: function () {
        if (LoginProps.current().get('latestUser')) {
            this.transitionTo('AuthLogin.latest')
        } else {
            this.transitionTo('AuthLogin.switch')
        }
    }
});


/////////////////////////////////////////////////////////////////
//// Switch
/////////////////////////////////////////////////////////////////

Vaultier.AuthLoginSwitchRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('AuthLoginSwitch', {outlet: 'AuthLogin'})
        },

        setupController: function(ctrl) {
            ctrl.set('email', 'j@j.cz');
            ctrl.set('privateKey', '-----BEGIN RSA PRIVATE KEY-----'
+'MIICWgIBAAKBgGcpfqrh++lSMRIaqhveIcDMwMklT+y2w6iIO5aJitEPXkT/XkwH'
+'bmfNOTA982ndTh7bEntnAKV0hAJYn8iLjLOGbBLA+lJKSZB8g0CEh2Rqkaf1aAyj'
+'Iqt7huYcGdjSCOdQb2FICYB15FF6IFxBU5rwqcq3nIjDnitQRujzod6NAgMBAAEC'
+'gYAZbS/MPIDThC+WD75nuftFwvGtYiXt6SoWauWM9/+gAZKxnOOIB7jdmsaCrnJF'
+'YId1sXc/tSaCoVI8Jc3UJxkZgXuXn6gu9xdpywtB7J+i3Lp+XengQM0Sy2C75S65'
+'rDaaMqirFYTtSvyIauaqhIgRujAVTvXh3z/HPs4/R5eK/QJBAL0VGj//kYh7oCdl'
+'3AvMIxHNCHs2o03FiP5iwtKjbCuT7wuI2E3HGexCVndk1O9q8eGPYrk1l8KMzEDd'
+'Xg6M/a8CQQCLq/73Tpzzd61x3PQDTSoLMzpPagkLG9BW07v888m2miTMlMr3sRbO'
+'MiW/P55oc63LKfIYsRE41AetrtSj5lKDAkAQrczb+lpHFMii0QxhCgfJ6TEnVUGA'
+'eb1E20deN0YybeE3PkH+UmLKAWwJKh7SY7ekcvZ9aenSIoNd8Wj7lZpHAkB2jLRK'
+'oNUi6a+z94C91J8dBow1n6CxZxg8ulbTavEJJmiZpKlp90uOFI5pd8wyiA05Zg7w'
+'2knt3DnwN3aQ7wuVAkAFtkrckXd/O2RK9L4Ksp7oBE4vULB8lvnXcx8N4E3OyPRP'
+'MkHV8DG6BLWpz7vlPR3DkTWrCSp7lURhkqIztiau'
+'-----END RSA PRIVATE KEY-----')
        },

        actions: {
            login: function () {
                var ctrl = this.get('controller');
                var auth = Service.Auth.current();
                auth.login(ctrl.get('email'), ctrl.get('privateKey')).then(
                    function () {
                        $.notify('You have been successfully logged in.', 'success');
                        this.transitionTo('index');
                    }.bind(this),
                    function () {
                        $.notify('We are sorry, but your login failed', 'error');
                        this.get('controller').set('props.latestUser', null);
                    }.bind(this)
                );
            }
        }

    });

Vaultier.AuthLoginSwitchController = Ember.Controller.extend({
    tab: 'AuthLoginSwitch',
    privateKey: null,
    filaneme: null,
    email: null,
    error: false,
    emailSuccess: false,
    props: LoginProps.current(),

    validate: function () {
        var validator = LGTM.validator()
            .validates('email')
            .email('Not an email')
            .required('Required field')

            .validates('privateKey')
            .required('Required field')

            .build()

        validator
            .validate(this)
            .then(function (result) {
                this.set('isValid', result.valid)
                this.set('emailSuccess', !result.errors.email.length && !this.get('error'))
            }.bind(this));

        return false;
    }.observes('email', 'privateKey', 'error'),

    loginButtonDisabled: function () {
        return !this.get('isValid')
    }.property('isValid')


});

Vaultier.AuthLoginSwitchView = Ember.View.extend({
    templateName: 'Auth/AuthLoginSwitch',

    didInsertElement: function () {
        selectTab.call(this);

        this._super(arguments);
        var el = $(this.get('element'));
        var input = el.find('.vlt-login-key').get(0);
        var controller = this.controller;

        $(el).on('change', function (e) {

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

/////////////////////////////////////////////////////////////////
//// Latest
/////////////////////////////////////////////////////////////////

Vaultier.AuthLoginLatestRoute = Ember.Route.extend({
    tab: 'AuthLoginLatest',

    renderTemplate: function () {
        this.render('AuthLoginLatest', {outlet: 'AuthLogin'})
    },

    actions: {
        login: function () {
            var ctrl = this.get('controller');
            var latestUser = ctrl.get('props.latestUser');

            var auth = Service.Auth.current();
            auth.auth({
                persist: true,
                persistTTL: latestUser.ttl,
                email: latestUser.user,
                privateKey: latestUser.key
            }).then(
                    function () {
                        $.notify('You have been successfully logged in.', 'success');
                        this.transitionTo('index');
                    }.bind(this),
                    function () {
                        $.notify('We are sorry, but your login failed', 'error');
                        ctrl.set('error', true);
                    }.bind(this)
                );
        }
    }
});

Vaultier.AuthLoginLatestController = Ember.Controller.extend({
    tab: 'AuthLoginLatest',
    props: LoginProps.current()
});

Vaultier.AuthLoginLatestView = Ember.View.extend({
    didInsertElement: selectTab,
    templateName: 'Auth/AuthLoginLatest',
});

