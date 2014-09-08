Vaultier.RollbackMixin = Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        this.on('didLoad', function () {
            this.storeCleanValues();
        }.bind(this));
        this.on('didUpdate', function () {
            this.storeCleanValues();
        }.bind(this));
        this.on('didCreate', function () {
            this.storeCleanValues();
        }.bind(this));

        this.storeCleanValues();
    },

    cleanValues: {},

    storeCleanValues: function () {
        this.set('cleanValues', {});
        Ember.get(this.constructor, 'fields').forEach(function (field) {
            this.set('cleanValues.' + field, this.get(field));
        }.bind(this));
    },

    rollback: function () {
        if (this.get('isSaving')) {
            throw Error('Cannot rollback. Record is in state isSaving.')
        }
        Ember.get(this.constructor, 'fields').forEach(function (field) {
            this.set(field, this.get('cleanValues.' + field));
        }.bind(this));
        this.set('isDirty', false);
    }

});
