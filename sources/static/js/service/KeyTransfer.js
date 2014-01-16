Po.NS('Service');

Service.KeyTransfer = Ember.Object.extend({


    /**
     * @DI Service.Coder
     */
    coder: null,

    /**
     * @DI service:members
     */
    members: null,
    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI store:main
     */
    store: null,

    interval: 10000,

    _registeredQuery: null,

    init: function () {
        this._super.apply(this, arguments);
        this.register();
    },

    destroy: function () {
        this.unregister();
        this._super.apply(this, arguments);
    },

    register: function () {
        if (this._registeredQuery) {
            throw Error('Already registered')
        }

        var query = this._query.bind(this);
        this._registeredQuery = setInterval(query, this.interval)
        query();
    },

    unregister: function () {
        clearInterval(this._registeredQuery)
        this._registeredQuery = null
    },

    _query: function () {
        if (this.get('auth.isAuthenticated')) {
            this.get('store')
                .find('WorkspaceKey')
                .then(function (members) {
                    var promises = []
                    members.forEach(function (member) {

                        // for each member
                        var workspaceId = member.get('workspace');
                        if (workspaceId) {
                            this.get('store').find('Workspace', workspaceId)
                                .then(function (workspace) {
                                    try {
                                        var encryptedKey = workspace.get('membership.workspace_key');
                                        var decryptedKey = this.decryptWorkspaceKey(encryptedKey);
                                        promises.push(this.transferKeyToMember(member, decryptedKey));
                                    } catch (error) {
                                        console.error('Keytransfer failed for member {id}'.replace('{id}', member.get('id')))
                                        console.error(error.stack);
                                    }
                                }.bind(this));
                        } else {
                            console.error('missing workspace id')
                        }

                    }.bind(this));

                    return Ember.RSVP.all(promises);
                }.bind(this))
        }
    },

    generateWorkspaceKey: function () {
        return this.get('coder').generateWorkspaceKey();
    },

    decryptWorkspaceKey: function (encryptedKey) {
        var key = encryptedKey;

        var coder = this.get('coder');
        var privateKey = this.get('auth.privateKey');
        key = coder.decryptRSA(key, privateKey);
        if (!key) {
            throw new Error('Cannot decrypt workspace key')
        }
        return key
    },


    transferKeyToMember: function (member, decryptedKey) {
        var store = this.get('store');
        var coder = this.get('coder');
          var promise =
            store.find('WorkspaceKey', member.get('id'))
                .then(function (member) {
                    var publicKey = member.get('public_key')
                    var wk = coder.encryptRSA(decryptedKey, publicKey);
                    member.set('workspace_key', wk)
                    return member.saveRecord()
                })

        return promise
    }

});

