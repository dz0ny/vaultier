Po.NS('Vaultier.Layout');

Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {
        logout: function () {
            var auth = Vaultier.Services.Auth.AuthService.current();
            auth.logout().then(function () {
                $.notify('You have been successfully logged out.', 'success');
                var ctrl = this.get('controller');
                ctrl.transitionToRoute('index');
            }.bind(this));
        }
    }
});

Vaultier.LayoutSecurityBoxController = Ember.Controller.extend({

    auth: null,

    init: function () {
        this._super(arguments);
        this.auth = Vaultier.Services.Auth.AuthService.current();
    }

});
