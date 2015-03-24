import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend(
  {

    auth: inject('service:auth'),

    actions: {

      //@todo: enable me again
      //error: function (error, transition) {
      //    //console.error(error);
      //    //console.error(error.stack)
      //    //this.get('errors').processError(error);
      //    return false;
      //},

      //@todo: enable me again
//            loading: function (transition, originRoute) {
////                ApplicationKernel.UI.showLoader();
//                transition.promise.finally(function () {
////                    ApplicationKernel.UI.hideLoader();
//                }.bind(this))
//            }

    },

    beforeModel: function (params, transition) {
      // reload authenticated user from server
      var auth = this.get('auth');
      var status = auth.reload();
      return status;

    }
  })
;
