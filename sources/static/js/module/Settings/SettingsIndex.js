Vaultier.SettingsRoute = Ember.Route.extend({

})

Vaultier.SettingsView = Ember.View.extend({

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var path = this.get('parentView.controller.controllers.application.currentPath');
            var route = path.split('.')[path.split('.').length - 1];
            return tab == route;
        }.property('parentView.controller.controllers.application.currentPath')
    }),

    templateName: 'Settings/SettingsIndex',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.SettingsController = Ember.Controller.extend({
        needs: ['application']
})

Vaultier.SettingsIndexRoute = Ember.Route.extend({

    beforeModel: function(transition) {
            transition.abort()
            this.transitionTo('Settings.personal');
    }
})
