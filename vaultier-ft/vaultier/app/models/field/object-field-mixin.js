import Ember from 'ember';

/**
 * @module vaultier-dal-field
 * @class Vaultier.dal.field.Object
 * @extends Ember.Mixin
 */
export default Ember.Mixin.create({
    init: function () {
        this.registerTransform('object', {
            deserialize: function (native) {
                return native;
            },
            serialize: function (deserialized) {
                return deserialized;
            }
        });
    }
});
