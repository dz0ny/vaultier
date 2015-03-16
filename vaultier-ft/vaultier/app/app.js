import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import PerModelAdapter from 'vaultier/app/models/core/per-model-adapter';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

PerModelAdapter.appInstall(App);
loadInitializers(App, config.modulePrefix);

export default App;
