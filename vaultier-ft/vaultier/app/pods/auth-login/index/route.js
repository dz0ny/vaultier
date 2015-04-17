import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend({

    appConfig: inject('config:main'),

    userAdapter: inject('dabl:adapter.user'),

    model: function() {
        //return this.get('userAdapter').findOneBy('id',1);
    },

    setupController: function (ctrl) {

        var appConfig = this.get('appConfig');

        ctrl.set('registrationOptions', {
            'auth_registration_allow': appConfig.get('auth_registration_allow'),
            'auth_registration_enforce': appConfig.get('auth_registration_enforce')
        });

        ctrl.set('news', []);
    },

    actions: {
        login: function () {
            alert('doLogin');
        }

    }
});

