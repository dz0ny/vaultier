/**
 * Handles created_at updated_at and dateformats
 */
var CreatedUpdatedMixin = Ember.Mixin.create({
    created_at: RL.attr('date', { readOnly: true }),
    updated_at: RL.attr('date', { readOnly: true }),
    created_by: RL.attr('object',{ readOnly: true }),

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
 * Expose commited attributes
 * https://github.com/emberjs/data/issues/656
 */
var ExposeCleanAttributesMixin = Ember.Mixin.create({
    _cleanObject: null,

    clean: function () {
        // No need to use up memory if model isn't dirty
        // so just return model as long as it's clean
        if (!this.get('isDirty')) {
            return this;
        }

        var cleanObject = this.get('_cleanObject');

        // Create clean object if it hasn't been created
        // or else just update it's attributes
        if (!cleanObject) {
            cleanObject = Ember.Object.create(this._data);
            this.set('_cleanObject', cleanObject);
        } else {
            cleanObject.setProperties(this._data);
        }
        return cleanObject;

    }.property('data', 'isDirty')
});

/**
 * reset the state after an error
 */
var NonInvalidState = Ember.Mixin.create({

    /**
     * Cannot be used now
     * Errors in forms does not get updated
     */
//    becameInvalid: function () {
//        var parentState = this.get('currentState').parentState.dirtyType;
//        if (parentState === "updated") {
//            this.transitionTo('loaded.updated.uncommitted');
//        } else {
//            this.transitionTo('loaded.created.uncommitted');
//        }
//        this._super()
//    }

})