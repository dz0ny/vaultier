Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'});
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'));

            // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Toolbar.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addSettings()
                    .addText('Personal settings')
            );
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