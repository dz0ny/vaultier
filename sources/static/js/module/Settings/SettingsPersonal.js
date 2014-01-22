Vaultier.SettingsPersonalRoute = Ember.Route.extend(
    {
        renderTemplate: function () {
            this.render('SettingsPersonal', {outlet: 'Settings'})
        },

        setupController: function (ctrl) {
            ctrl.set('content', this.get('auth.user'))
        },

        actions: {
            save: function () {
                var record = this.get('controller.content');
                record
                    .saveRecord()
                    .then(
                    function () {
                        $.notify('Your changes has been successfully saved.', 'success');
                    }.bind(this),
                    function () {
                        $.notify('Oooups! Something went wrong.', 'error');
                    })
            }
        }
    });

Vaultier.SettingsPersonalController = Ember.ObjectController.extend({})

Vaultier.SettingsPersonalView = Ember.View.extend({
    templateName: 'Settings/SettingsPersonal'
});