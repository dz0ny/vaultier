Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
        },

        actions: {
        }

    });

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});