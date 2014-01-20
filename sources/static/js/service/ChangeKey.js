Po.NS('Service');

Service.ChangeKey = Ember.Object.extend({

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
            throw Error('Only authenticated user can change his privatekey');
        }
        var currentPrivateKey = this.get('auth.privateKey');
        var incomingPrivateKey = incomingPPK.privateKey;
        var incomingPublicKey = incomingPPK.publicKey;
        var coder = this.get('coder');

        this.get('store')
            .find('UserKey', this.get('auth.user.id'))
            .then(function (user) {
                // set public key for user
                user.set('public_key', incomingPublicKey)

                // update all workspace keys
                user.get('membership').forEach(function(member) {

                    //decode current workspace key
                    var workspaceKey = coder.decryptWorkspaceKey(
                        member.get('workspace_key'),
                        currentPrivateKey
                    )

                    var incomingWorkspaceKey = coder.encryptWorkspaceKey(
                        workspaceKey,
                        incomingPublicKey
                    )

                    member.set('workspace_key', incomingWorkspaceKey)
                }.bind(this));

                // saves user
                return user
                    .saveRecord()
                    .then(function() {
                        return user
                    });
            }.bind(this));

    }


});
