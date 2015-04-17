// Phone DABL registry
import DABLRegistry from 'ember-dabl/services/dabl/core/dabl-registry';
import FieldFactory from 'ember-dabl/services/dabl/field/field-factory';
import ModelFactory from 'ember-dabl/services/dabl/model/model-factory';


import UserModel from 'vaultier/app/models/model/user/user-model';
import UserAdapter from 'vaultier/app/models/model/user/user-adapter';

/**
 * Setup all Data object layer stuff here including dependency injection
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * more about dal {{#crossLinkModule "vaultier-dal"}}here{{/crossLinkModule}}
 *
 * @class Vaultier.initializers.DAL
 *
 */

export default {
  name: 'vaultier-dal',
  after: 'vaultier-boot',

  initialize: function (container, application) {

    DABLRegistry.create({
      container: container,
      application: application
    }).register();

    //@todo: registration of adapters and models must be done in fancier way to support relation resolvers

    /****************************************************************
     * User
     ***************************************************************/

    application.register('dabl:adapter.user', UserAdapter);
    ModelFactory.registerModel('user', UserModel);


  }
};




