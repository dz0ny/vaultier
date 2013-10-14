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
    tab: 'AuthLoginSwitch'
});

Vaultier.AuthLoginSwitchController = BaseLoginController.extend();

Vaultier.AuthLoginSwitchView = Ember.View.extend({
    templateName: 'Auth/LoginSwitch',

    didInsertElement: function () {
        this._super(arguments);
        var el = $(this.get('element'));
        var input = el.find('.vlt-login-key').get(0);

        $(el).on('change', function (e) {
            var files = FileAPI.getFiles(e);
            FileAPI.readAsText(files[0], function (evt) {
                if (evt.type == 'load') {
                    // Success
                    var text = evt.result;
                    console.log(text)
                } else if (evt.type == 'progress') {
                    var pr = evt.loaded / evt.total * 100;
                    console.log(pr);
                } else {
                    // Error
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

