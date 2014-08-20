Vaultier.SelectBox = Ember.Selectize.extend({

    didInsertElement: function () {
        this.init = false;

        this._super();
        this.setDefaultValue();

        this.init = true;
    },

    _onItemAdd: function (value) {
        var content = get(this, 'content');
        var selection = get(this, 'selection');
        var multiple = get(this, 'multiple');
        if (content) {
            var obj = content.find(function (item) {
                if (get(item, get(this, '_valuePath')) == value)
                    return true;
            }, this);
            if (multiple && isArray(selection) && obj) {
                if (!selection.findBy(get(this, '_valuePath'), get(obj, get(this, '_valuePath'))))
                    selection.addObject(obj);

            } else if (obj) {
                if (!selection || (get(obj, get(this, '_valuePath')) !== get(selection, get(this, '_valuePath')))) {
                    this.changeData(obj);
                }
            }
        }
    },

  _renderOption: function (item, escape) {
    var item = Vaultier.Role.proto().roles.getByValue(item.data.value);
    return [
        '<div>',
        '<div>' + item.text + '</div>',
        '<div class="help-block">' + item.desc + '</div>',
        '</div>'
    ].join('')
  }

});