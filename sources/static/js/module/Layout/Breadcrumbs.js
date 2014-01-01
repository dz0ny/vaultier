Vaultier.Breadcrumbs = Ember.Object.extend({

    items: null,


    addLink: function (link, title, params, icon) {
        this.items = this.items || [];
        this.items.forEach(function (item) {
            delete item.last
        });
        if (link) {
            try {
                if (params) {
                    args = [link, params]
                } else {
                    args = [link]
                }
                link = this.router.generate.apply(this.router, args)
            } catch (e) {
                console.error(e.message);
                console.error('Breadcrumbs error during generate route (' + link + ')');
            }
        }

        this.items.push({
            link: link,
            title: title,
            icon: icon,
            last: true
        })
        return this;
    },

    addText: function (text) {
        this.addLink(null, text);
        return this;
    },

    addHome: function () {
        // disabled for better user experience
        // this.addLink('index', 'Home');
        return this;
    },

    addVault: function () {
        var vault = Service.Environment.current().vault;
        if (vault) {
            this.addLink('Vault.index', vault.get('name'), vault,'/static/images/icon-vault-grey.png')
        }
        return this;
    },

    addCard: function () {
        var card = Service.Environment.current().card;
        if (card) {
            this.addLink('Card.index', card.get('name'), card,'/static/images/icon-card-grey.png')
        }
        return this;
    },


    addWorkspace: function () {
        var workspace = Service.Environment.current().workspace;
        if (workspace) {
            this.addLink('Workspace.index', workspace.get('name'), workspace, '/static/images/icon-workspace-grey.png')
        }
        return this;
    }

})

