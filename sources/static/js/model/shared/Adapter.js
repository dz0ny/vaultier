Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend(
    Utils.MutableAdapterMixin,
    {

        overrides: {
            'Vaultier.MemberRole': {
                findQuery: function (store, type, query) {
                    var url = '/api/members/{id}/roles/?hash={hash}'
                        .replace('{id}', query.id)
                        .replace('{hash}', query.hash);
                    return this.ajax(url, 'GET', { data: query });
                }
            }
        },


//        urls: {
//            AuthenticatedUser: '/api/auth/user'
//        },

//        ajax: function (url, type, hash) {
//            console.log(arguments);
//            return this._super(url, type, hash)
//        },

//        ajaxError: function (error) {
//            var superError = this._super(error);
//            superError.status = error.status;
//            return superError;
//        },
//
//        buildURL: function (type, id) {
//            if (this.urls[type]) {
//                url = this.urls[type];
//                if (id) {
//                    if (url.charAt(url.length - 1) !== '/') {
//                        url += '/';
//                    }
//                    url = url + id;
//                }
//                return url;
//            } else {
//                return this._super(type, id)
//            }
//        },
        namespace: 'api'
    });


/**
 * This code forces always to do ajax queries to server
 */
Vaultier.Store = DS.Store.extend({

    loadMore: function (type, query) {
        query = typeof query == 'object' ? query : {};
        return this._super(type, query);
    },

    loadOne: function (type, id) {
        type = this.modelFor(type);
        var record = this.recordForId(type, id);
        if (record.currentState.stateName != 'root.empty' && reload) {
            return record.reload()
        } else {
            return this.findById(type, id);
        }
    }
});

