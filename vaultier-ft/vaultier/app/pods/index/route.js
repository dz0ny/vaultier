import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend(
    {
        redirect: function () {
            return this.transitionTo('auth-login');
        }
    });

