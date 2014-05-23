Po.NS('Service');

Service.Environment = Ember.Object.extend({

    workspace: null,
    vault: null,
    card: null,
    secret: null,
    router: null

});
Service.Environment.reopenClass(Utils.Singleton);