import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

//@todo: this is ugly patter, use shared controller to share route data
export default Ember.Object.extend({
    nextButtonTitle: false,
    nextButtonDisable: false,
    keysReady: false,
    keys: null,
    loginButtonHidden: false,
    /**
     * Stores transition created by newuserinit service to redirect to proper page after success registration
     */
    transitionAfterRegister: false
}).create();
