Vaultier.CardIndexRoute = Ember.Route.extend({
    actions: {
        create: function () {
            var record = this.get('store').createRecord('vault');
            var controller = this.controllerFor('CardCreate');

            controller.openModal({
                record: record,
                route: this
            })
        }
    },
    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        ctrl.set('env', Vaultier.Services.Context.ContextService.current());

        ctrl.set('breadcrumbs',
            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addCurrentWorkspace()
                .addLink('CardIndex', 'List of vaults', {workspace: '_env'})
        )
    },

    model: function (params, queryParams) {
        return Vaultier.Services.Context.ContextService.current().executeRoute(this, params, queryParams).then(function () {
            var store = this.get('store');
            return store.find('Card');
        }.bind(this));
    }
});


Vaultier.CardIndexController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createCard: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.CardIndexView = Ember.View.extend({
    templateName: 'Card/Index',
    layoutName: 'Layout/LayoutStandard'
//    controller: Vaultier.CardListController
});


Vaultier.CardIndexItemView = Ember.View.extend({
    templateName: 'Card/IndexItem'
});
