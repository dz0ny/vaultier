Vaultier.Router.reopen({
    rootURL: '/core/'
});

Vaultier.Router.map(function () {

    this.resource('vaults', { path: '/' });
});

Vaultier.VaultsRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this.render('vaults');
    }
});

Vaultier.VaultsRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('vault');
    }
});
