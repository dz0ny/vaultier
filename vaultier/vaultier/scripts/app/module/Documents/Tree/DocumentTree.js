ApplicationKernel.namespace('Vaultier.Document');

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
Vaultier.Document.TreeNodeContainer = Ember.View.extend(Vaultier.Document.mixin.StyleBindingsMixin, {
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
