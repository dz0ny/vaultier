ApplicationKernel.namespace('Vaultier.dal.mixin');

var decryptedField = Vaultier.dal.mixin.EncryptedModel.decryptedField;

/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.NodePasswordMixin
 */
Vaultier.dal.mixin.NodePasswordMixin = Ember.Mixin.create({
    password: decryptedField('data', 'password'),
    username: decryptedField('data', 'username'),
    url: decryptedField('data', 'url'),
    note: decryptedField('data', 'note')
});
