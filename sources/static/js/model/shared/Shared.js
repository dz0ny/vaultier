/**
 * Handles created_at updated_at and dateformats
 */
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


/**
 * reset the state after an error
 */
var NonInvalidState = Ember.Mixin.create({
    becameInvalid: function () {
        var parentState = this.get('currentState').parentState.dirtyType;
        if (parentState === "updated") {
            this.transitionTo('loaded.updated');
        } else {
            this.transitionTo('loaded.created.uncommitted');
        }
    }

})