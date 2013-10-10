Vaultier.AuthLoginRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('AuthLogin');
    }
});

//will prepare layout mixins which will extend controller to optionalize layout
Vaultier.AuthLoginController = Ember.ObjectController.extend({
    breadcrumbs: Vaultier.utils.Breadcrumbs.create()
        .addLink('Auth.login', 'Login')
})


Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/Login',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.VaultListController
});

