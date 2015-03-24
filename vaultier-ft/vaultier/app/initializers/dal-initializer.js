import StandardRESTAdapter from 'vaultier/app/models/core/rest-adapter';
import NodeAdapter from 'vaultier/app/models/adapter/node-adapter';
import NodeBlobAdapter from 'vaultier/app/models/adapter/node-blob-adapter';
import NewsAdapter from 'vaultier/app/models/adapter/news-adapter';
import PerModelAdapter from 'vaultier/app/models/core/per-model-adapter';

import UserModel from 'vaultier/app/models/model/user';
import NodeModel from 'vaultier/app/models/model/node';
import WorkspaceKeyModel from 'vaultier/app/models/model/workspace-key';

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

  initialize: function (container, app) {

    PerModelAdapter.initializerInstall(container, app);

    // registers adapters for each model
    app.register('adapter:user', StandardRESTAdapter);
    app.register('adapter:workspacekey', StandardRESTAdapter);
    app.register('adapter:role', StandardRESTAdapter);
    app.register('adapter:member', StandardRESTAdapter);
    app.register('adapter:invitation', StandardRESTAdapter);
    app.register('adapter:lostkey', StandardRESTAdapter);
    app.register('adapter:lostkeymemberships', StandardRESTAdapter);

    app.register('model:user', UserModel, {instantiate: false});
    app.register('model:node', NodeModel, {instantiate: false});
    app.register('model:workspacekey', WorkspaceKeyModel, {instantiate: false});

    app.register('adapter:news', NewsAdapter);
    app.register('adapter:node', NodeAdapter);
    app.register('adapter:nodeblob', NodeBlobAdapter);

  }
};




