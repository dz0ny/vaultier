import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Object.extend({


    /**
     * @DI Service.Coder
     */
    coder: inject('service:coder'),

    /**
     * @DI service:auth
     */
    auth: inject('service:auth'),

    /**
     * @DI store:main
     */
    store: inject('store:main'),

    interval: 60000,

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
            throw Error('Already registered');
        }

        var query = this._query.bind(this);
      //@todo: not use setInterval, exchange for Ember.run.later
        this._registeredQuery = setInterval(query, this.interval);
        query();
    },

    unregister: function () {
      //@todo: same here
        clearInterval(this._registeredQuery);
        this._registeredQuery = null;
    },

    _query: function () {
        if (this.get('auth.isAuthenticated')) {
            this.get('store')
                .find('WorkspaceKey')
                .then(function (members) {
                    var promises = [];
                    members.forEach(function (member) {
                        // do only for foreign memberships
                        if (member.get('user') !== this.get('auth.user.id')) {

                            // for each member
                            var nodeId = member.get('node');
                            if (nodeId) {
                                this.get('store').find('Node', nodeId)
                                    .then(function (node) {
                                        try {
                                            var encryptedKey = node.get('membership.workspace_key');
                                            var decryptedKey = this.decryptNodeKey(encryptedKey);
                                            promises.push(this.transferKeyToMember(member, decryptedKey));
                                        } catch (error) {
                                            console.error('Keytransfer failed for member {id}'.replace('{id}', member.get('id')));
                                            console.error(error.stack);
                                        }
                                    }.bind(this));
                            } else {
                                console.error('missing node id');
                            }
                        }
                    }.bind(this));

                    return Ember.RSVP.all(promises);
                }.bind(this));
        }
    },

    generateNodeKey: function () {
        return this.get('coder').generateNodeKey();
    },

    decryptNodeKey: function (encryptedKey) {
        var key = encryptedKey;

        //Utils.Logger.log.debug(key);

        var coder = this.get('coder');
        var privateKey = this.get('auth.privateKey');
        key = coder.decryptNodeKey(key, privateKey);

        //Utils.Logger.log.debug(key);

        if (!key) {
            throw new Error('Cannot decrypt workspace key');
        }
        return key;
    },


    transferKeyToMember: function (memberId, decryptedKey) {
        var coder = this.get('coder');
        return this.get('store').find('WorkspaceKey', memberId)
            .then(function (member) {
                var publicKey = member.get('public_key');
                var wk = coder.encryptNodeKey(decryptedKey, publicKey);
                member.set('workspace_key', wk);
                return member.saveRecord();
            });
    }

});

