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

        app.register('adapter:user', Vaultier.dal.adapter.RESTAdapter);
        app.register('adapter:workspace', Vaultier.dal.adapter.RESTAdapter);
        app.register('adapter:workspacekey', Vaultier.dal.adapter.RESTAdapter);
        app.register('adapter:role', Vaultier.dal.adapter.RESTAdapter);
        app.register('adapter:vault', Vaultier.dal.adapter.RESTAdapter);
        app.register('adapter:news', Vaultier.dal.model.news.Adapter);

        //@todo: not the final list more to come with every model

    }
};

Vaultier.initializer(Vaultier.initializers.DAL);



