import Ember from 'ember';
import {decryptedField, EncryptedModelMixin} from './../mixin/encrypted-model-mixin';
import CreatedUpdatedMixin from './../mixin/created-updated-mixin';
import PolymorphicModelMixin from './../mixin/polymorphic-model-mixin';
import ConstantList from 'vaultier/app/utils/constant-list';
import {inject, factory} from 'vaultier/app/utils/tools/di';
import NodeFolderMixin from '../mixin/node-folder-mixin';
import NodeFileMixin from '../mixin/node-file-mixin';
import NodeNoteMixin from '../mixin/node-note-mixin';
import NodePasswordMixin from '../mixin/node-password-mixin';

/* global RL, Vaultier */

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Node
 * @extends RL.Model
 */
var Node = RL.Model.extend(
  CreatedUpdatedMixin,
  EncryptedModelMixin,
  PolymorphicModelMixin,
  {


    //@todo: this is ugly, models should not inject services
    nodekey: inject('service:nodekey'),

    //@todo: this is ugly, models should not inject services
    adapter: inject('adapter:node'),

    //@todo: this is ugly, models should not inject services
    store: inject('store:main'),

    polymorphicModelTypeField: 'type',
    polymorphicModelMapping: {
      100: NodeFolderMixin,
      200: NodeNoteMixin,
      300: NodePasswordMixin,
      400: NodeFileMixin
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
    membership: RL.attr('object', {readOnly: true}),

    /**
     * Managed by Service.NodeKey, True when key cannot be decrypted
     */
    keyError: false,

    saveRecord: function () {
      var isNew = this.get('isNew');

      if (isNew) {
        //set enc_version when we create new node
        this.set('enc_version', 1);
      }

      //save
      var promise = this._super.apply(this, arguments);


      var node = this;
      if (isNew && !this.get('parent')) {
        promise = promise
          .then(function () {
            return this.get('nodekey').transferKeyToCreatedNode(node);
          }.bind(this))
          .then(function () {
            return node.reloadRecord();
          }.bind(this));
      }

      return promise;
    }


  });

Node.reopenClass({
  resourceName: 'Node'
});

export default Node;
