Vaultier.SecretCreateRoute = Ember.Route.extend({


    renderTemplate: function () {
        this.render('SecretCreate');
    }

});

Vaultier.SecretCreateView = Ember.View.extend({
    templateName: 'Secret/SecretCreate',
    layoutName: 'Layout/LayoutStandard',

    TabView: Ember.View.extend({
        classNameBindings: 'isActive:active'.w(),
        tagName: 'li',
        isActive: function () {
            var tab = this.get('tab');
            var target = this.get('parentView.controller.target');
            var route = target.router.currentHandlerInfos[target.router.currentHandlerInfos.length - 1].name;
            return tab === route;
        }.property('item').cacheable()
    })

});
