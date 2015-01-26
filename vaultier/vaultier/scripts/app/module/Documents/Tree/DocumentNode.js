ApplicationKernel.namespace('Vaultier.Document');

/**
 * Object that represents one node
 *
 * @module vaultier-ui-documents
 * @class Vaultier.Document.Node
 * @namespace Vaultier.Document
 */
Vaultier.Document.Node = Ember.ObjectProxy.extend({

    /**
     * True if mouse is pointing to node
     *
     * @property isActive
     * @type boolean
     * @default false
     */
    isActive: false,

    /**
     * True if mouse is pointing to node
     *
     * @property isActive
     * @type boolean
     * @default false
     */
    isSelected: false,

    /**
     * True if node is opened
     *
     * @property isOpened
     * @type boolean
     * @default false
     */
    isOpened: false,

    /**
     * Pointer to parent
     *
     * @property parent
     * @type Vaultier.Document.Node
     */
    parent: null,

    /**
     * Array of child nodes
     *
     * @property children
     * @type Ember.ArrayProxy
     */
    children: [],

    /**
     * True if node and its children are loaded
     *
     * @property isLoaded
     * @type boolean
     * @default false
     */
    isLoaded: false,

    /**
     * True if node should be hidden although the computed property isVisible says that it could be shown.
     * It is used to shown just one branch of tree
     *
     * @property skipShow
     * @type boolean
     * @default false
     */
    skipShow: false,

    /**
     * True if node is displayed
     *
     * @property isOpened
     * @type boolean
     * @default false
     */
    isVisible: function () {
        return this._hierarchyIsVisible(this) && !this.get('skipShow');
    }.property('isRoot', 'parent', 'parent.isVisible', 'parent.isOpened', 'skipShow'),

    _hierarchyIsVisible: function (node, underRoot) {
        if (!underRoot && node.get('isRoot') || underRoot && node.get('parent.isRoot')) {
            return true;
        }
        return node.get('parent.isOpened') && this._hierarchyIsVisible(node.get('parent'), underRoot);
    },

    /**
     * Depth of node
     *
     * @property level
     * @type boolean
     * @default false
     */
    level: function () {
        return this._computeLevel(this.get('parent'), 0);
    }.property('parent').volatile(),

    _computeLevel: function (node, level) {
        if (null !== node) {
            return this._computeLevel(node.get('parent'), level + 1);
        }
        return level;
    },

    /**
     * True if node is a root node
     *
     * @property isRoot
     * @type boolean
     */
    isRoot: function () {
        return this.get('parent') === null;
    }.property('parent'),

    /**
     * True if node is type of 'TYPE_FOLDER'
     *
     * @property folder
     * @type boolean
     */
    folder: function () {
        return this.get('type') == Vaultier.dal.model.Node.prototype.types.FOLDER.value;
    }.property('children', 'children.@each'),

    /**
     * True if node is type of 'TYPE_FILE'
     *
     * @property file
     * @type boolean
     */
    file: function () {
        return this.get('type') != Vaultier.dal.model.Node.prototype.types.FOLDER.value;
    }.property('children', 'children.@each'),

    /**
     * True if node is type of 'TYPE_PASSWORD'
     *
     * @property password
     * @type boolean
     */
    password: function () {
        return this.get('type') == Vaultier.dal.model.Node.prototype.types.PASSWORD.value;
    }.property('children', 'children.@each'),

    /**
     * True if node is type of 'TYPE_NOTE'
     *
     * @property note
     * @type boolean
     */
    note: function () {
        return this.get('type') == Vaultier.dal.model.Node.prototype.types.NOTE.value;
    }.property('children', 'children.@each'),

    /**
     * True if user can update, delete node or invite to node
     *
     * @property hasEditableOrInvitePermissions
     * @type boolean
     */
    hasEditableOrInvitePermissions: function () {
        return this.get('perms.update') || this.get('perms.delete') || this.get('perms.invite');
    }.property(),


    /**
     * Property which converts node's color to css class
     *
     * @property folderColor
     * @type String
     */
    typeCss: function () {
        if (this.get('membership.status') != Vaultier.dal.model.Member.proto().statuses['MEMBER'].value) {
            return Vaultier.dal.model.Node.proto().types.getByValue(this.get('type')).text
               + '-' + 'gray';
        } else if (this.get('type') == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
            return Vaultier.dal.model.Node.proto().types.getByValue(this.get('type')).text
                + '-' + this.get('color');
        } else {
            return Vaultier.dal.model.Node.proto().types.getByValue(this.get('type')).text;
        }
    }.property('type', 'color'),

    /**
     * True if node has some children
     *
     * @property notEmpty
     * @type boolean
     */
    notEmpty: function () {
        return this.get('children').length > 0 ? 'not-empty' : '';
    }.property('children', 'children.@each')

});
