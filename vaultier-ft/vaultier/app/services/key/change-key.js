import Ember from 'ember';

export default Ember.Object.extend({

    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI store:main
     */
    store: null,

    /**
     * @DI service:coder
     */

    coder: null,

    generateKeys: function (callback) {
        return this.get('auth').generateKeys(callback);
    },

    changeKey: function (incomingPPK) {

        if (!this.get('auth.isAuthenticated')) {
            throw Error('Only authenticated user can change his private key');
        }
        var currentPrivateKey = this.get('auth.privateKey');
        var incomingPrivateKey = incomingPPK.privateKey;
        var incomingPublicKey = incomingPPK.publicKey;
        var currentUser = this.get('auth.user');
        var coder = this.get('coder');

        var promise = this.get('store')
            .find('UserKey', currentUser.get('id'))
            .then(function (user) {
                // set user dirty, force update
                user.set('isDirty', true);

                // set public key for user
                user.set('public_key', incomingPublicKey);

                // update all nodes keys
                user.get('membership').forEach(function (member) {

                    //decode current node key
                    var nodeKey = coder.decryptNodeKey(
                        member.workspace_key,
                        currentPrivateKey
                    );

                    // encode new node key
                    var incomingNodeKey = coder.encryptNodeKey(
                        nodeKey,
                        incomingPublicKey
                    );

                    member.workspace_key = incomingNodeKey;
                }.bind(this));


                return user
                    // saves new keys
                    .saveRecord()

                    // then relogin with new credentials
                    .then(function () {
                        return this.get('auth').login(currentUser.get('email'), incomingPrivateKey);
                    }.bind(this));


            }.bind(this));

        return promise;
    }


});
