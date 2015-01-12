ApplicationKernel.namespace('Service');

Service.WorkspaceKeyDecryptSoftError = function () {
    var error = Error.apply(this, arguments);
    this.stack = error.stack
}

Service.WorkspaceKey = Ember.Object.extend(
    Ember.Evented,
    {

        /**
         * @DI Service.Coder
         */
        coder: null,
        /**
         * @DI Service.Auth
         */
        auth: null,

        /**
         * @DI store:main
         */
        store: null,

        /**
         * @DI service:keytransfer
         */

        keytransfer: null,

        membersToApprove: null,
        workspace: null,
        workspaceKey: null,

        checkInterval: 60000,
        checkIntervalId: null,

        keys: {},

        init: function () {
            this._super(this, arguments);
        },

        startChecking: function (workspace) {
            // start checking interval
            this.set('checkIntervalId', setInterval(
                function () {
                    this.checkWorkspaceKey(workspace);
                }.bind(this),
                this.get('checkInterval')
            ));
        },

        stopChecking: function () {
            clearInterval(this.get('checkIntervalId'));
        },

        checkWorkspaceKey: function (rootNode) {
            this.get('store').find('Node', rootNode.get('id'))
                .then(function (rootNodeCheck) {
                    if (rootNodeCheck.get('membership.status') == Vaultier.dal.model.Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        rootNode.reloadRecord()
                            .then(function () {
                                this.selectWorkspace(rootNode);
                                $.notify(
                                    ['Keys to root node "{rootNode}" have been transfered to you. ',
                                        'You can now fully work with this workspace']
                                        .join('')
                                        .replace('{rootNode}', rootNode.get('name')),
                                    {
                                        autoHideDelay: 10000
                                    }
                                );
                                this.trigger('keyTransfered', rootNode);
                            }.bind(this));
                    }
                }.bind(this));

        },

//        selectWorkspace: function (rootNode) {
//
//            this.set('membersToApprove', null);
//            this.set('workspace', rootNode);
//
//            if (rootNode) {
//                this.stopChecking();
//
//                var cryptedKey = rootNode.get('membership.workspace_key');
//                var workspaceKey = null;
//                rootNode.set('keyError', false);
//
//                if (this.hasValidWorkspaceKey()) {
//                    try {
//                        workspaceKey = this.get('keytransfer').decryptWorkspaceKey(cryptedKey)
//                    } catch (error) {
//                        console.error(error.stack)
//                        rootNode.set('keyError', true);
//                    }
//
//                    this.set('workspaceKey', workspaceKey)
//                } else {
//                    this.startChecking(rootNode);
//                }
//            } else {
//                this.set('workspaceKey', null)
//            }
//        },

        transferKeyToCreatedNode: function (node) {
            Utils.Logger.log.debug("transferKeyToCreatedNode");
            var keytransfer = this.get('keytransfer');
            var decryptedKey = keytransfer.generateNodeKey();
            Utils.Logger.log.debug(decryptedKey);
            return keytransfer.transferKeyToMember(node.get('membership.id'), decryptedKey)
        },

        decryptWorkspaceData: function (data, encryptedKey, membershipId) {
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptWorkspaceKey(encryptedKey);
            }
            var coder = this.get('coder');

            Utils.Logger.log.debug(this.keys);
            Utils.Logger.log.debug(encryptedKey);
            Utils.Logger.log.debug(data);
            Utils.Logger.log.debug(this.keys[membershipId]);

            Utils.Logger.log.debug(this.get('auth.privateKey'));


            data = coder.decryptWorkspaceData(data, this.keys[membershipId]);
            Utils.Logger.log.debug(data);
            data = JSON.parse(data)
            return data
        },

        encryptWorkspaceData: function (data, encryptedKey, membershipId) {
            Utils.Logger.log.debug(this.keys);
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptWorkspaceKey(encryptedKey);
            }
            Utils.Logger.log.debug(this.keys[membershipId]);

            var coder = this.get('coder');
            var workspaceKey = this.get('workspaceKey');
            data = JSON.stringify(data)
            Utils.Logger.log.debug(data);

            return coder.encryptWorkspaceData(data, this.keys[membershipId])

        }


    });

