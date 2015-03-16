import Ember from 'ember';
import KernelWrapper from 'vaultier/app/services/kernel/kernel-wrapper';
/* global ApplicationKernel */


/**
 * Very first vaultier initializer, used to initialize most core stuff. e.g extract kernel data to be available for DI
 *
 * Uses standard ember initializer pattern: <a target="blank" href="http://emberjs.com/api/classes/Ember.Application.html#toc_initializers">see ember docs</a>
 *
 * @class Vaultier.initializers.Boot
 */
export default {
    name: 'vaultier-boot',

    initialize: function (container, app) {

        /**************************************************
         **************************************************
         * Initialize config
         **************************************************
         **************************************************
         */
        // kernel
        var kernel = KernelWrapper.create({kernel: window['Kernel']});
        kernel.register(container, app);

        app.register('config:main', kernel.get('config'), {instantiate: false});

        //@todo: use lazy injections instead
        app.inject('route', 'config', 'config:main');
        app.inject('controller', 'config', 'config:main');
        app.inject('view', 'config', 'config:main');
        app.inject('service', 'config', 'config:main');

        /**************************************************
         **************************************************
         * Initialize kernel
         **************************************************
         **************************************************
         */

        app.inject('route', 'kernel', 'kernel:main');
        app.inject('controller', 'kernel', 'kernel:main');
        app.inject('view', 'kernel', 'kernel:main');
        app.inject('service', 'kernel', 'kernel:main');
    }
};
