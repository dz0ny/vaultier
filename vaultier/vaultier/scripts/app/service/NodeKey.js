ApplicationKernel.namespace('Service');

Service.NodeKey = Ember.Object.extend(
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
        nodeKey: null,

        checkInterval: 60000,
        checkIntervalId: null,

        keys: {},

        init: function () {
            this._super(this, arguments);
        },

        startChecking: function (node) {
            // start checking interval
            this.set('checkIntervalId', setInterval(
                function () {
                    this.checkNodeKey(node);
                }.bind(this),
                this.get('checkInterval')
            ));
        },

        stopChecking: function () {
            clearInterval(this.get('checkIntervalId'));
        },

        checkNodeKey: function (rootNode) {
            this.get('store').find('Node', rootNode.get('id'))
                .then(function (rootNodeCheck) {
                    if (rootNodeCheck.get('membership.status') == Vaultier.dal.model.Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        rootNode.reloadRecord()
                            .then(function () {
//                                this.selectWorkspace(rootNode);
                                $.notify(
                                    ['Keys to root node "{rootNode}" have been transfered to you. ',
                                        'You can now fully work with this folder']
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

        transferKeyToCreatedNode: function (node) {
            Utils.Logger.log.debug("transferKeyToCreatedNode");
            var keytransfer = this.get('keytransfer');
            var decryptedKey = keytransfer.generateNodeKey();
            Utils.Logger.log.debug(decryptedKey);
            return keytransfer.transferKeyToMember(node.get('membership.id'), decryptedKey)
        },

        decryptNodeData: function (data, encryptedKey, membershipId) {
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptNodeKey(encryptedKey);
            }
            var coder = this.get('coder');

            Utils.Logger.log.debug(this.keys);
            Utils.Logger.log.debug(encryptedKey);
            Utils.Logger.log.debug(data);
            Utils.Logger.log.debug(this.keys[membershipId]);

            Utils.Logger.log.debug(this.get('auth.privateKey'));


            data = coder.decryptNodeData(data, this.keys[membershipId]);
            Utils.Logger.log.debug(data);
            data = JSON.parse(data)
            return data
        },

        encryptNodeData: function (data, encryptedKey, membershipId) {
            Utils.Logger.log.debug(this.keys);
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptNodeKey(encryptedKey);
            }
            Utils.Logger.log.debug(this.keys[membershipId]);

            var coder = this.get('coder');
            var nodeKey = this.get('nodeKey');
            data = JSON.stringify(data)
            Utils.Logger.log.debug(data);

            return coder.encryptNodeData(data, this.keys[membershipId])

        }


    });

