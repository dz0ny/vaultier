Vaultier.AuthLoginRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('AuthLogin');
    }
});

//will prepare layout mixins which will extend controller to optionalize layout
Vaultier.AuthLoginController = Ember.ObjectController.extend({
    breadcrumbs: {
        items: [
            {title: 'Home', link: 'Vault.index'},
            {title: 'Login', link: 'Auth.login', last: true}
        ]
    }
})


Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/Login',
    layoutName: 'Layout/LayoutWindow'
//    controller: Vaultier.VaultListController
});

