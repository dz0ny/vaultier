Vaultier.Breadcrumbs = Ember.Object.extend({

    items: null,
    environment: null,

    addLink: function (link, title, params, icon) {
        this.items = this.items || [];
        this.items.forEach(function (item) {
            delete item.last
        });
        if (link) {
            try {
                if (params) {
                    args = [link, params];
                } else {
                    args = [link];
                }
                link = this.router.generate.apply(this.router, args);
            } catch (e) {
                console.error(e.message);
                console.error('Breadcrumbs error during generate route (' + link + ')');
            }
        }

        title = Utils.HandlebarsHelpers.current().ellipsis(title, 25);

        if (!icon) {
            icon = '/static/vaultier/images/icon-wrench-grey.png';
        }

        this.items.push({
            link: link,
            title: title,
            icon: icon,
            last: true
        });
        return this;
    },

    addText: function (text, icon) {
        this.addLink(null, text, null, icon);
        return this;
    },

    addHome: function () {
        // disabled for better user experience
        // this.addLink('index', 'Home');
        return this;
    },

    addSettings: function() {
         //return this.addLink('Settings.index', 'Settings')
        return this
    },

    addCollaboratorsIndex: function(route) {
        return this.addLink(route, 'Collaborators', null, '/static/vaultier/images/icon-user-grey.png')
    },

    addCollaboratorsInvite : function(route) {
        return this.addLink(route, 'Invite', null, '/static/vaultier/images/icon-plus-grey.png')
    },

    addVault: function () {
        var vault = this.environment.vault;
        if (vault) {
            this.addLink('Vault.index', vault.get('name'), vault,'/static/vaultier/images/icon-vault-grey.png')
        }
        return this;
    },

    addCard: function () {
        var card = this.environment.card;
        if (card) {
            this.addLink('Card.index', card.get('name'), card,'/static/vaultier/images/icon-card-grey.png')
        }
        return this;
    },


    addWorkspace: function () {
        var workspace = this.environment.workspace;
        if (workspace) {
            this.addLink('Workspace.index', workspace.get('name'), workspace, '/static/vaultier/images/icon-workspace-grey.png')
        }
        return this;
    }

});

