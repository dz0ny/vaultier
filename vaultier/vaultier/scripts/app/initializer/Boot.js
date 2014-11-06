/**
 * Provides hooks to be executed on application boot. e.g. Dependency Injection, Router definition or global bindings.
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * To review initializer see {{#crossLink "Vaultier"}} Vaultier intializers {{/crossLink}}
 *
 * @module vaultier-initializer
 * @main vaultier-initializer
 *
 */

ApplicationKernel.namespace('Vaultier.initializers');

/**
 * Very first vaultier initializer, used to initialize most core stuff. e.g extract kernel data to be available for DI
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * @class Vaultier.initializers.Boot
 */
Vaultier.initializers.Boot = {
    name: 'vaultier-boot',

    initialize: function (container, app) {

        /**************************************************
         **************************************************
         * Initialize config
         **************************************************
         **************************************************
         */

        app.Config = Ember.Object.extend(ApplicationKernel.Config.applicationConfig).create();

        app.register('config:main', app.Config, {instantiate: false});
        app.inject('route', 'config', 'config:main');
        app.inject('controller', 'config', 'config:main');
        app.inject('view', 'config', 'config:main');
        app.inject('service', 'config', 'config:main');
    }
};

Vaultier.initializer(Vaultier.initializers.Boot);