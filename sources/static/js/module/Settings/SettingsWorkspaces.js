Vaultier.SettingsWorkspacesRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsWorkspaces', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
        },

        actions: {
        }

    });


Vaultier.SettingsWorkspacesView = Ember.View.extend({
    templateName: 'Settings/SettingsWorkspaces'
});