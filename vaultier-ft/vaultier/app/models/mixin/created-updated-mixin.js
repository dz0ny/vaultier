import Ember from 'ember';
/* global RL, moment */

/**
 * Handles created_at updated_at and dateformats
 *
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.CreatedUpdatedMixin
 * @extends Ember.Mixin
 */
export default Ember.Mixin.create({
    created_at: RL.attr('date', { readOnly: true }),
    updated_at: RL.attr('date', { readOnly: true }),
    created_by: RL.attr('object',{ readOnly: true }),

    updated_ago: function () {
        var u = this.get('updated_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack);
        }
        return t;
    }.property('updated_at'),

    created_ago: function () {
        var u = this.get('created_at');
        var t;
        try {
            t = moment(u).fromNow();
        } catch (e) {
            console.error(e.stack);
        }
        return t;
    }.property('created_at')
});


