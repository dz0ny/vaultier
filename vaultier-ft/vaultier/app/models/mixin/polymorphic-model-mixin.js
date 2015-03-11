import Ember from 'ember';
/* global RL */

/**
 * Mixin which gives you an option for create model with different fields according to model type
 *
 * Usage:
 * 1. Create property 'polymorphicModelTypeField'. Its value has to be name of model's field
 *  where is stored type of model.
 *
 *  Example:
 *  ```javascript
 *  polymorphicModelTypeField: 'type'
 *  ```
 *
 * 2. Create property 'polymorphicModelMapping'. Its value will be object.
 *  Keys of this object should be types according to which it selects mixins.
 *  Values of Object should be fully-classified names of mixin which correspond to types.
 *
 *  Example:
 *  ```javascript
 *  polymorphicModelMapping: {
 *      100: 'Vaultier.dal.model.NodeFolderMixin',
 *      200: 'Vaultier.dal.model.NodeNoteMixin',
 *      300: 'Vaultier.dal.model.NodePasswordMixin',
 *      400: 'Vaultier.dal.model.NodeFileMixin'
 *  },
 *  ```
 *
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.PolymorphicModel
 * @extends Ember.Mixin
 * @requires Vaultier.dal.mixin.EncryptedModel.Mixin
 */
export default Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        var typeField = this.get('polymorphicModelTypeField');
        if (!typeField) {
            throw new Error('polymorphicModelTypeField must be specified');
        }

        var mapping = this.get('polymorphicModelMapping');
        if (!mapping) {
            throw new Error('polymorphicModelMapping has to be specified ');
        }

        this.addObserver(typeField, this, function () {
            this.applyPolymorphicMixin(this.getPolymorphicType());
        });

    },

    getPolymorphicType: function () {
        var typeField = this.get('polymorphicModelTypeField');
        return this.get(typeField);
    },

    getPolymorphicClass: function (type) {
        var mapping = this.get('polymorphicModelMapping');
        var cls = mapping[type];
        if (!cls) {
            throw new Error('Polymorphic mixin class not found for type {type}'.replace('{type}', type));
        }
        return cls;
    },

    applyPolymorphicMixin: function (type) {
        var clsName = this.getPolymorphicClass(type);
        var cls = Ember.get(clsName);
        if (!cls) {
            throw new Error('Cannot instantiate node class mixin {mixin} for type {type}'
                    .replace('{type}', type)
                    .replace('{mixin}', clsName)
            );
        }

        var applied = cls.detect(this);
        if (applied) {
            throw new Error('Cannot apply mixin {mixin}, already applied {applied}'
                    .replace('{mixin}', clsName)
                    .replace('{applied}', applied)
            );
        }


        cls.apply(this);
        cls.mixins.forEach(function (mixin) {
            if (mixin.properties.init) {
                mixin.properties.init.apply(this);
            }
        }.bind(this));
        this.set('polymorphicMixinApplied', clsName);

    }

});
