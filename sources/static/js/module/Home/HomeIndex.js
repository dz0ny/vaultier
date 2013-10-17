Vaultier.HomeRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('Home.index');
    }
});

Vaultier.HomeIndexRoute = Ember.Route.extend({
});

Vaultier.HomeIndexController = Ember.ArrayController.extend({
});

Vaultier.HomeIndexView = Ember.View.extend({
    templateName: 'Home/HomeIndex',
    layoutName: 'Layout/LayoutStandard'
});

