Vaultier.LayoutConfirmView = Ember.View.extend({
    templateName: 'Layout/Confirm',

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('.modal');
        el.modal('show');

        el.one('hidden.bs.modal', function () {
            this.get('controller.route').disconnectOutlet({
                parent: 'application',
                outlet: 'modal'
            });
        }.bind(this));
    },

    show: function (options) {
        var ctrl = options.route.get('container').lookup('controller:LayoutConfirm');
        ctrl.setProperties(options);

        options.route.render('LayoutConfirm', {
            into: 'application',
            outlet: 'modal',
            controller: 'LayoutConfirm'
        });
    },

    actions: {
        ok: function () {
            var fn = this.get('controller.fn');
            var el = Ember.$(this.get('element')).find('.modal');
            el.one('hidden.bs.modal', fn);
            el.modal('hide');
        }

    }
});

Vaultier.LayoutConfirmController = Ember.Controller.extend({
    text: null,
    fn: null,
    route: null,
    fn: null
})

Vaultier.confirmModal = function (route, text, fn) {
    var view = route.container.lookup('view:LayoutConfirm');
    view.show({
        title: 'Confirmation',
        text: text,
        route: route,
        fn: fn
    });
}

