Po.NS('Vaultier.Services.Context');

Vaultier.Services.Context.ContextService = Ember.Object.extend({

    route: null,
    params: {},
    queryParams: {},

    workspace: null,
    vault: null,

    executeRoute: function (route, params, queryParams) {
        this.route = route;
        this.params = params || {};
        this.queryParams = queryParams || {};

        var promises = {};

        return Ember.RSVP.hash({
            workspace: this.reloadWorkspace(),
            vault: this.reloadVault()

        });
    },

    reloadVault: function () {
        // todo same as workspace
    },

    reloadWorkspace: function () {
        if (this.params.workspace) {
            return this.route.get('store').find('Workspace', this.params.workspace).then(function(workspace) {
                this.set('workspace', workspace)
            }.bind(this))
        }
    }


});
Vaultier.Services.Context.ContextService.reopenClass(Utils.Singleton);