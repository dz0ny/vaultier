Ember.StyleBindingsMixin = Ember.Mixin.create({
    concatenatedProperties: ['styleBindings'],
    attributeBindings: ['style'],
    unitType: 'px',
    createStyleString: function (styleName, property) {
        var value;
        value = this.get(property);
        if (value === void 0) {
            return;
        }
        if (Ember.typeOf(value) === 'number') {
            value = value + this.get('unitType');
        }
        return "" + styleName + ":" + value + ";";
    },
    applyStyleBindings: function () {
        var lookup, properties, styleBindings, styleComputed, styles,
            _this = this;
        styleBindings = this.styleBindings;
        if (!styleBindings) {
            return;
        }
        lookup = {};
        styleBindings.forEach(function (binding) {
            var property, style, _ref;
            _ref = binding.split(':'), property = _ref[0], style = _ref[1];
            return lookup[style || property] = property;
        });
        styles = Ember.keys(lookup);
        properties = styles.map(function (style) {
            return lookup[style];
        });
        styleComputed = Ember.computed(function () {
            var styleString, styleTokens;
            styleTokens = styles.map(function (style) {
                return _this.createStyleString(style, lookup[style]);
            });
            styleString = styleTokens.join('');
            if (styleString.length !== 0) {
                return styleString;
            }
        });
        styleComputed.property.apply(styleComputed, properties);
        return Ember.defineProperty(this, 'style', styleComputed);
    },
    init: function () {
        this.applyStyleBindings();
        return this._super();
    }
});

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

/**
 * @module vaultier-ui-documents
 * @class Vaultier.Document.TreeController
 * @extends Ember.Controller
 */
Vaultier.Document.TreeController = Ember.Controller.extend({

    treeNodeViewClass: 'Vaultier.Document.TreeNode',

    /**
     * Array of root nodes
     *
     * @property treeContent
     * @type Array<{Vaultier.Document.Node}>
     */
    treeContent: [],

    /**
     * Action for handle the event when we select the node in tree
     *
     * @method nodeSelectionStateChanged
     * @param {Vaultier.Document.TreeNode} node
     */
    nodeSelectionStateChanged: Ember.K,

    /**
     * Return actual selected node
     *
     * @property selectedNode
     * @type {Vaultier.Document.Node}
     */
    selectedNode: function () {
        return this.get('tree').getSelectedNode();
    }.property('treeContent.@each.isSelected'),

    checkIfChildNodesAreLoaded: function (node) {
        this.get('tree').checkIfChildNodesAreLoaded(node);
    }

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.Document.TreeContainer
 * @extends Ember.CollectionView
 */
Vaultier.Document.TreeContainer = Ember.CollectionView.extend({

    controller: null,
    content: Ember.computed.alias('controller.treeContent'),
    itemViewClass: 'Vaultier.Document.TreeNodeContainer',
    classNames: ['tree-container']

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.Document.TreeNodeContainer
 * @extends Ember.View
 */
Vaultier.Document.TreeNodeContainer = Ember.View.extend(Ember.StyleBindingsMixin, {
    templateName: 'Documents/Tree/DocumentTreeNodeContainer',
    classNames: ['tree-node-container'],

    /**
     * Set padding left to node for uses of 'Ember.StyleBindingMixin'
     *
     * @property styleBindings
     * @type Array
     */
    styleBindings: ['indentation:padding-left'],

    treeNodeView: function () {
        return Ember.get(this.get('controller.treeNodeViewClass'));
    }.property('controller.treeNodeViewClass'),

    /**
     * Compute padding-left for node according to its level
     *
     * @method indentation
     */
    indentation: function () {
        return (this.get('node.level')) * 20 + 'px';
    }.property('node.level'),

    nodes: Ember.computed.alias('parentView.content'),
    node: Ember.computed.alias('content'),

    /**
     * Event handler for start pointing to node by mouse
     *
     * @method mouseEnter
     */
    mouseEnter: function () {
        this.get('node').set('isActive', true);
    },

    /**
     * Event handler for stop pointing to node by mouse
     *
     * @method mouseLeave
     */
    mouseLeave: function () {
        this.get('node').set('isActive', false);
    },

    /**
     * Event handler for double click on node
     *
     * @method doubleClick
     */
    doubleClick: function () {
        //TODO: prevent click if double click is detected
        var node = this.get('node');
        node.toggleProperty('isOpened');
    },

    /**
     * Event handler for click on node
     *
     * @method click
     * @param event
     */
    click: function (event) {
        var node = this.get('node');
        this.get('controller.tree').setSelectedNode(node);
        Utils.Logger.log.debug('Vaultier.Document.TreeNodeContainer zmena');
        this.get('controller').nodeSelectionStateChanged(node);
    }
});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.Document.TreeNodeView
 * @extends Ember.View
 */
Vaultier.Document.TreeNodeView = Ember.View.extend({
    node: Ember.computed.alias('parentView.node'),

    isVisible: function () {
        return this.get('node.isVisible');
    }.property('node.parent.isRoot', 'node.isVisible')

});

/**
 * @module vaultier-ui-documents
 * @class Vaultier.Document.TreeNode
 * @extends Vaultier.Document.TreeNodeView
 */
Vaultier.Document.TreeNode = Vaultier.Document.TreeNodeView.extend({

    classNames: ['tree-node'],
    classNameBindings: ['node.isActive', 'node.isSelected', 'node.folder', 'node.isOpened:is-opened:is-closed'],
    templateName: 'Documents/Tree/DocumentTreeNode',

    nodeContent: function () {
        return this.get('node.name');
    }.property('node.name'),

    treeNodeHeader: Ember.View.extend({
        node: Ember.computed.alias('parentView.node'),
        classNames: ['tree-node-header'],
        classNameBindings: ['node.notEmpty'],

        click: function (event) {
            event.stopPropagation();
            this.get('node').toggleProperty('isOpened');
            this.get('parentView.controller').checkIfChildNodesAreLoaded(this.get('node'));
        }
    })
});
