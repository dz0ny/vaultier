ApplicationKernel.namespace('Vaultier.dal.field');

/**
 * @module vaultier-dal-field
 * @class Vaultier.dal.field.Object
 * @extends Ember.Mixin
 */
Vaultier.dal.field.Object = Ember.Mixin.create({
    init: function () {
        this.registerTransform('object', {
            deserialize: function (native) {
                return native;
            },
            serialize: function (deserialized) {
                return deserialized
            }
        })
    }
});
