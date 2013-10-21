Vaultier.Breadcrumbs = Ember.Object.extend({

    items: null,

    normalize: function (params) {
//        var environment = Vaultier.Services.Context.ContextService.current();
//        if (params.workspace == '_env') {
//            params.workspace = environment.workspace.id;
//        }
        return params;
    },

    addLink: function (link, title, params) {
        this.items = this.items || [];
        this.items.forEach(function (item) {
            delete item.last
        });
        if (link) {
            try {
                if (params) {
                    params = this.normalize(params);
                    link = this.router.generate(link, [params])
                } else {
                    link = this.router.generate(link)
                }
            } catch (e) {
                console.error(e.message);
                console.error('Breadcrumbs error during generate route (' + route + ')');
            }
        }

        this.items.push({
            link: link,
            title: title,
            last: true
        })
        return this;
    },

    addText : function(text) {
        this.addLink(null, text);
        return this;
    },

    addHome: function () {
        this.addLink('index', 'Home');
        return this;
    },

    addVault: function () {
        var vault = Service.Environment.current().vault;
        if (vault) {
            this.addLink('Card.index', vault.get('name'), [vault.get('id')])
        }
        return this;
    },

    addCard: function () {
        var card = Service.Environment.current().card;
        if (card) {
            this.addLink('Secret.index', card.get('name'), [card.get('id')])
        }
        return this;
    },


    addWorkspace: function () {
        var workspace = Service.Environment.current().workspace;
        if (workspace) {
            this.addLink('Vault.index', workspace.get('name'), [workspace.get('id')])
        }
        return this;
    }

})

