ApplicationKernel.namespace('Vaultier.Document.mixin');

Vaultier.Document.mixin.StyleBindingsMixin = Ember.Mixin.create({
    concatenatedProperties: ['styleBindings'],
    attributeBindings: ['style'],
    unitType: 'px',
    createStyleString: function (styleName, property) {
        var value;
        value = this.get(property);
        if (value === void 0) {
            return;
        }
        if (Ember.typeOf(value) === 'number') {
            value = value + this.get('unitType');
        }
        return "" + styleName + ":" + value + ";";
    },
    applyStyleBindings: function () {
        var lookup, properties, styleBindings, styleComputed, styles,
            _this = this;
        styleBindings = this.styleBindings;
        if (!styleBindings) {
            return;
        }
        lookup = {};
        styleBindings.forEach(function (binding) {
            var property, style, _ref;
            _ref = binding.split(':'), property = _ref[0], style = _ref[1];
            return lookup[style || property] = property;
        });
        styles = Ember.keys(lookup);
        properties = styles.map(function (style) {
            return lookup[style];
        });
        styleComputed = Ember.computed(function () {
            var styleString, styleTokens;
            styleTokens = styles.map(function (style) {
                return _this.createStyleString(style, lookup[style]);
            });
            styleString = styleTokens.join('');
            if (styleString.length !== 0) {
                return styleString;
            }
        });
        styleComputed.property.apply(styleComputed, properties);
        return Ember.defineProperty(this, 'style', styleComputed);
    },
    init: function () {
        this.applyStyleBindings();
        return this._super();
    }
});