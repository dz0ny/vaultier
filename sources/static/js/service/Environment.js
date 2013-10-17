Po.NS('Service');

Service.Environment = Ember.Object.extend({

    workspace: null

});
Service.Environment.reopenClass(Utils.Singleton);