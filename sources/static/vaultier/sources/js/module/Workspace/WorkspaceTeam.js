Vaultier.WorkspaceTeamRoute = Ember.Route.extend(
    Vaultier.WorkspaceKeysMixin,
    {

        beforeModel: function() {
            this.checkWorkspaceKeys();
        },

        model: function (params, transition) {
        },

        setupController: function (ctrl, model) {
        },

        actions: {
        }
    });

Vaultier.WorkspaceTeamController = Ember.Controller.extend({
});

Vaultier.WorkspaceTeamView = Ember.View.extend({
    templateName: 'Workspace/WorkspaceTeam',
    layoutName: 'Layout/LayoutStandard'
});
