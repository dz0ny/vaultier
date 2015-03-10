import Ember from 'ember';
/* global $, FileAPI */

export default Ember.View.extend({
  layoutName: 'layout/standard-layout-view',

  init: function() {
    this.set('changeFileHandler',this.changeFileHandler.bind(this));
    this._super();
  },

  didInsertElement: function () {
    this.configureChangeFileListener();
  },

  willDestroyElement: function() {
    this.removeChangeFileListener();
  },

  configureChangeFileListener: function() {
    this.removeChangeFileListener();
    $(document).on("change", '.vlt-login-key', this.changeFileHandler);
  }.observes('controller.latestUser'),

  removeChangeFileListener: function() {
    $(document).off("change", '.vlt-login-key', this.changeFileHandler);
  },

  changeFileHandler: function (e) {
    var controller = this.controller;
    var files = FileAPI.getFiles(e);
    FileAPI.readAsText(files[0], function (evt) {
      if (evt.type === 'load') {
        // Success
        controller.set('privateKey', evt.result);
        controller.set('filename', files[0].name);
      }
    });
  }

});
