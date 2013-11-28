Vaultier.ErrorGenericController = Ember.Controller.extend({
    content: {
        title: 'Oooups! Error',
        message: ''
    }
});

Vaultier.ErrorGenericView = Ember.View.extend({
    templateName: 'Error/ErrorGeneric',
    layoutName: 'Layout/LayoutError'
});

Vaultier.Error404View = Ember.View.extend({
    templateName: 'Error/Error404',
    layoutName: 'Layout/LayoutError'
});



