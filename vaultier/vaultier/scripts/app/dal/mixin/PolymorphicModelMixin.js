ApplicationKernel.namespace('Vaultier.dal.mixin.PolymorphicModel');

/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.PolymorphicModel
 * @extends Ember.Mixin
 */
Vaultier.dal.mixin.PolymorphicModel.Mixin = Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        var typeField = this.get('polymorphicModelTypeField');
        if (!typeField) {
            throw new Error('polymorphicModelTypeField must be specified');
        }

        var mapping = this.get('polymorphicModelMapping');
        if (!mapping) {
            throw new Error('polymorphicModelMapping has to be specified ')
        }

        this.addObserver(typeField, this, function () {
            this.applyPolymorphicMixin(this.getPolymorphicType());
        })

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
        if (!cls)
            throw new Error('Cannot instantiate node class mixin {mixin} for type {type}'
                    .replace('{type}', type)
                    .replace('{mixin}', clsName)
            );

        var applied = cls.detect(this)
        if (applied) {
            throw new Error('Cannot apply mixin {mixin}, already applied {applied}'
                    .replace('{mixin}', clsName)
                    .replace('{applied}', appliedMixin)
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

})
