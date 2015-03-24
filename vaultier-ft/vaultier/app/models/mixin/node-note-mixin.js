import EncryptedModel from './encrypted-model-mixin';
import Ember from 'ember';

var decryptedField = EncryptedModel.decryptedField;
/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.NodeNoteMixin
 */
export default  Ember.Mixin.create({
    note: decryptedField('data', 'note')
});
