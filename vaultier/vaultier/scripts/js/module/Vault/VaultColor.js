Vaultier.VaultColor = Ember.View.extend({
    layoutName: 'Vault/VaultColor',
    init: function () {
        if (this.get('value') == null) {
            this.set('value', 'blue');
        }
        var colorsAndSelected = [];
        Vaultier.Color.proto().colors.forEach(function (color) {
            colorsAndSelected.addObject({
                'value': color,
                'selected': color == this.get('value'),
                'css': 'color-picker-' + color
            });
        }.bind(this));
        this.set('colors', colorsAndSelected);

        this._super();
    },
    actions: {
        changeColor: function (color) {
            this.set('value', Ember.get(color, 'value'));
            this.get('colors').forEach(function (color) {
                if (Ember.get(color, 'value') == this.get('value')) {
                    Ember.set(color, 'selected', 'selected');
                } else {
                    Ember.set(color, 'selected', null);
                }
            }.bind(this));
        }
    }
});
