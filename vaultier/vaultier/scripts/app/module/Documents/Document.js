Vaultier.DocumentRoute = Ember.Route.extend({

    model: function (params, queryParams) {
        return ApplicationKernel.UI.showLoaderUponPromise(this.get('tree').getNodeById(params.document));
    },

    setupController: function (ctrl, model) {
        console.log('Vaultier.DocumentRoute setupController');
        console.log(model);
        if (model) {
            this.get('tree').setSelectedNode(model);
        }

        console.log(this.get('tree').nodes);
        console.log(this.get('tree').getSelectedNode());

        var parents = this.get('tree').getParents(this.get('tree').getSelectedNode());
        if (parents) {
            parents.forEach(function (node) {
                node.set('isOpened', true);
            });
        }
        ctrl.set('currentDocument', this.get('tree').getSelectedNode());
        ctrl.set('content', this.get('tree').getAllTreeNodes());

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
        console.log('Vaultier.DocumentController zmena');
        console.log(node);
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

                    console.log(newSelectedNode);
                    console.log(this.get('tree').getAllTreeNodes());

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
    }.property('controller.currentDocument', 'controller.currentDocument.children.@each')

});
