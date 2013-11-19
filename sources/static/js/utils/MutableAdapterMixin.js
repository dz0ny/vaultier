Po.NS('Utils');


/**
 * Usage:
 *
 *     overrides: {
 *         'Workspace': {
 *             find: function (store, type, id) {
 *                  // your own code here
 *             }
 *        }
 *     },
 *
 *     @todo: add more methods by need
 *
 */
Utils.MutableMethodsAdapterMixin = Ember.Mixin.create({

    getOverride: function (name, type) {
        type = type.typeKey;
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


/**
 * Usage:
 *
 *     urls: {
 *         'Workspace': 'http://my.special.url'
 *     },
 *
 */
Utils.MutableUrlsAdapterMixin = Ember.Mixin.create({
     buildURL: function (type, id) {
            if (this.urls[type]) {
                url = this.urls[type];
                if (id) {
                    if (url.charAt(url.length - 1) !== '/') {
                        url += '/';
                    }
                    url = url + id;
                }
                return url;
            } else {
                return this._super(type, id)
            }
        }
});