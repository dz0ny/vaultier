Po.NS('Vaultier.utils');

Vaultier.utils.Breadcrumbs = Ember.Object.extend({
    init: function () {
        this._super();
        this.items = [];
        this.addLink('index', 'Home')
    },

    items: null,

    addLink: function (link, title, params) {
        this.items.forEach(function (item) {
            delete item.last
        });
        this.items.push({
            link: link,
            params: params || {},
            title: title,
            last: true
        })
        return this;
    },

    addCurrentWorkspace: function () {
        var workspace = Vaultier.Services.Context.ContextService.current().get('workspace');
        if (workspace) {
            this.addLink('VaultIndex', workspace.get('name'), {workspace: workspace.get('id')})
        }
        return this;
    }

})