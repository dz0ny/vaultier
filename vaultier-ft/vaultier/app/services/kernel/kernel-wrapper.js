import Ember from 'ember';
import EmberErrorHandler from './ember-error-handler';

export default Ember.Object.extend({

  config: null,

  init: function () {
    this._super();
    var kernel = this.get('kernel');
    if (!kernel) {
      // @todo: Kernel is commented temporarily. Tests are not working because exception thrown
      // During implementation of kernel-loader preloading we have to ensure kernel will be also loaded during tests
      // throw new Error('Please specify kernel as content parameter in constructor');
    }

    this.set('config', kernel.config);

  },

  handleError: function(error) {
    // @todo: remove this temporary condition when kernel will be enabled during testing
    if (this.get('kernel')) {
      var kernel = this.get(kernel);
      kernel.getModule('errors-manager').handleError(error);
    }
  },

  register: function (container, application) {
    // @todo: remove this temporary condition when kernel will be enabled during testing
    if (this.get('kernel')) {
      application.register('kernel:main', this, {instantiate: false});

      // @todo: reenable ember error wrapper
      //this.registerErrorHandler(container, application);
    }
  },

  registerErrorHandler: function (container, application) {
    // @todo: remove this temporary condition when kernel will be enabled during testing
    if (this.get('kernel')) {
      var kernel = this.get('kernel');

      var handler = EmberErrorHandler.create({
        container: container,
        ember: Ember,
        application: application
      });

      kernel.getModule('errors-manager').registerHandler(handler);
    }
  }

});
