ApplicationKernel.namespace('Vaultier.dal.core');

/**
 * Base serializer, all custom adapters should be extension of this serializer
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.JSONSerializer
 */
Vaultier.dal.core.JSONSerializer = RESTless.JSONSerializer.extend({
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


/**
 * Base adapter, all custom adapters should be extension of this adapter
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.JSONSerializer
 */
Vaultier.dal.core.RESTAdapter = RL.RESTAdapter.extend(
    Vaultier.dal.field.Object,
    {
        url: '/',
        namespace: 'api',

        serializer: Vaultier.dal.core.JSONSerializer.create(),

        buildUrl: function (model, key, klass) {
            var resourcePath = this.resourcePath(Ember.get(klass, 'resourceName'));
            var resourceListFormat = Ember.get(klass, 'resourceListFormat');
            var resourceDetailFormat = Ember.get(klass, 'resourceDetailFormat');
            var resourceFormat
            var rootPath = this.get('rootPath');
            var primaryKeyName = Ember.get(klass, 'primaryKey');
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
                .replace('{rootPath}', rootPath)
                .replace('{resourcePath}', resourcePath)
                .replace('{id}', id)
                .replace('{dataType}', dataType)

            return url;
        }
    });




