Vaultier.Router.map(function () {
    this.resource('VaultList', { path: '/vaults', queryParams: ['sort'] }, function () {
        this.route('new');
    });
});


Vaultier.VaultListRoute = Ember.Route.extend({
    renderTemplate: function (controller, model) {
        this.render('VaultList');
    },
    setupController: function (controller, model, queryParams) {
        queryParams.sort = queryParams.sort || 'recent';
        controller.set('sortProperties', [queryParams.sort]);

        return this._super(controller, model);
    },
    model: function () {
        var store = this.get('store');

//        store.push('vault', {
//            name: "Manually"
//        });

        return store.find('vault');

    }
});


Vaultier.VaultListNewRoute = Ember.Route.extend({
    renderTemplate: function () {
        this.render('VaultModal', {
            into: 'application',
            outlet: 'modal'
        });
    },

//    deactivate: function () {
//      this.disconnectOutlet({
//            parentView: 'application',
//        outlet: 'modal'
//      });
//    },
    actions: {
        cancel: function (item) {
            item.get('store').deleteRecord(item);
            return this.transitionTo('VaultList');
        },
        submit: function (item) {
            item.one('didCreate', $.proxy(function () {
                return this.transitionTo('VaultList');
            }, this));
            item.save();
        }
    },
    model: function () {
        return this.get('store').createRecord('vault');
    }
});

Vaultier.IndexRoute = Ember.Route.extend({
    redirect: function () {
        return this.transitionTo('VaultList');
    }
});
