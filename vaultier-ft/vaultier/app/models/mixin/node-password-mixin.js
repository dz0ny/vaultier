import EncryptedModel from './encrypted-model-mixin';
import Ember from 'ember';

var decryptedField = EncryptedModel.decryptedField;
/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.NodePasswordMixin
 */
export default Ember.Mixin.create({
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note')
});
