import Ember from 'ember';
import {decryptedField, EncryptedModelMixin} from './../mixin/encrypted-model-mixin';
import CreatedUpdatedMixin from './../mixin/created-updated-mixin';
import PolymorphicModelMixin from './../mixin/polymorphic-model-mixin';
import ConstantList from 'vaultier/app/utils/constant-list';
/* global RL, Vaultier */


/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Node
 * @extends RL.Model
 */
export default RL.Model.extend(
    CreatedUpdatedMixin,
    EncryptedModelMixin,
    PolymorphicModelMixin,
    {
        init: function () {
            this.set('nodekey', Vaultier.__container__.lookup('service:nodekey'));
            this.set('adapter', Vaultier.__container__.lookup('adapter:node'));
            //Utils.Logger.log.debug(this.get('adapter'));
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:nodekey
         */
        nodekey: null,

        /**
         * @DI adapter:node
         */
        adapter: null,

        polymorphicModelTypeField: 'type',
        polymorphicModelMapping: {
            100: 'Vaultier.dal.mixin.NodeFolderMixin',
            200: 'Vaultier.dal.mixin.NodeNoteMixin',
            300: 'Vaultier.dal.mixin.NodePasswordMixin',
            400: 'Vaultier.dal.mixin.NodeFileMixin'
        },

        types: new ConstantList({
            'FOLDER': {
                value: 100,
                text: 'folder'
            },
            'NOTE': {
                value: 200,
                text: 'note'
            },
            'PASSWORD': {
                value: 300,
                text: 'password'
            },
            'FILE': {
                value: 400,
                text: 'file'
            }
        }),

        name: RL.attr('string'),

        type: RL.attr('number'),
        data: RL.attr('object'),

        blob_meta: RL.attr('object'),

        enc_version: RL.attr('number'),
        created_by: RL.attr('object'),
        parent: RL.attr('number'),
        color: RL.attr('string'),

        perms: RL.attr('object'),
        membership: RL.attr('object', { readOnly: true }),

        /**
         * Managed by Service.NodeKey, True when key cannot be decrypted
         */
        keyError: false,

        saveRecord: function () {
            var isNew = this.get('isNew');
            //Utils.Logger.log.debug(this.get('nodekey'));

            if (isNew) {
                //set enc_version when we create new node
                this.set('enc_version', 1);
            }

            //save
            var promise = this._super.apply(this, arguments);


            var node = this;
            //Utils.Logger.log.debug(node);
            if (isNew && !this.get('parent')) {
                promise = promise
                    .then(function () {
                        //Utils.Logger.log.debug("promise = promise.then(function () {");
                        //Utils.Logger.log.debug(this.get('nodekey'));
                        return this.get('nodekey').transferKeyToCreatedNode(node);
                    }.bind(this))
                    .then(function () {
                        return node.reloadRecord();
                    }.bind(this));
            }

            return promise;
        }


    });

