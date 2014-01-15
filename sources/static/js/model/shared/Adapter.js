/**
 * Slug solution:
 * http://stackoverflow.com/questions/19727250/ember-adds-empty-row-to-data-with-slug-as-id
 *
 * For ember slug is supplied as id. To use numeric id use pk on model
 *
 */
//Vaultier.ApplicationSerializer = DS.DjangoRESTSerializer.extend({
//    normalize: function(type, hash, property) {
//        hash.pk = hash.id;
//        if (type.typeKey == 'Workspace' || type.typeKey == 'Vault' || type.typeKey == 'Card') {
//            hash.id = hash.slug;
//        }
//        return this._super(type, hash, property);
//    }
//});

//Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend(
//    Utils.MutableMethodsAdapterMixin,
//    Utils.MutableUrlsAdapterMixin,
//    {
//
//        namespace: 'api',
//
//        overrides: {
//            'MemberRole': {
//                findQuery: function (store, type, query) {
//                    var url = '/api/members/{id}/roles/?hash={hash}'
//                        .replace('{id}', query.id)
//                        .replace('{hash}', query.hash);
//                    return this.ajax(url, 'GET', { data: query });
//                }
//            },
//
//            'MemberWorkspaceKey': {
//                updateRecord: function (store, type, record) {
//                    var url = '/api/members/{id}/workspace_key/'
//                        .replace('{id}', record.get('id'))
//                    var data = store.serializerFor(type.typeKey).serialize(record);
//                    return this.ajax(url, "PUT", { data: data });
//                },
//
//                find: function (store, type, id) {
//                    var url = '/api/members/{id}/workspace_key/'
//                        .replace('{id}', id)
//                    return this.ajax(url, "GET")
//                }
//            }
//
//        },
//
//        urls: {
////            AuthenticatedUser: '/api/auth/user'
//        },
//
//        /**
//         * Custom error wrapper adds status code to error for use in UI
//         */
//        ajaxError: function (error) {
//            var superError = this._super(error);
//            superError.status = error.status;
//            return superError;
//        }
//
//    });
//
//

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

//IntroApp.RESTAdapter.configure("plurals", {
//    category: "categories"
//});

Vaultier.RESTAdapter.registerTransform('object', {
    deserialize: function (native) {
        return native;
    },
    serialize: function (deserialized) {
        return deserialized ? JSON.stringify(deserialized) : null
    }
});

//Vaultier.RESTAdapter.map('Vaultier.Workspace', {
//  created_by: { key: 'created_by' }
//});

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


