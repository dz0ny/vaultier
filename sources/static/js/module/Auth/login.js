Vaultier.AuthLoginRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('AuthLogin');
    }
});

Vaultier.AuthLoginView = Ember.View.extend({
    templateName: 'Auth/Login',
    layoutName: 'Layout/Layout'
//    controller: Vaultier.VaultListController
});

