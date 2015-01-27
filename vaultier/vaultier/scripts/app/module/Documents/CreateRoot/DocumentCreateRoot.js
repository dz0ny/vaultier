Vaultier.DocumentsCreateRootRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            Utils.Logger.log.debug('Vaultier.DocumentsCreateRootRoute');

            var node = this.get('store').createRecord('Node');

            return node;
        },


        setupController: function (ctrl, model) {
            Utils.Logger.log.debug('Vaultier.DocumentsCreateController setupController');

            model.set('type', Vaultier.dal.model.Node.proto().types.FOLDER.value);
            ctrl.set('typeName', "Root Folder");
            ctrl.set('content', model);

            ctrl.set('toolbar', this.createToolbar());

        },

        createToolbar: function () {
            Utils.Logger.log.debug('createToolbar');
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbDocumentCreate("Root Folder")
        },

        renderTemplate: function () {
            this.render('DocumentsCreateRoot');
            this.render('Documents/TypeEditable/DocumentTypeEditableFolder', {outlet: 'center', into: 'DocumentsCreateRoot'});
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
                            Utils.Logger.log.debug(response);
                            this.get('tree').addRootNode(record, response.id);
                            $.notify('Your folder has been created successfully.', 'success');
                            this.transitionTo('Document.list', record.get('id'));
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

Vaultier.DocumentsCreateRootController = Ember.Controller.extend({
    submitButtonShown: false,
    needs: ['Documents']
});

Vaultier.DocumentsCreateRootView = Ember.View.extend({
    templateName: 'Documents/CreateRoot/DocumentCreateRoot',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        this.get('parentView').set('showLeftTreeNodePanel', false);
    }

});