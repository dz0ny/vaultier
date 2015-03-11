import Ember from 'ember';
import JSONSerializer from './json-serializer';
import ObjectFieldMixin from './../field/object-field-mixin';
/* global RL */

/**
 * Base adapter, all custom adapters should be extension of this adapter
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.JSONSerializer
 */
export default RL.RESTAdapter.extend(
    ObjectFieldMixin,
    {
        url: '/',
        namespace: 'api',

        serializer: JSONSerializer.create(),

        /**
         * Computed path based on host and namespace.
         * @property rootPath
         * @type String
         * @final
        */
        rootPath: Ember.computed(function() {
            var ns = this.get('namespace');
            return '/' + ns;

        }).property('host', 'namespace'),

        buildUrl: function (model, key, klass) {
            var resourcePath = this.resourcePath(Ember.get(klass, 'resourceName'));
            var resourceListFormat = Ember.get(klass, 'resourceListFormat');
            var resourceDetailFormat = Ember.get(klass, 'resourceDetailFormat');
            var resourceFormat;
            var rootPath = this.get('rootPath');
            var primaryKeyName = Ember.get(klass, 'primaryKey');
            var dataType = '';
            var url;
            var id = '';

            if (key) {
                id = key;
            } else if (model.get(primaryKeyName)) {
                id = model.get(primaryKeyName);
            }

            if (this.get('useContentTypeExtension') && dataType) {
                dataType = this.get('serializer.dataType');
            }

            if (!resourceListFormat) {
                resourceListFormat = '{rootPath}/{resourcePath}/{dataType}';
            }

            if (!resourceDetailFormat) {
                resourceDetailFormat = '{rootPath}/{resourcePath}/{id}/{dataType}';
            }

            resourceFormat = id ? resourceDetailFormat : resourceListFormat;

            url = resourceFormat
                .replace('{rootPath}', rootPath)
                .replace('{resourcePath}', resourcePath)
                .replace('{id}', id)
                .replace('{dataType}', dataType);

            return url;
        }
    });




