import Ember from 'ember';
import Member from 'vaultier/app/models/model/member';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Object.extend(
    Ember.Evented,
    {

        /**
         * @DI Service.Coder
         */
        coder: inject('service:coder'),
        /**
         * @DI Service.Auth
         */
        auth: inject('service:auth'),

        /**
         * @DI store:main
         */
        store: inject('store:main'),

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
                    if (rootNodeCheck.get('membership.status') === Member.proto().statuses['MEMBER'].value) {
                        this.stopChecking();
                        rootNode.reloadRecord()
                            .then(function () {
//                                this.selectWorkspace(rootNode);



                                // this.seletWorkspace has been commented out before
                                // $.notify(
                                //    ['Keys to root node "{rootNode}" have been transfered to you. ',
                                //        'You can now fully work with this folder']
                                //        .join('')
                                //        .replace('{rootNode}', rootNode.get('name')),
                                //    {
                                //        autoHideDelay: 10000
                                //    }
                                //);
                                this.trigger('keyTransfered', rootNode);
                            }.bind(this));
                    }
                }.bind(this));

        },

        transferKeyToCreatedNode: function (node) {
            //Utils.Logger.log.debug("transferKeyToCreatedNode");
            var keytransfer = this.get('keytransfer');
            var decryptedKey = keytransfer.generateNodeKey();
            return keytransfer.transferKeyToMember(node.get('membership.id'), decryptedKey);
        },

        decryptNodeData: function (data, encryptedKey, membershipId) {
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptNodeKey(encryptedKey);
            }
            var coder = this.get('coder');

            data = coder.decryptNodeData(data, this.keys[membershipId]);
            //Utils.Logger.log.debug(data);
            data = JSON.parse(data);
            return data;
        },

        encryptNodeData: function (data, encryptedKey, membershipId) {
            if (!this.keys[membershipId]) {
                this.keys[membershipId] = this.get('keytransfer').decryptNodeKey(encryptedKey);
            }

            var coder = this.get('coder');
            var nodeKey = this.get('nodeKey');
            data = JSON.stringify(data);

            return coder.encryptNodeData(data, this.keys[membershipId]);

        }


    });

