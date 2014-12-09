ApplicationKernel.namespace('Vaultier.Mock');

Vaultier.Mock.BaseMock = Ember.Object.extend({

    fixtures:  [],

    run: function(app, container, enviroment) {
        throw new Exception("This method should be implemented");
    },

    findById: function(id) {
        var fixtureToReturn = null;
        this.fixtures.forEach(function(fixture) {
           if (fixture.id == id) {
               fixtureToReturn = fixture;
           }
        });
        return fixtureToReturn;
    }

});
