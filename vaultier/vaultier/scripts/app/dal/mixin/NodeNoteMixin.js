ApplicationKernel.namespace('Vaultier.dal.mixin');

var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.NodeNoteMixin
 */
Vaultier.dal.mixin.NodeNoteMixin = Ember.Mixin.create({
    note: decryptedField('data', 'note')
});
