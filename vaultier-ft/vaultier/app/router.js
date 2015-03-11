import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  /************************************************************
   * REGISTRATION
   ************************************************************/

  this.resource('auth-register', {path: '/auth/register'}, function () {
    this.route('step-before', { path: 'overview' });
    this.route('step-keys', { path: 'generate-keys' });
    this.route('step-creds', { path: 'submit-credentials' });
    this.route('step-sum', { path: 'registration-done' });
  });


  /************************************************************
   * LOGIN
   ************************************************************/

  this.resource('auth-login', {path: '/auth/login'}, function () {
    this.route('index', {path: 'index'});
  });

  /************************************************************
   * LOSTKEY
   ************************************************************/

  this.resource('auth-lostkey', {path: '/auth/lostkey'}, function () {
  });



});

export default Router;
