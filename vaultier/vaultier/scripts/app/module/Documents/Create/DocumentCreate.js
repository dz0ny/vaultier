Vaultier.DocumentCreateRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            Utils.Logger.log.debug('Vaultier.DocumentCreateRoute');

            return this.get('store').createRecord('Node');
        },

        afterModel: function (model, transition) {

            var parentTreeNode = this.get('tree').getSelectedNode();
            this.get('auth').checkPermissionsForNode(parentTreeNode, Vaultier.dal.model.Role.proto().permissions.CREATE);

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

            var selectedNode = this.get('tree').getSelectedNode();
            var rootNode = this.get('tree').getRootNodeForNode(selectedNode);
            Utils.Logger.log.debug(rootNode.get('membership'));
            model.set('membership', rootNode.get('membership'));


            Utils.Logger.log.debug(this.typeTemplate);
            return model;
        },

        setupController: function (ctrl, model) {
            Utils.Logger.log.debug('Vaultier.DocumentCreateController setupController');


            var parentTreeNode = this.get('tree').getSelectedNode();
            if (parentTreeNode.get('type') != Vaultier.dal.model.Node.proto().types.FOLDER.value) {
                throw new Error('You can create items for non-folder nodes');
            }
            model.set('parent', parentTreeNode.get('id'));


            ctrl.set('typeName', this.typeName);
            ctrl.set('content', Vaultier.Document.Node.create({
                content: model
            }));

            ctrl.get('controllers.Document').set('toolbar', this.createToolbar());
        },

        createToolbar: function () {
            Utils.Logger.log.debug('createToolbar');
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbParentsOfDocument(this.get('tree').getParents(this.get('tree').getSelectedNode()))
                .addBreadcrumbDocument(this.get('tree').getSelectedNode())
                .addBreadcrumbDocumentCreate(this.typeName);
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
                    var promise = record.get('content')
                        .saveRecord()
                        .then(function (response) {
                            this.get('tree').addNode(record.get('content'));
                            $.notify('Your '
                                + Vaultier.dal.model.Node.proto().types.getByValue(record.get('type') ).text
                                + ' has been created successfully.', 'success');
                            Utils.Logger.log.debug(record);
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

        var el = $(this.get('element'));
        var input = el.find('.vlt-secret-type-file');
        var controller = this.get('controller');
        input.on('change', function (e) {

            var files = FileAPI.getFiles(e);
            FileAPI.readAsBinaryString(files[0], function (evt) {
                if (evt.type == 'load') {
                    var data = evt.result;
                    var size = evt.result.length;

                    if (size > 10000000) {
                        input.closest('.form-group').addClass('has-error');
                        $.notify('Maximum filesize of 25K exceeded!', 'error');
                    } else {
                        // Success
                        input.closest('.form-group').removeClass('has-error');
                        controller.set('content.content.blob.filedata', data);
                        controller.set('content.content.blob.filename', files[0].name);
                        controller.set('content.content.blob.filesize', files[0].size);
                        controller.set('content.content.blob.filetype', files[0].type);

                        controller.set('content.content.filename', files[0].name);
                        controller.set('content.content.filesize', files[0].size);

                        $(el).find('.vlt-filename').attr('value', files[0].name);

                    }
                }
            })
        })
    }

});