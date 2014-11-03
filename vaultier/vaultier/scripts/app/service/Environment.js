'use strict';

var Service = ApplicationKernel.namespace('Service');

Service.Environment = Ember.Object.extend({

    workspace: null,
    vault: null,
    card: null,
    secret: null,
    router: null

});