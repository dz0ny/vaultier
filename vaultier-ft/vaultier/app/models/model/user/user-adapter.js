import Ember from 'ember';
import BaseAdapter from 'ember-dabl/services/dabl/adapter/rest-adapter';
import {inject, factory} from 'ember-utils/utils/tools/di';

var UserAdapter = BaseAdapter.extend({

    appConfig: inject('config:main'),

    resourceName: 'users',

    resourceRoot: Ember.computed.alias('appConfig.apiResourceRoot')


});

export default UserAdapter;

