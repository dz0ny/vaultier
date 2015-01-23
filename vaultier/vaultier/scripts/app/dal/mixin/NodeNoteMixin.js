var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.NodeNoteMixin
 */
Vaultier.dal.model.NodeNoteMixin = Ember.Mixin.create({
    note: decryptedField('data', 'note')
});
