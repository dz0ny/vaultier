import Ember from 'ember';
import ConstantList from 'vaultier/app/utils/constant-list';
import CreatedUpdatedMixin from './../mixin/created-updated-mixin';
/* global RL */

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Member
 * @extends RL.Model
 */
export default RL.Model.extend(
    CreatedUpdatedMixin,
    {
        status: RL.attr('number'),
        email: RL.attr('string'),
        nickname: RL.attr('string'),
        user: RL.attr('object'),
        node: RL.attr('object'),
        roles_count: RL.attr('number'),

        statuses: new ConstantList({
            'INVITED': {
                value: 100,
                text: 'INVITED'
            },
            "MEMBER_WITHOUT_NODE_KEY": {
                value: 200,
                text: 'MEMBER_WITHOUT_NODE_KEY'
            },
            'MEMBER': {
                value: 300,
                text: 'MEMBER'
            }
        }),

        /**
         * @return {Boolean}
         */
        isNotMember: function () {
            return this.get('status') !== this.get('statuses')['MEMBER'].value;
        }.property('status'),

        isInvited: function () {
            return this.get('status') === this.get('statuses')['INVITED'].value;
        }.property('status'),

        /**
         * @return {Boolean}
         */
        hasNokey: function () {
            return this.get('status') === this.get('statuses')['MEMBER_WITHOUT_NODE_KEY'].value;
        }.property('status')

    });


