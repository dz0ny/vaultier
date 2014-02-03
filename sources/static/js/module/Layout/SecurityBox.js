Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {
        logout: function () {
            ApplicationLoader.showLoader();
            var auth = this.get('controller.auth');
            auth.logout();
        }
    },

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.copy-token');
        el.click(function (e) {
            e.preventDefault();
            window.prompt("token", el.attr('href'));
        })

    }

});

Vaultier.LayoutSecurityBoxController = Ember.Controller.extend({
    showToken: function () {
        return this.get('config.FT_FEATURES.dev_show_token')
    }.property('showToken')
});
