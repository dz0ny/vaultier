Vaultier.LayoutSecurityBoxView = Ember.View.extend({
    tagName: 'span',
    templateName: 'Layout/SecurityBox',

    actions: {


        logout: function () {
            var auth = this.get('controller.auth');
            auth.logout().then(function () {
                $.notify('You have been successfully logged out.', 'success');
                var ctrl = this.get('controller');
                ctrl.transitionToRoute('index');
//                window.location.href = "/";
            }.bind(this));
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
    showToken: VaultierConfig.get('FT_FEATURES.dev_show_token')
});
