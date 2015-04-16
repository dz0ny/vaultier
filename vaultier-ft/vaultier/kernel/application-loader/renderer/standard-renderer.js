import AbstractRenderer from './abstract-renderer';
import $ from './../../../bower_components/jquery/dist/jquery.min.js';

export default AbstractRenderer.extend({

  loaderStyles: {
    'color': ' #347AB4',
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'font-size': ' 18px',
    'font-weight': ' bolder',
    'width': ' 300px',
    'height': ' 300px',
    'line-height': ' 300px',
    'margin-left': ' -150px',
    'margin-top': ' -150px',
    'background-image': " url('/images/preloader_250x250.gif')",
    'background-repeat': 'no-repeat',
    'background-size': ' 180px 180px',
    'background-position': ' 50% 50%',
    'border-radius': '6px',
    'background-color': '#ffffff',
    'position': ' absolute',
    'top': ' 50%',
    'left': ' 50%',
    'text-align': 'center',
    'vertical-align': ' bottom'
  },

  overlayStyles: {
    'z-index': '2000',
    'opacity': '1',
    'background-color': '#FFFFFF',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%'
  },

  loaderEl: null,
  loaderElQueue: null,

  showLoader: function () {

    if (!this.loaderEl) {

      var text = $('<div />')
        .addClass("vlt-text")
        .css(this.loaderStyles);

      var overlay = $('<div />')
        .addClass('vlt-loading-overlay')
        .css(this.overlayStyles);

      this.loaderEl = overlay
        .append(text)
        .appendTo('body');

      this.loaderElQueue = this.loaderEl.fadeIn(100);

    }
  },

  showLoaderText: function (text) {
    if (this.loaderEl) {
      this.loaderEl.find('.vlt-text').html(text);
    }
  },

  hideLoader: function (duration) {

    if (this.loaderEl) {
      if (!duration) {
        duration = 500;
      }
      this.loaderElQueue
        .fadeOut(duration)
        .queue(function () {
          this.loaderElQueue = null;
          this.loaderEl.remove();
          this.loaderEl = null;
        }.bind(this));
    }
  },

  showLoaderUponPromise: function (promise) {
    this.showLoader();
    return promise
      .then(function (result) {
        this.hideLoader();
        return RSVP.resolve(result);
      }.bind(this))
      .catch(function (error) {
        this.hideLoader();
        return RSVP.reject(error);
      }.bind(this));
  }




});

