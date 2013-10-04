//Vaultier.VaultCreateRoute = Ember.Route.extend({
//    renderTemplate: function () {
//        this.render('VaultCreate', {
//            into: 'application',
//            outlet: 'modal'
//        });
//    },
//
//    actions: {
//        cancel: function (item) {
//            item.get('store').deleteRecord(item);
//            return this.transitionTo('Vault.index');
//        },
//        submit: function (item) {
//            item.one('didCreate', $.proxy(function () {
//                return this.transitionTo('Vault.index');
//            }, this));
//            item.save();
//        }
//    },
//
//    model: function () {
//        var model = this.get('store').createRecord('vault')
//        return this._super(model);
//    }
//});
