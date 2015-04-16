import Ember from 'ember';
import KernelWrapper from 'vaultier/app/services/kernel/kernel-wrapper';
/* global ApplicationKernel */

export default {

    name: 'vaultier-boot',

    initialize: function (container, app) {

        var kernel = KernelWrapper.create({kernel: window['Kernel']});
        kernel.register(container, app);

        app.register('config:main', Ember.Object.create(kernel.get('config')), {instantiate: false});

    }
};
