Vaultier.HomeRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('Home.index');
    }
});

Vaultier.HomeIndexRoute = Ember.Route.extend({

        model: function() {
            return new Ember.RSVP.Promise(function(resolve) {
                console.log('resolved');
                resolve();
            })
        },
});

Vaultier.HomeIndexController = Ember.ArrayController.extend({
});

Vaultier.HomeIndexView = Ember.View.extend({
    templateName: 'Home/HomeIndex',
    layoutName: 'Layout/LayoutStandard'
});

