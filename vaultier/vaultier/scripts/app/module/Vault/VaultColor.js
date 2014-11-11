Vaultier.VaultColorView = Ember.View.extend({
    layoutName: 'Vault/VaultColor',
    init: function () {
        if (this.get('value') == null) {
            this.set('value', 'blue');
        }
        this.prepareColorPicker();

        this._super();
    },
    prepareColorPicker: function () {
        var colorsAndSelected = [];
        Vaultier.dal.model.Color.proto().colors.forEach(function (color) {
            colorsAndSelected.addObject({
                'value': color,
                'selected': color == this.get('value'),
                'css': (color == this.get('value')
                    ? 'color-picker-base vlt-background-' + color
                    : 'color-picker-base vlt-background-' + color + '-light')
            });
        }.bind(this));
        this.set('colors', colorsAndSelected);
    },
    actions: {
        changeColor: function (color) {
            this.set('value', Ember.get(color, 'value'));
            this.get('colors').forEach(function (color) {
                if (Ember.get(color, 'value') == this.get('value')) {
                    Ember.set(color, 'selected', 'selected');
                    Ember.set(color, 'css', 'color-picker-base vlt-background-' + color.value)
                } else {
                    Ember.set(color, 'selected', null);
                    Ember.set(color, 'css', 'color-picker-base vlt-background-' + color.value + '-light')
                }
            }.bind(this));
        }
    }
});
