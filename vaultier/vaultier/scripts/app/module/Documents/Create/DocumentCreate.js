Vaultier.DocumentCreateRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            console.log('Vaultier.DocumentCreateRoute');

            // check permissions
//            if (!this.get('auth').checkPermissions(transition, function () {
//                return this.modelFor('Card').get('perms.create');
//            }.bind(this), true)) {
//                return;
//            }

            var node = this.get('store').createRecord('Node');

            return node;
        },

        afterModel: function (model, transition) {

            switch (transition.params['Document.create'].type) {

                case Vaultier.dal.model.Node.proto().types.FOLDER.text:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableFolder';
                    this.typeName = "Folder";
                    model.set('type', Vaultier.dal.model.Node.proto().types.FOLDER.value);
                    break;

                case Vaultier.dal.model.Node.proto().types.NOTE.text:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableNote';
                    this.typeName = "Note";
                    model.set('type', Vaultier.dal.model.Node.proto().types.NOTE.value);
                    break;

                case Vaultier.dal.model.Node.proto().types.PASSWORD.text:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditablePassword';
                    this.typeName = "Password";
                    model.set('type', Vaultier.dal.model.Node.proto().types.PASSWORD.value);
                    break;

                case Vaultier.dal.model.Node.proto().types.FILE.text:
                    this.typeTemplate = 'Documents/TypeEditable/DocumentTypeEditableFile';
                    this.typeName = "File";
                    model.set('type', Vaultier.dal.model.Node.proto().types.FILE.value);
                    break;

                default:
                    this.typeTemplate = null;
                    this.typeName = null;
            }

            console.log(this.typeTemplate);
            return model;
        },

        setupController: function (ctrl, model) {
            console.log('Vaultier.DocumentCreateController setupController');


            var parentTreeNode = this.get('tree').getSelectedNode();
            if (parentTreeNode.get('type') != Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                throw new Error('You can create items for non-folder nodes');
            }
            model.set('parent', parentTreeNode.get('id'));


            ctrl.set('typeName', this.typeName);
            ctrl.set('content', model);

            ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
        },

        createToolbar: function () {
            console.log('createToolbar');
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addDocument(this.get('tree').getSelectedNode())
                .addDocumentCreate(this.typeName);
        },

        renderTemplate: function () {
            this.render('DocumentCreate', {outlet: 'content'});
            this.render(this.typeTemplate, {outlet: 'center', into: 'DocumentCreate'});
        },

        actions: {
            submit: function () {
                var record = this.get('controller.content');
                var notifyError = function (error) {
                    $.notify('Ooops! Something went wrong.', 'error');
                    throw error;
                };

                try {
                    var promise = record
                        .saveRecord()
                        .then(function (response) {
                            this.get('tree').addNode(record);
                            $.notify('Your secret has been created successfully.', 'success');
                            console.log(record);
                            if (record.get('type') == Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                                this.transitionTo('Document.list', record.get('id'));
                            } else {
                                this.transitionTo('Document.detail', record.get('id'));
                            }
                        }.bind(this))
                        .catch(notifyError);

                    ApplicationKernel.UI.showLoaderUponPromise(promise);
                } catch (e) {
                    ApplicationKernel.UI.hideLoader();
                    notifyError(e);
                }
            }
        }

    });

Vaultier.DocumentCreateController = Ember.Controller.extend({

    submitButtonShown: false,

    /**
     * @property {Array} needs
     */
    needs: ['Document']
});

Vaultier.DocumentCreateView = Ember.View.extend({

    /**
     * @property {String} templateName
     */
    templateName: 'Documents/Create/DocumentCreate',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', false);
    }

});