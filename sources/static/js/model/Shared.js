var CreatedUpdatedMixin = Ember.Mixin.create({
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    created_by: DS.attr(),

    updated_ago: function () {
        var u = this.get('updated_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('updated_at'),

    created_ago: function () {
        var u = this.get('created_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack)
        }
        return t;
    }.property('created_at')
});


