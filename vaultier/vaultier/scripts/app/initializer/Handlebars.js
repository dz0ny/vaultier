/**
 * @module vaultier-initializer
 */

ApplicationKernel.namespace('Vaultier.initializers');

/**
 * Setup all handlebars helpers here
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * @class Vaultier.initializers.Handlebars
 *
 */

Vaultier.initializers.Handlebars = {
    name: 'vaultier-handlebars',
    after: 'vaultier-boot',

    initialize: function (container, app) {

        //@todo: get rid of the helper wrapper and inject functions to handlebars here
        Utils.HandlebarsHelpers.current().register();


    }
};

Vaultier.initializer(Vaultier.initializers.Handlebars);

