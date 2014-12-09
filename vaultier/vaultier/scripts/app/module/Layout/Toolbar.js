/**
 * @module module
 * @submodule module-layout
 * @class Vaultier.Toolbar
 * @extends Ember.Object
 */
Vaultier.Toolbar = Ember.Object.extend({

    /**
     * List of breadcrumbs for show in toolbar
     *
     * @property breadcrumbs
     * @type {Array}
     */
    breadcrumbs: null,

    /**
     * Map of actions for show in toolbar
     *
     * @property actions
     * @type {Object}
     */
    actions: {},

    /**
     * True if we are in folder which is also root
     *
     * @property rootFolder
     * @type {Object}
     */
    rootFolder: false,

    /**
     * @TODO will be removed with cards, vault,..
     */
    environment: null,

    init: function () {
        this.set('breadcrumbs', Ember.ArrayProxy.create({ content: Ember.A()}));
    },

    addLink: function (link, title, params, icon) {
        this.breadcrumbs.forEach(function (item) {
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

        this.breadcrumbs.pushObject({
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

    addSettings: function () {
        //return this.addLink('Settings.index', 'Settings')
        return this
    },

    addRolesAdminIndex: function (route) {
        return this.addLink(route, 'Team', null, '/static/vaultier/images/icon-user-grey.png')
    },

    addRolesAdminInvite: function (route) {
        return this.addLink(route, 'Invite', null, '/static/vaultier/images/icon-plus-grey.png')
    },

    addVault: function () {
        var vault = this.get('environment.vault');
        if (vault) {
            this.addLink('Vault.index', vault.get('name'), vault, '/static/vaultier/images/icon-vault-grey.png')
        }
        return this;
    },

    addCard: function () {
        var card = this.get('environment.card');
        if (card) {
            this.addLink('Card.index', card.get('name'), card, '/static/vaultier/images/icon-card-grey.png')
        }
        return this;
    },


    addWorkspace: function () {
        var workspace = this.get('environment.workspace');
        if (workspace) {
            this.addLink('Workspace.index', workspace.get('name'), workspace, '/static/vaultier/images/icon-workspace-grey.png')
        }
        return this;
    },

    /**
     * Reset lists of breadcrumbs and actions
     * We need to do it because controller keeps this object (Vaultier.Toolbar) and when we are moving
     * in one resource it does not destroy. So when we need to upgrade toolbar, we need to clear it
     *
     * @method prepareBuilder
     * @returns {Vaultier.Toolbar}
     */
    prepareBuilder: function () {
        this.set('breadcrumbs', Ember.ArrayProxy.create({ content: Ember.A()}));
        this.set('actions', []);
        return this;
    },

    /**
     * Add all parents of current document to breadcrumbs
     *
     * @method addParentsOfDocument
     * @param parentsNodes
     * @returns {Vaultier.Toolbar}
     */
    addParentsOfDocument: function (parentsNodes) {
        Utils.Logger.log.debug(parentsNodes);
        if (!parentsNodes) {
            this.set('rootFolder', true);
            return this;
        }
        parentsNodes.forEach(function (node) {
            this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Document.list', node.get('id')),
                title: Utils.HandlebarsHelpers.current().ellipsis(node.get('name'), 25),
                icon: '/static/vaultier/images/icon-' + node.get('typeCss') + '.png',
                last: false
            });
        }.bind(this));
        return this;
    },

    /**
     * Add one document to breadcrumb (for example the current document)
     *
     * @method addDocument
     * @param {Vaultier.Document.Node} currentDocument
     * @param {Boolean} last
     * @returns {Vaultier.Toolbar}
     */
    addDocument: function (currentDocument, last) {
        this.get('breadcrumbs').pushObject({
            link: this.get('router').generate('Document.list', currentDocument.get('id')),
            title: Utils.HandlebarsHelpers.current().ellipsis(currentDocument.get('name'), 25),
            icon: '/static/vaultier/images/icon-' + currentDocument.get('typeCss') + '.png',
            last: last ? true : false
        });
        return this;
    },

    /**
     * Add action to toolbar for creating new document
     *
     * @method addActionAddDocument
     * @returns {Vaultier.Toolbar}
     */
    addActionCreate: function () {
        this.get('actions').create = true;
        return this;
    },

    /**
     * Add action to toolbar for enter to settings (according to give link it could be settings
     * for folder or document
     *
     * @method addActionSettings
     * @param link
     * @returns {Vaultier.Toolbar}
     */
    addActionSettings: function (link) {
        this.get('actions').settings = true;
        return this;
    },

    /**
     * Add create document to breadcrumb
     *
     * @method addDocumentCreate
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addDocumentCreate: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Create New ' + title,
            icon: '/static/vaultier/images/icon-plus-gray.png',
            last: true
        });
        return this;
    },

    /**
     * Add edit document to breadcrumb
     *
     * @method addDocumentEdit
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addDocumentEdit: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Edit ' + title,
            icon: '/static/vaultier/images/icon-wrench-gray.png',
            last: true
        });
        return this;
    },

    /**
     * Add move document to breadcrumb
     *
     * @method addDocumentMove
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addDocumentMove: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Move ' + title,
            icon: '/static/vaultier/images/icon-wrench-gray.png',
            last: true
        });
        return this;
    }

});

