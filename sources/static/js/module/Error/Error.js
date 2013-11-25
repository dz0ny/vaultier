Vaultier.ErrorGenericRoute = Ember.Route.extend({

    parseError: function (error) {
        var data = {
            title: 'Oooups! Something wrong happen here',
            message: 'Fatal error',
            template: 'ErrorGeneric'
        }

        if (error && error.message) {
            data.message = error.message
        }

        if (error && error.status == 403) {
            data.title = 'Access denied!';
            data.message = 'You do not have access to desired area'
        }

        if (error && error.status == 404) {
            data.template = 'Error404'
        }

        return data

    },

    setupController: function (ctrl) {
        try {
            var data = this.parseError(ctrl.get('error'));
            ctrl.set('error', null)
            ctrl.set('content', data)
            return ctrl
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--')
            console.error(e.stack)
        }
    },

    renderTemplate: function () {
        try {
            var template = this.get('controller.content.template');
            this.render(template)
        } catch (e) {
            console.error('--CANNOT-RENDER-ERROR--')
            console.error(e.stack)
        }
    }


})


Vaultier.ErrorGenericController = Ember.Controller.extend({
    message: 'Oooups! Error'
});

Vaultier.ErrorGenericView = Ember.View.extend({
    templateName: 'Error/ErrorGeneric',
    layoutName: 'Layout/LayoutError'
});

Vaultier.Error404View = Ember.View.extend({
    templateName: 'Error/Error404',
    layoutName: 'Layout/LayoutError'
});



