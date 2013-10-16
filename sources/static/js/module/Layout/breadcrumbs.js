Po.NS('Vaultier.utils');

Vaultier.utils.Breadcrumbs = Ember.Object.extend({

    items: null,

    normalize: function (params) {
        var environment = Vaultier.Services.Context.ContextService.current();
        if (params.workspace == '_env') {
            params.workspace = environment.workspace.id;
        }
        return params;
    },

    addLink: function (link, title, params) {
        this.items = this.items || [];
        this.items.forEach(function (item) {
            delete item.last
        });
        try {
            if (params) {
                params = this.normalize(params);
                link = this.router.generate(link, params)
            } else {
                link = this.router.generate(link)
            }
        } catch (e) {
            console.error(e.message);
            console.error('Breadcrumbs error during generate route ('+route+')');
        }

        this.items.push({
            link: link,
            title: title,
            last: true
        })
        return this;
    },

    addHome: function () {
//        this.addLink('index', 'Home');
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

