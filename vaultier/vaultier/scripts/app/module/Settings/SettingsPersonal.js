Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'});
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'));
            ctrl.get('controllers.Settings').set('toolbar', this.createToolbar());
        },

        createToolbar: function () {
            return Vaultier.Toolbar.create({router: this.get('router')})
                .prepareBuilder()
                .addBreadcrumbSettings()
                .addBreadcrumbSettingsPersonal();
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                var promise = record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your changes have been saved successfully.', 'success');
                    }.bind(this),
                    function () {
                        $.notify('Ooops! Something went wrong.', 'error');
                    });

                ApplicationKernel.UI.showLoaderUponPromise(promise);
            }

        }
    });

Vaultier.SettingsPersonalController = Ember.ObjectController.extend({
    needs: ['Settings']
});

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});