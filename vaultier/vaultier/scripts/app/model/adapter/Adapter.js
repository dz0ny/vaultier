Vaultier.JSONSerializer = RESTless.JSONSerializer.extend({
    // Vaultier posts are native jsons without root
    serialize: function (resource, options) {
        options = options || {};
        options.nonEmbedded = true;
        return this._super.apply(this, [resource, options]);
    },

    keyForResourceName: function (name) {
        return name
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
        var resourcePath = this.resourcePath(Ember.get(model.constructor, 'resourceName'));
        var resourceListFormat = Ember.get(model.constructor, 'resourceListFormat');
        var resourceDetailFormat =  Ember.get(model.constructor, 'resourceDetailFormat');
        var resourceFormat
        var rootPath = this.get('rootPath');
        var primaryKeyName = Ember.get(model.constructor, 'primaryKey');
        var dataType = ''
        var url;
        var id = '';

        if (key) {
            id = key;
        } else if (model.get(primaryKeyName)) {
            id = model.get(primaryKeyName);
        }

        if (this.get('useContentTypeExtension') && dataType) {
            var dataType = this.get('serializer.dataType');
        }

        if (!resourceListFormat) {
            resourceListFormat = '{rootPath}/{resourcePath}/{dataType}'
        }

        if (!resourceDetailFormat) {
            resourceDetailFormat = '{rootPath}/{resourcePath}/{id}/{dataType}'
        }

        resourceFormat = id ? resourceDetailFormat : resourceListFormat

        var url = resourceFormat
            .replace('{rootPath}',rootPath)
            .replace('{resourcePath}', resourcePath)
            .replace('{id}', id)
            .replace('{dataType}', dataType)

        return url;
    }
}).create()

Vaultier.RESTAdapter.registerTransform('object', {
    deserialize: function (native) {
        return native;
    },
    serialize: function (deserialized) {
        return deserialized
    }
});

Vaultier.RESTAdapter.configure("plurals", {
   news: 'news'
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
