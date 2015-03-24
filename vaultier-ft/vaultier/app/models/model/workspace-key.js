/* global RL */

import Ember from 'ember';
import RollbackMixin from '../mixin/rollback-mixin';

/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.WorkspaceKey
 * @extends RL.Model
 */
var WorkspaceKey = RL.Model.extend(
    {
        public_key: RL.attr('string'),
        node_key: RL.attr('longs'),
        status: RL.attr('string'),
        node: RL.attr('object'),
        user: RL.attr('object')
    });

WorkspaceKey.reopenClass({
  resourceName: 'WorkspaceKey'
});

export default WorkspaceKey;
