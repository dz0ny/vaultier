import Ember from 'ember';

export default Ember.Object.extend({

  init: function () {
    if (!this.get('ember')) {
      throw new Error('Ember must be defined for ember handler');
    }
    if (!this.get('application')) {
      throw new Error('Application must be defined for ember handler');
    }
    if (!this.get('container')) {
      throw new Error('Application container must be defined for ember handler');
    }
  },

  ember: null,
  application: null,
  container: null,

  register: function (manager) {


    var Ember = this.get('ember');
    var application = this.get('application');
    var container = this.get('container');

    //Capturing errors within action events
    Ember.ActionHandler.reopen({
      send: function (actionName) {
        try {
          this._super.apply(this, arguments);
        } catch (error) {
          manager.handleError(error, {
            source: 'ember-action'
          });
        }
      }
    });

    //Capturing errors during transitions
    var ApplicationRoute = container.lookupFactory('route:application');
    ApplicationRoute.reopen({
      actions: {
        error: function (error) {
          manager.handleError(error, {source: 'ember-route'});
        }
      }
    });


    //Capturing RSVP errors
    Ember.RSVP.onerror = function (error) {
      manager.handleError(error, {
        source: 'ember-rsvp'
      });
    };

    //Capturing ember errors
    Ember.onerror = function (error) {
      manager.handleError(error, {
        source: 'ember'
      });
    };

  }


});
