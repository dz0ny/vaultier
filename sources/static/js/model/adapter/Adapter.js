Vaultier.JSONSerializer = RESTless.JSONSerializer.extend({
    // Vaultier posts are native jsons without root
    serialize: function (resource, options) {
        return this._super.apply(this, [resource, {nonEmbedded: true}]);
    },

    // Vaultier does not use camelizations
    attributeNameForKey: function (klass, key) {
        return key;
    }
});

Vaultier.RESTAdapter = RL.RESTAdapter.extend({
    url: '/',
    namespace: 'api',

    serializer: Vaultier.JSONSerializer.create(),

    buildUrl: function (model, key) {
        var url = this._super.apply(this, arguments);
        return url + '/';
    }
}).create()

Vaultier.RESTAdapter.registerTransform('object', {
    deserialize: function (native) {
        return native;
    },
    serialize: function (deserialized) {
        return deserialized ? JSON.stringify(deserialized) : null
    }
});

Vaultier.Client = RL.Client.create({
    adapter: Vaultier.RESTAdapter,

    createRecord: function (cls, data) {
        return Vaultier[cls].create(data);
    },

    find: function () {
        var model = arguments[0];
        var params = arguments[1];
        return Vaultier[model].fetch(params)
    }

});


