Vaultier.VaultIndexRoute = Ember.Route.extend({
    actions: {
        create: function () {
            var record = this.get('store').createRecord('vault');
            var controller = this.controllerFor('VaultCreate');

            controller.openModal({
                record: record,
                route: this
            })
        }
    },

    renderTemplate: function (controller, model) {
        this._super(controller, model);
        this.render('VaultIndex');
    },

    setupController: function (controller, model, queryParams) {
        var c = controller;
        console.log(controller.constructor);
        c.set('tstval', 'RCL');

        Ember.run.later(this, function () {
            console.log('set');
            c.set('tstval', 'RCL3');
        }, 2000)

        Ember.run.later(this, function () {
//            this.transitionTo('VaultList.new');
        }, 4000)


        //   queryParams.sort = queryParams.sort || 'recent';
        //   controller.set('sortProperties', [queryParams.sort]);

        return this._super(controller, model);
    },
    model: function () {
        var store = this.get('store');
        var promise = store.find('vault');
        return this._super(promise);
    }
});


Vaultier.VaultIndexController = Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    actions: {
        createVault: function () {
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


Vaultier.VaultIndexView = Ember.View.extend({
    templateName: 'Vault/Index',
    layoutName: 'Layout/Layout'
//    controller: Vaultier.VaultListController
});


Vaultier.VaultIndexItemView = Ember.View.extend({
    templateName: 'Vault/IndexItem'
});
