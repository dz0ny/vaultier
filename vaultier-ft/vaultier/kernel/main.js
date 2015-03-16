/* global require */
import BaseKernel from './kernel/kernel';
import ErrorManager from  './error-manager/error-manager';
import ApplicationLoader from './application-loader/application-loader';
import StandardApplicationLoaderRenderer from './application-loader/renderer/standard-renderer';
import JavascriptResolver from './application-loader/resolver/javascript-resolver';
import StylesheetResolver from './application-loader/resolver/stylesheet-resolver';

import ConfigManager from './config-manager/config-manager';
import MetaConfigResolver from './config-manager/resolver/meta-config-resolver';
import AjaxConfigResolver from './config-manager/resolver/ajax-config-resolver';

var Kernel = BaseKernel.extend({
  modules: {
    'config-manager' : ConfigManager.create(),
    'errors-manager': ErrorManager.create(),
    'loader': ApplicationLoader.create({
      renderer: StandardApplicationLoaderRenderer.create(),
      resolvers: [
        JavascriptResolver.create({
            url: 'assets/vendor.js'
          }),
        JavascriptResolver.create({
          url: 'assets/vaultier.js'
        }),
        StylesheetResolver.create({
          url: 'assets/vendor.css'
        }),
        StylesheetResolver.create({
          url: 'assets/vaultier.css'
        }),
        MetaConfigResolver.create({
          name: 'vaultier/app/config/environment'
        }),
        AjaxConfigResolver.create({
          url: '/api/config'
        })
      ]
    })
  }

}).create();

window.onload = function () {
  window['Kernel'] = Kernel;
  Kernel.load();
};



