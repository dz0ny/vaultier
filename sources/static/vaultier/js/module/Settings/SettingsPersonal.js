Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'))

                        // set breadcrumbs
            ctrl.get('controllers.Settings').set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
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
                        $.notify('Your changes has been successfully saved.', 'success');
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    })

                ApplicationLoader.promise(promise)
            }

        }
    });

Vaultier.SettingsPersonalController = Ember.ObjectController.extend({
    needs: ['Settings']
});

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});