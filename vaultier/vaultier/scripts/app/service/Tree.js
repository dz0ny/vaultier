ApplicationKernel.namespace('Service');

/**
 * Service logic for folder tree
 *
 * @module service
 * @class Service.Tree
 * @extends Ember.Object
 */
Service.Tree = Ember.Object.extend({

    /**
     * List of {Vaultier.Document.Node} which wrap model {Vaultier.dal.model.Node}
     *
     * @property nodes
     * @type {ArrayProxy}
     * @private
     */
    nodes: null,

    /**
     * Actual node
     *
     * @property actualNode
     * @type {Vaultier.Document.Node}
     * @private
     */
    actualNode: null,

    /**
     * Set true if all initialization such as load root node were done. Otherwise it is set to false.
     *
     * @property loaded
     * @type {Boolean}
     * @private
     */
    loaded: false,

    /**
     *
     * @property fullVisibilityOfTree
     * @type {Boolean}
     * @private
     */
    fullVisibilityOfTree: true,

    init: function () {
        console.log('Service.Tree:init');
        this.nodes = Ember.ArrayProxy.create({ content: Ember.A()});

    },

    /**
     * Return all tree nodes
     *
     * @method getAllTreeNodes
     * @returns {Array}
     */
    getAllTreeNodes: function () {
        return this.nodes;
    },

    /**
     * Set that all nodes which can be displayed will be displayed.
     *
     * @method switchToVisibleAllNodes
     */
    switchToVisibleAllNodes: function () {
        if (!this.fullVisibilityOfTree) {
            this.nodes.forEach(function (node) {
                console.log(node);
                if (!node.get('parent')) {
                    if (node.get('skipShow')) {
                        node.set('isOpened', false);
                    } else {
                        node.set('isOpened', true);
                    }
                    node.set('skipShow', false);
                } else if (node.get('type') != Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                    node.set('skipShow', false);
                }
            });
        }
        this.fullVisibilityOfTree = true;
    },

    /**
     * Set that all nodes which are not in same branch as given node will be hiden
     *
     * @method switchToVisibleJustNodesInOneBranch
     * @param {Vaultier.Document.Node} node
     */
    switchToVisibleJustNodesInOneBranch: function (node) {
        var rootNode = this._getRootNodeForNode(node);
        this.nodes.forEach(function (node) {
            console.log(node);
            console.log(rootNode);
            if (!node.get('parent') && node != rootNode) {
                console.log('YES');
                node.set('skipShow', true);
                node.set('isOpened', false);
            } else if (node.get('type') != Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                node.set('skipShow', true);
            }
        });
        this.fullVisibilityOfTree = false;
    },

    /**
     * Return one node according to given id
     *
     * @method getNodeById
     * @param id
     * @returns {Ember.RSVP.Promise}
     */
    getNodeById: function (id) {
        console.log(id);
        if (!this.loaded) {
            return this._loadRootNodes().then(function () {
                this.loaded = true;
                return this._findNodeById(id);
            }.bind(this));
        } else {
            return this._findNodeById(id);
        }
    },

    /**
     * Return actual selected node
     *
     * @method getSelectedNode
     * @returns {null|Vaultier.Document.Node}
     */
    getSelectedNode: function () {
        return this.actualNode ? this.actualNode : this.nodes.get('content').objectAt(0);
    },

    /**
     * Set selected node to be the actual node
     *
     * @method setSelectedNode
     * @param selectedNode
     */
    setSelectedNode: function (selectedNode) {
        this.nodes.forEach(function (node) {
            node.set('isSelected', false);
        });
        selectedNode.set('isSelected', true);
        this.actualNode = selectedNode;
    },

    /**
     * Return all parents for given node
     *
     * @method getParents
     * @param {Vaultier.Document.Node} node
     * @returns {Array}
     */
    getParents: function (node) {
        return (node.get('parent') ? this._getParents(node.get('parent')) : null);
    },

    /**
     * Add node
     *
     * @method addNode
     * @param {Vaultier.dal.model.Node} modelNode
     */
    addNode: function (modelNode) {
        var parentTreeNode = this.getSelectedNode();
        this._addToNodes(modelNode, parentTreeNode);
    },

    /**
     * Add node
     *
     * @method addRootNode
     * @param {Vaultier.dal.model.Node} modelRootNode
     * @param {Integer} id
     */
    addRootNode: function (modelRootNode, id) {
        var treeRootNode = this._createRootNode(modelRootNode);
        treeRootNode.set('id', id);
        treeRootNode.set('isLoaded', true);
        this.nodes.pushObject(treeRootNode);
    },

    /**
     * Remove node
     *
     * @method removeNode
     * @param {Vaultier.Document.Node} treeNode
     * @returns {Ember.RSVP.Promise}
     */
    removeNode: function (treeNode) {
        this._removeNode(treeNode);

        var parentTreeNode = treeNode.get('parent');
        if (parentTreeNode) {
            parentTreeNode.get('children').removeObject(treeNode);
        }

        return treeNode.get('content')
            .deleteRecord()
            .then(
            function () {
            }.bind(this),
            function (error) {
                treeNode.rollback();
                return error;
            }.bind(this)
        );
    },

    /**
     * Move node
     *
     * @method moveNode
     * @param {Vaultier.Document.Node} treeNodeToMove
     * @param {Vaultier.Document.Node} destinationParentNode
     */
    moveNode: function (treeNodeToMove, destinationParentNode) {
        treeNodeToMove.get('parent').get('children').removeObject(treeNodeToMove);

        console.log(this.nodes);

        console.log(destinationParentNode.get('id'));
        this.nodes.removeObject(treeNodeToMove);
        treeNodeToMove.set('parent', destinationParentNode);

        return treeNodeToMove.get('content').saveRecord().then(function (response) {
            console.log(treeNodeToMove);
            destinationParentNode.get('children').pushObject(treeNodeToMove);
            this._insertNodeOnRightPlace(treeNodeToMove, destinationParentNode);
            this._reinsertNodeChildrenToArray(treeNodeToMove);
        }.bind(this));
    },

    /**
     * It reinserts children of given node in nodes array. It is used when we move node
     * and we want to move the child nodes with him
     *
     * @method _reinsertNodeChildrenToArray
     * @param {Vaultier.Document.Node} treeNode
     * @private
     */
    _reinsertNodeChildrenToArray: function (treeNode) {
        console.log(this.nodes);
        console.log(treeNode);

        var i = 1;
        treeNode.get('children').forEach(function (child) {
            console.log(child);
            this.nodes.removeObject(child);

            var indexToInputNode = this.nodes.get('content').indexOf(treeNode) + i++;
            console.log(this.nodes.get('content').indexOf(treeNode));
            console.log(indexToInputNode);
            this.nodes.insertAt(indexToInputNode, child);


            this._reinsertNodeChildrenToArray(child);
        }.bind(this));
    },

    /**
     * Remove given node and its children
     *
     * @method _removeNode
     * @param {Vaultier.Document.Node} treeNode
     * @private
     */
    _removeNode: function (treeNode) {
        if (treeNode.get('children.length') > 0) {
            treeNode.get('children').forEach(function (child) {
                this._removeNode(child);
            }.bind(this))
        }
        this.nodes.get('content').removeObject(treeNode);
    },

    /**
     * It returns the root node for given node
     *
     * @method _getRootNodeForNode
     * @param {Vaultier.Document.Node} treeNode
     * @private
     * @returns {Vaultier.Document.Node}
     */
    _getRootNodeForNode: function (treeNode) {
        return treeNode.get('parent')
            ? this._getRootNodeForNode(treeNode.get('parent'))
            : treeNode;
    },

    /**
     * Returns all children which are actually loaded
     *
     * @method _getAllLoadedChildrenForNode
     * @param {Array} treeNodeArray
     * @param {Vaultier.Document.Node} treeNode
     * @private
     * @returns {Array}
     */
    _getAllLoadedChildrenForNode: function (treeNodeArray, treeNode) {
        console.log(treeNode);

        treeNode.get('children').forEach(function (child, index) {
            console.log(child);
            treeNodeArray.pushObject(child);
            this._getAllLoadedChildrenForNode(treeNodeArray, child);
        }.bind(this));

    },

    /**
     * Try to find candidate when we want to remove give node. If no nodes are left, it returns null
     *
     * @method _findCandidateForReplaceSelectedNode
     * @param {Vaultier.Document.Node} treeNode
     * @private
     * @returns {Vaultier.Document.Node|null}
     */
    _findCandidateForReplaceSelectedNode: function (treeNode) {
        //try to find sibling
        var siblingTreeNode = this._getFirstSibling(treeNode);
        if (siblingTreeNode) {
            console.log("sibling remove mode");
            return siblingTreeNode;
        }

        //try to find parent
        var parentTreeNode = treeNode.get('parent');
        if (parentTreeNode) {
            console.log("parent remove mode");
            return parentTreeNode;
        }

        //try to change to other root node
        if (this.nodes.get('length') > 1) {
            console.log("other root remove mode");
            var anotherRootNode = null;
            this.nodes.forEach(function (node) {
                if (!node.get('parent') && node.get('id') != treeNode.get('id')) {
                    anotherRootNode = node;
                }
            });
            return anotherRootNode;
        }

        //we remove last node, we do not have any other node, we have to return null
        return null;
    },

    /**
     * Returns first sibling which will be found. If does not exists it returns null
     *
     * @method _getFirstSibling
     * @param {Vaultier.Document.Node} treeNode
     * @private
     * @returns {Vaultier.Document.Node|null}
     */
    _getFirstSibling: function (treeNode) {
        var parentTreeNode = treeNode.get('parent');
        if (!parentTreeNode) {
            return null;
        }
        var sibling = null;
        parentTreeNode.get('children').forEach(function (possibleSibling) {
            if (possibleSibling.get('id') != treeNode.get('id')) {
                sibling = possibleSibling;
            }
        })
        return sibling;
    },

    /**
     * Recursive method for finding all parents for given node
     *
     * @method _getParents
     * @param {Vaultier.Document.Node} node
     * @private
     * @returns {Array}
     */
    _getParents: function (node) {
        var parents = null;
        if (node.get('parent')) {
            parents = this._getParents(node.get('parent'));
            parents.pushObject(node);
            return parents;
        } else {
            parents = new Ember.A();
            parents.pushObject(node);
            return parents;
        }
    },

    /**
     * Create a normal non-root node
     *
     * @method _createNode
     * @param {Vaultier.dal.model.Node} model
     * @param {Vaultier.Document.Node} parent
     * @private
     * @return {Vaultier.Document.Node}
     */
    _createNode: function (model, parent) {
        console.log(model);
        var node = Vaultier.Document.Node.create({
            children: [],
            isOpened: false,
            content: model
        });
        parent.get('children').pushObject(node);
        node.set('parent', parent);
        return node;
    },

    /**
     * Create root node
     *
     * @method _createRootNode
     * @param {Vaultier.dal.model.Node} model
     * @private
     * @return {Vaultier.Document.Node}
     */
    _createRootNode: function (model) {
        return Vaultier.Document.Node.create({
            children: [],
            type: Vaultier.dal.model.Node.prototype.types.FOLDER.value,
            isOpened: false,
            content: model
        });
    },

    /**
     * Check if child nodes are loaded. If not it will load them
     *
     * @method checkIfChildNodesAreLoaded
     * @param {Vaultier.Document.Node} nod
     * @private
     * @return {Ember.RSVP.Promise}
     */
    checkIfChildNodesAreLoaded: function (node) {
        var promises = [];
        node.get('children').forEach(function (childNode) {
            console.log('childNode');
            if (childNode.get('isLoaded') == false
                && childNode.get('type') == Vaultier.dal.model.Node.proto().types.FOLDER.value
                ) {
                promises.pushObject(this._loadChildren(childNode));
                childNode.set('isLoaded', true);
            }
        }.bind(this));
        return Ember.RSVP.Promise.all(promises);
    },

    /**
     * Try to find node with given id in local array and if node is not there, it will load it
     *
     * @method _findNodeById
     * @param id
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _findNodeById: function (id) {
        console.log(id);
        var foundedNode = null;
        console.log(this.nodes);
        this.nodes.forEach(function (node) {
            console.log(node.get('id'));
            if (node.get('id') == id) {
                console.log('YES');
                foundedNode = node;
            }
        });
        console.log(foundedNode);
        if (!foundedNode) {
            console.log('if (!foundedNode) {');
            return this._loadNodeById(id).then(function (node) {
                return node;
            }.bind(this)).then(function (node) {
                return this._loadChildren(node).then(function () {
                    node.set('isLoaded', true);
                    return node;
                });
            }.bind(this));
        }
        if (!foundedNode.get('isLoaded')) {
            return this._loadChildren(foundedNode).then(function () {
                foundedNode.set('isLoaded', true);
                this.checkIfChildNodesAreLoaded(foundedNode.get('parent'));
                return foundedNode;
            }.bind(this));
        }
        return new Ember.RSVP.Promise(function (resolve) {
            return resolve(foundedNode);
        });
    },

    /**
     * It loads node by given id with all its parents
     *
     * @method _findNodeById
     * @param id
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _loadNodeById: function (id) {
        var modelGlobal = null;
        return this.get('store')
            .find('Node', id)
            .then(function (model) {
                console.log('_loadNodeById-then');
                modelGlobal = model;
                var parent = this._getNodeFromNodesArray(model.get('parent'));
                if (parent && parent.get('isLoaded')) {
                    return parent;
                } else {
                    return this._loadParents(model)
                        .then(this._addParentsToNodes.bind(this));
                }
            }.bind(this)).then(function (parentTreeNode) {
                console.log(this.nodes);
                return this._convertNodeModelToTreeNode(parentTreeNode, [ modelGlobal ])[0];
            }.bind(this));
    },

    /**
     * It loads root nodes and converts them to local node representation
     *
     * @method _loadRootNodes
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _loadRootNodes: function () {
        return this.get('store')
            .find('Node')
            .then(function (modelNodes) {
                var treeNodes = this._convertNodeModelToTreeRootNode(modelNodes);
                var promises = [];
                treeNodes.forEach(function (treeNode) {
                    promises.pushObject(this._loadChildren(treeNode));
                }.bind(this));
                return Ember.RSVP.Promise.all(promises);

            }.bind(this));
    },

    /**
     * It loads child nodes of given parent node and converts them to local node representation
     *
     * @method _loadChildren
     * @param {Vaultier.Document.Node} parentNode
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _loadChildren: function (parentNode) {
        return this.get('store')
            .find('Node', { parent: parentNode.get('id')})
            .then(function (models) {
                return this._convertNodeModelToTreeNode(parentNode, models);
            }.bind(this));
    },

    /**
     * It loads child nodes of given parent node and converts them to local node representation
     *
     * @method _loadParents
     * @param {Vaultier.Document.Node} node
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _loadParents: function (node) {
        return Utils.RSVPAjax({
            url: '/api/nodes/' + node.get('id') + '/path',
            type: 'get'
        }).then(function (parentObjects) {
            //TODO temporary solution
            var parentClasses = [];
            parentObjects.forEach(function (parentObject) {
                var parentModel = Vaultier.dal.model.Node.load({
                    id: parentObject.id,
                    name: parentObject.name,
                    meta: parentObject.meta,
                    type: parentObject.type,
                    data: parentObject.data,
                    color: parentObject.color,
                    enc_version: parentObject.enc_version,
                    created_by: parentObject.created_by,
                    created_at: parentObject.created_at,
                    updated_at: parentObject.updated_at,
                    parent: parentObject.parent
                });
                parentClasses.pushObject(parentModel);
                console.log(parentModel);
            });
            return parentClasses;
        });
    },

    /**
     * It converts node models that were taken from path request to node representation
     *
     * @method _addParentsToNodes
     * @param parentNodes
     * @private
     * @returns {Ember.RSVP.Promise}
     */
    _addParentsToNodes: function (parentNodes) {
        var previous = null
        var promises = [];
        console.log(parentNodes);
        parentNodes.forEach(function (parentNode) {
            if (previous) {
                previous = this._convertNodeModelToTreeNode(previous, [parentNode])[0];
                promises.pushObject(this._loadChildren(previous).then(function () {
                    previous.set('isLoaded', true);
                }));
            } else {
                console.log(parentNode);
                console.log(parentNode.get('id'));
                previous = this._getNodeFromNodesArray(parentNode.get('id'));
            }
        }.bind(this));
        return Ember.RSVP.Promise.all(promises).then(function () {
            var promisesPrevious = [];
            previous.get('children').forEach(function (previousChild) {
                promisesPrevious.pushObject(this._loadChildren(previousChild));
            }.bind(this));
            return Ember.RSVP.Promise.all(promisesPrevious);
        }.bind(this));
    },

    /**
     * It convert Node models to local node representation of root nodes
     *
     * @method _convertNodeModelToTreeRootNode
     * @param {Array} modelNodes
     * @private
     */
    _convertNodeModelToTreeRootNode: function (modelNodes) {
        var treeNodes = [];
        modelNodes.forEach(function (modelNode) {
            if (!this._getNodeFromNodesArray(modelNode.get('id'))) {
                var treeNode = this._createRootNode(modelNode);
                treeNode.id = modelNode.get('id');
                treeNode.set('isLoaded', true);
                this.nodes.pushObject(treeNode);
                treeNodes.pushObject(treeNode);
            }

        }.bind(this));
        return treeNodes;
    },

    /**
     * It convert Node models to local node representation of root nodes
     *
     * @method _convertNodeModelToTreeNode
     * @param {Vaultier.Document.Node} parentTreeNode
     * @param {Array} modelNodes
     * @private
     * @returns {Array}
     */
    _convertNodeModelToTreeNode: function (parentTreeNode, modelNodes) {
        var treeNodes = [];
        modelNodes.forEach(function (modelNode) {
            var treeNode = this._addToNodes(modelNode, parentTreeNode);
            if (treeNode) {
                treeNodes.pushObject(treeNode);
            }
        }.bind(this));
        return treeNodes;
    },

    /**
     * Check if model node is already not in nodes. If not it push it on a right place
     *
     * @method _addToNodes
     * @param {Vaultier.dal.model.Node} modelNode
     * @param {Vaultier.Document.Node} parentTreeNode
     * @private
     * @return {Vaultier.Document.Node}
     */
    _addToNodes: function (modelNode, parentTreeNode) {
        console.log(parentTreeNode);
        var nodeAlreadyInArray = this._getNodeFromNodesArray(modelNode.get('id'));
        console.log(nodeAlreadyInArray);
        if (!nodeAlreadyInArray) {
            console.log(modelNode);
            var treeNode = this._createNode(modelNode, parentTreeNode);
            treeNode.id = modelNode.get('id');

            this._insertNodeOnRightPlace(treeNode, parentTreeNode);
            return treeNode;
        }
        return nodeAlreadyInArray;
    },

    /**
     * It inserts the node on a right place next to its parent
     *
     * @method _addToNodes
     * @param {Vaultier.Document.Node} treeNode
     * @param {Vaultier.Document.Node} parentTreeNode
     * @private
     * @return {Vaultier.Document.Node}
     */
    _insertNodeOnRightPlace: function (treeNode, parentTreeNode) {
        var indexToInputNode =
            this.nodes.get('content').indexOf(parentTreeNode)
            + parentTreeNode.get('children.length');
        console.log(this.nodes.get('content').indexOf(parentTreeNode));
        console.log(indexToInputNode);
        this.nodes.insertAt(indexToInputNode, treeNode);
    },

    /**
     * Helper method for check if node is in array.
     *
     * @method _getNodeFromNodesArray
     * @param id
     * @private
     * @returns {Vaultier.Document.Node|null}
     */
    _getNodeFromNodesArray: function (id) {
        var nodeAlreadyInArray = null;
        this.nodes.forEach(function (node) {
            if (node.get('id') == id) {
                nodeAlreadyInArray = node;
            }
        });
        return nodeAlreadyInArray;
    }

});
