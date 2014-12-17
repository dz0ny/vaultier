Vaultier.DocumentRoute = Ember.Route.extend({

    model: function (params, queryParams) {
        Utils.Logger.log.debug('Vaultier.DocumentRoute setupController');

        return ApplicationKernel.UI.showLoaderUponPromise(
            Ember.RSVP
                .hash({
                    node: this.get('tree').getNodeById(params.document),
                    role_node: this.get('store').find('Role', { node: params.document }),
                    role_parent_node: this.get('store').find('Role', { parent_node: params.document })
                })
        );
    },

    setupController: function (ctrl, model) {
        Utils.Logger.log.debug('Vaultier.DocumentRoute setupController');
        Utils.Logger.log.debug(model.node);
        if (model.node) {
            this.get('tree').setSelectedNode(model.node);
        }

        var selectedNode = this.get('tree').getSelectedNode();
        this.get('auth').checkPermissionsForNode(selectedNode, Vaultier.dal.model.Role.proto().permissions.READ);

        Utils.Logger.log.debug(this.get('tree').nodes);
        Utils.Logger.log.debug(this.get('tree').getSelectedNode());

        var parents = this.get('tree').getParents(this.get('tree').getSelectedNode());
        if (parents) {
            parents.forEach(function (node) {
                node.set('isOpened', true);
            });
        }
        ctrl.set('currentDocument', this.get('tree').getSelectedNode());
        ctrl.set('content', this.get('tree').getAllTreeNodes());

        var roles = [].concat(model.role_node.toArray(), model.role_parent_node.toArray());
        ctrl.set('roles', roles);

        return model;
    }

});

Vaultier.DocumentTreeNodeView = Vaultier.Document.TreeNode.extend({

});

Vaultier.DocumentController = Vaultier.Document.TreeController.extend({

    /**
     * @property {String} treeNodeViewClass
     */
    treeNodeViewClass: 'Vaultier.DocumentTreeNodeView',

    /**
     * @property {Vaultier.DocumentController} treeController
     */
    treeController: function () {
        return this;
    }.property(),

    /**
     * @property treeContent
     */
    treeContent: function () {
        return this.get('content');
    }.property(),

    /**
     * Handler for event when node is changed
     *
     * @param {Vaultier.Document.Node} node
     */
    nodeSelectionStateChanged: function (node) {
        Utils.Logger.log.debug('Vaultier.DocumentController zmena');
        Utils.Logger.log.debug(node);
        this.get('tree').setSelectedNode(node);
        this.set('currentDocument', this.get('tree').getSelectedNode());
    },

    actions: {

        changeNode: function (node) {
            if (node.get('folder')) {
                this.transitionTo('Document.list', node.get('id'));
            } else {
                this.transitionTo('Document.detail', node.get('id'));
            }

        },

        moveNode: function () {
            var moveNode = this.get('tree').getSelectedNode();
            this.transitionTo('Document.move', moveNode.get('id'));
        },


        removeNode: function () {
            var removeNode = this.get('tree').getSelectedNode();
            var newSelectedNode = this.get('tree')._findCandidateForReplaceSelectedNode(removeNode);
            var typeOfRemoveNode = Vaultier.dal.model.Node.proto().types.getByValue(removeNode.get('type')).text;
            this.get('tree')
                .removeNode(removeNode)
                .then(function () {

                    Utils.Logger.log.debug(newSelectedNode);
                    Utils.Logger.log.debug(this.get('tree').getAllTreeNodes());

                    $.notify('Your ' + typeOfRemoveNode + ' has been deleted successfully.', 'success');

                    if (newSelectedNode.get('type') == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                        this.transitionTo('Document.list', newSelectedNode.get('id'));
                    } else {
                        this.transitionTo('Document.detail', newSelectedNode.get('id'));
                    }

                    //TODO if we remove last node we have to show it to user


                }.bind(this),

                function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    return null;
                }
            );
        }

    }

});

Vaultier.DocumentView = Ember.View.extend({

    classNames: 'ember-app',

    templateName: 'Documents/Document',

    layoutName: 'Layout/LayoutStandard',

    currentDocument: function () {
        return this.get('controller.currentDocument');
    }.property('controller.currentDocument', 'controller.currentDocument.children.@each'),

    roles: function () {
        return this.get('controller.roles');
    }.property('controller.roles')

});
