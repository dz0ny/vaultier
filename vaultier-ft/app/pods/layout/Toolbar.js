/**
 * @module vaultier-ui-layout
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

    init: function () {
        this.set('breadcrumbs', Ember.ArrayProxy.create({ content: Ember.A()}));
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
     * Add Vaultier settings to breadcrumbs
     *
     * @method addBreadcrumbSettings
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbSettings: function() {
        this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Settings.index'),
                title: 'Settings',
                icon: 'images/icon-wrench-gray.png',
                last: false
            });
        return this;
    },

    /**
     * Add Vaultier personal settings to breadcrumbs
     *
     * @method addBreadcrumbSettingsPersonal
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbSettingsPersonal: function() {
        this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Settings.index'),
                title: 'Personal',
                icon: 'images/icon-avatar-gray.png',
                last: true
            });
        return this;
    },

    /**
     * Add Vaultier key settings to breadcrumbs
     *
     * @method addBreadcrumbSettingsKey
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbSettingsKey: function() {
        this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Settings.index'),
                title: 'Key',
                icon: 'images/icon-locked-gray.png',
                last: true
            });
        return this;
    },

    /**
     * Add Vaultier Accept invitation page to breadcrumbs
     *
     * @method addBreadcrumbInvitationAnonymous
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbInvitationAnonymous: function() {
        this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Settings.index'),
                title: 'Accept invitation',
                icon: 'images/icon-wrench-gray.png',
                last: false
            });
        return this;
    },

    /**
     * Add Vaultier List of invitations page to breadcrumbs
     *
     * @method addBreadcrumbInvitationAccept
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbInvitationAccept: function() {
        this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Settings.index'),
                title: 'List of invitations to accept',
                icon: 'images/icon-wrench-gray.png',
                last: false
            });
        return this;
    },


    /**
     * Add all parents of current document to breadcrumbs
     *
     * @method addBreadcrumbParentsOfDocument
     * @param parentsNodes
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbParentsOfDocument: function (parentsNodes) {
        Utils.Logger.log.debug(parentsNodes);
        if (!parentsNodes) {
            this.set('rootFolder', true);
            return this;
        }
        parentsNodes.forEach(function (node) {
            this.get('breadcrumbs').pushObject({
                link: this.get('router').generate('Document.list', node.get('id')),
                title: Utils.HandlebarsHelpers.current().ellipsis(node.get('name'), 25),
                icon: 'images/icon-' + node.get('typeCss') + '.png',
                last: false
            });
        }.bind(this));
        return this;
    },

    /**
     * Add one document to breadcrumb (for example the current document)
     *
     * @method addBreadcrumbDocument
     * @param {Vaultier.Document.Node} currentDocument
     * @param {Boolean} last
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocument: function (currentDocument, last) {
        this.get('breadcrumbs').pushObject({
            link: this.get('router').generate('Document.list', currentDocument.get('id')),
            title: Utils.HandlebarsHelpers.current().ellipsis(currentDocument.get('name'), 25),
            icon: 'images/icon-' + currentDocument.get('typeCss') + '.png',
            last: last ? true : false
        });
        return this;
    },

    /**
     * Add create document to breadcrumb
     *
     * @method addBreadcrumbDocumentCreate
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocumentCreate: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Create New ' + title,
            icon: 'images/icon-plus-gray.png',
            last: true
        });
        return this;
    },

    /**
     * Add edit document to breadcrumb
     *
     * @method addBreadcrumbDocumentEdit
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocumentEdit: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Edit ' + title,
            icon: 'images/icon-wrench-gray.png',
            last: true
        });
        return this;
    },

    /**
     * Add move document to breadcrumb
     *
     * @method addBreadcrumbDocumentMove
     * @param {String} title
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocumentMove: function (title) {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Move ' + title,
            icon: 'images/icon-wrench-gray.png',
            last: true
        });
        return this;
    },

    /**
     * Add link to team page for document to breadcrumb
     *
     * @method addBreadcrumbDocumentTeam
     * @param {Vaultier.Document.Node} currentDocument
     * @param {Boolean} last
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocumentTeam: function (currentDocument, last) {
        this.get('breadcrumbs').pushObject({
            link: this.get('router').generate('Document.rolesAdminIndex', currentDocument.get('id')),
            title: 'Team',
            icon: 'images/icon-user-gray.png',
            last: last ? true : false
        });
        return this;
    },

    /**
     * Add invite option for document to breadcrumb
     *
     * @method addBreadcrumbDocumentTeamInvite
     * @returns {Vaultier.Toolbar}
     */
    addBreadcrumbDocumentTeamInvite: function () {
        this.get('breadcrumbs').pushObject({
            link: 'link',
            title: 'Invite',
            icon: 'images/icon-plus-gray.png',
            last: true
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
     * Add dropdown to toolbar for enter to settings
     *
     * @method addActionSettings
     * @returns {Vaultier.Toolbar}
     */
    addActionSettings: function () {
        this.get('actions').settings = {};
        return this;
    },

    /**
     * Add action edit to settings dropdown in toolbar
     *
     * @method addActionSettingsEdit
     * @returns {Vaultier.Toolbar}
     */
    addActionSettingsEdit: function () {
        this.get('actions').settings.edit = true;
        return this;
    },

    /**
     * Add action move to settings dropdown in toolbar
     *
     * @method addActionSettingsMove
     * @returns {Vaultier.Toolbar}
     */
    addActionSettingsMove: function () {
        this.get('actions').settings.move = true;
        return this;
    },

    /**
     * Add action delete to settings dropdown in toolbar
     *
     * @method addActionSettingsDelete
     * @returns {Vaultier.Toolbar}
     */
    addActionSettingsDelete: function () {
        this.get('actions').settings.delete = true;
        return this;
    }

});

