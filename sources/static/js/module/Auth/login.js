/////////////////////////////////////////////////////////////////
//// Shared classes
/////////////////////////////////////////////////////////////////

var LoginProps = Ember.Object.extend({
    tab: null,
    latestUser: null
});
LoginProps.reopenClass(Utils.Singleton);

var BaseLoginRoute = Ember.Route.extend({
    tab: null,
    renderTemplate: function () {
        var ctrl = this.controllerFor(this.tab);
        ctrl.set('props.tab', this.tab);
        ctrl.set('props.route', this);
        this.render('AuthLogin', {controller: this.step});
        this.render(this.tab, { into: 'AuthLogin', outlet: 'tab'})
    }
});

var BaseLoginController = Ember.Controller.extend({
    props: LoginProps.current(),
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.login', 'Login')
});

Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/Login',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var step = this.controller.get('props.tab');
        var el = this.get('element');
        $(el).find('.vlt-login-tabs li.active').removeClass('active');
        $(el).find('.vlt-login-tabs li.' + step).addClass('active');

    }
});

Vaultier.AuthLoginRoute = BaseLoginRoute.extend({
    redirect: function () {
        if (LoginProps.current().get('latestUser')) {
            this.transitionTo('AuthLoginLatest')
        } else {
            this.transitionTo('AuthLoginSwitch')
        }
    }
});

/////////////////////////////////////////////////////////////////
//// Switch
/////////////////////////////////////////////////////////////////

Vaultier.AuthLoginSwitchRoute = BaseLoginRoute.extend({
    tab: 'AuthLoginSwitch',

    actions: {
        login: function () {
            var ctrl = this.get('controller');

            var auth = Vaultier.Services.Auth.AuthService.current();
            auth.auth({
                email: ctrl.get('email'),
                privateKey: ctrl.privateKey
            }).then(
                    function () {
                        $.notify('You have been successfully logged in.', 'success');
                        ctrl.set('error', false);
                    }.bind(this),
                    function () {
                        $.notify('We are sorry, but your login failed', 'error');
                        ctrl.set('error', true);
                    }.bind(this)
                );


        }
    }

});

Vaultier.AuthLoginSwitchController = BaseLoginController.extend({
    privateKey: null,
    filaneme: null,
    email: null,
    error: false,
    emailSuccess: false,

    validate: function () {
        var validator = LGTM.validator()
            .validates('email')
            .email('email')
            .required('required')
            .validates('privateKey')
            .required('required')
            .build()

        validator
            .validate(this)
            .then(function (result) {
                this.set('isValid', result.valid)
                this.set('emailSuccess', !result.errors.email.length && !this.get('error') )
            }.bind(this));

        return false;
    }.observes('email', 'privateKey', 'error'),

    loginButtonDisabled: function () {
        return !this.get('isValid')
    }.property('isValid')


});

Vaultier.AuthLoginSwitchView = Ember.View.extend({
    templateName: 'Auth/LoginSwitch',

    didInsertElement: function () {
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

Vaultier.AuthLoginLatestRoute = BaseLoginRoute.extend({
    tab: 'AuthLoginLatest'
});

Vaultier.AuthLoginLatestController = BaseLoginController.extend();

Vaultier.AuthLoginLatestView = Ember.View.extend({
    templateName: 'Auth/LoginLatest',
});

