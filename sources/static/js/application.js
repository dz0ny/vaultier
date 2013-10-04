Ember.FEATURES["query-params"] = true

Vaultier = Ember.Application.create({
    LOG_TRANSITIONS : true
});

Vaultier.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
  namespace: 'api'
});
