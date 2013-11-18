Po.NS('Utils');


/**
 * Usage:
 *
 *     overrides: {
 *         'Vaultier.Workspace': {
 *             find: function (store, type, id) {
 *                  // your own code here
 *             }
 *        }
 *     },
 *
 *     @todo: add more methods by need
 *
 */
Utils.MutableAdapterMixin = Ember.Mixin.create({

    getOverride: function (name, type) {
        type = type.toString();
        if (this.overrides && this.overrides[type] && this.overrides[type][name]) {
            return this.overrides[type][name];
        }
    },


    doOverride: function (name, type, args) {
        var override = this.getOverride(name, type);
        if (override) {
            return override.apply(this, args)
        } else {
            return this._super.apply(this, args)
        }
    },

    findQuery: function (store, type, query) {
        return this.doOverride('findQuery', type, arguments)
    },

    find: function (store, type, id) {
        return this.doOverride('find', type, arguments)
    }



})