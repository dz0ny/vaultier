Po.NS('Vaultier.utils');

Vaultier.utils.Breadcrumbs = Ember.Object.extend({
    init: function () {
        this._super();
        this.items = [];
        this.addLink('index', 'Home')
    },

    items: null,

    addLink: function (link, title) {
        this.items.forEach(function(item) {
            delete item.last
        });
        this.items.push({
            link: link,
            title: title,
            last: true
        })
        return this;
    }
})