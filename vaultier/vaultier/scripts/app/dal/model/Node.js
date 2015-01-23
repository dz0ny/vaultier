ApplicationKernel.namespace('Vaultier.dal.model');

var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Node
 * @extends RL.Model
 */
Vaultier.dal.model.Node = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.EncryptedModel.Mixin,
    Vaultier.dal.mixin.PolymorphicModel.Mixin,
    {
        init: function () {
            this.set('workspacekey', Vaultier.__container__.lookup('service:workspacekey'));
            this.set('adapter', Vaultier.__container__.lookup('adapter:node'));
            Utils.Logger.log.debug(this.get('adapter'));
            return this._super.apply(this, arguments);
        },

        /**
         * @DI service:workspacekey
         */
        workspacekey: null,

        /**
         * @DI adapter:node
         */
        adapter: null,

        polymorphicModelTypeField: 'type',
        polymorphicModelMapping: {
            100: 'Vaultier.dal.model.NodeFolderMixin',
            200: 'Vaultier.dal.model.NodeNoteMixin',
            300: 'Vaultier.dal.model.NodePasswordMixin',
            400: 'Vaultier.dal.model.NodeFileMixin'
        },

        types: new Utils.ConstantList({
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
         * Managed by Service.WorkspaceKey, True when key cannot be decrypted
         */
        keyError: false,

        saveRecord: function () {
            var isNew = this.get('isNew');
            Utils.Logger.log.debug(this.get('workspacekey'));

            if (isNew) {
                //set enc_version when we create new node
                this.set('enc_version', 1);
            }

            //save
            var promise = this._super.apply(this, arguments);


            var node = this;
            Utils.Logger.log.debug(node);
            if (isNew && !this.get('parent')) {
                // after save, approve workspace
                promise = promise
                    .then(function () {
                        Utils.Logger.log.debug("promise = promise.then(function () {");
                        Utils.Logger.log.debug(this.get('workspacekey'));
                        return this.get('workspacekey').transferKeyToCreatedNode(node);
                    }.bind(this))
                    .then(function () {
                        return node.reloadRecord();
                    }.bind(this))
            }

            return promise;
        }


    });

