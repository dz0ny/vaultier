Vaultier.AuthRegisterRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('AuthRegister');
    }
});

Vaultier.AuthRegisterController = Ember.ObjectController.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.register', 'Register')
})


Vaultier.AuthRegisterView = Ember.View.extend({
    templateName: 'Auth/Register',
    layoutName: 'Layout/LayoutStandard'
});

