Vaultier.MutableModel = Vaultier.MutableModel || {}

Vaultier.MutableModel.Mixin = Ember.Mixin.create({

    init: function () {
        this._super.apply(this, arguments);

        var typeField = this.get('mutableModelTypeField');
        if (!typeField) {
            throw new Error('mutableModelTypeField must be specified');
        }

        var mapping = this.get('mutableModelMapping');
        if (!mapping) {
            throw new Error('mutableModelMapping has to be specified ')
        }

        this.addObserver(typeField, this, function () {
            this.applyMutableMixin(this.getMutableType());
        })

    },

    getMutableType: function () {
        var typeField = this.get('mutableModelTypeField');
        return this.get(typeField);
    },

    getMutableClass: function (type) {
        var mapping = this.get('mutableModelMapping');
        var cls = mapping[type];
        if (!cls) {
            throw new Error('Mutation mixin class not found for type {type}'.replace('{type}', type));
        }
        return cls;
    },

    applyMutableMixin: function (type) {
        var clsName = this.getMutableClass(type);
        var cls = Ember.get(clsName);
        if (!cls)
            throw new Error('Cannot instantiate secret class mixin {mixin} for type {type}'
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
        this.set('mutableMixinApplied', clsName);

    }

})
