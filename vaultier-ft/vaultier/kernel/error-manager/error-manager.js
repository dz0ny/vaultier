import BaseModule from './../kernel/base-module';
import RSVPHandler from './handler/rsvp-handler';
import WindowHandler from './handler/window-handler';
import ConsoleLogger from './logger/console-logger/console-logger';
import WSODLogger from './logger/wsod-logger/wsod-logger';
import LoggableError from './loggable-error';

var ErrorManager = BaseModule.extend({

  init: function () {
    this.addDefaultHandlers();
    this.addDefaultLoggers();
  },

  load: function (kernel) {
    this.registerAll();
  },


  addDefaultHandlers: function () {
    this.handlers = [
      WindowHandler.create(),
      RSVPHandler.create()
    ];
  },

  addDefaultLoggers: function () {
    this.loggers = [
      WSODLogger.create(),
      ConsoleLogger.create(),
    ];
  },

  registerAll: function () {
    for (var i = 0; i < this.handlers.length; i++) {
      var h = this.handlers[i];
      h.register(this);
    }
  },

  registerHandler: function(handler) {
    this.handlers.push(handler);
    handler.register(this);
  },

  unregisterAll: function () {
    for (var i = 0; i < this.handlers.length; i++) {
      var h = this.handlers[i];
      h.unregister(this);
    }
  },

  handleError: function (error, options) {
    var e = LoggableError.create({
      error: error,
      options: options
    });

    for (var i = 0; i < this.loggers.length; i++) {
      var logger = this.loggers[i];
      logger.log(e);
    }
  }

});

export default ErrorManager;
