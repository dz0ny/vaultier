/**
 * @module vaultier-initializer
 */

ApplicationKernel.namespace('Vaultier.initializers');

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

Vaultier.initializers.DAL = {
    name: 'vaultier-dal',
    after: 'vaultier-boot',

    initialize: function (container, app) {

        // registers adapters for each model
        app.register('adapter:user', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:workspace', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:workspacekey', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:role', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:vault', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:card', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:secret', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:member', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:invitation', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:lostkey', Vaultier.dal.core.RESTAdapter);
        app.register('adapter:lostkeymemberships', Vaultier.dal.core.RESTAdapter);

        app.register('adapter:news', Vaultier.dal.adapter.NewsAdapter);
        app.register('adapter:node', Vaultier.dal.adapter.NodeAdapter);
        app.register('adapter:nodeblob', Vaultier.dal.adapter.NodeBlobAdapter);

        //@todo: not the final list more to come with every model

    }
};

Vaultier.initializer(Vaultier.initializers.DAL);



