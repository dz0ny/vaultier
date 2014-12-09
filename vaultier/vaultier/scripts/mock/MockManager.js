ApplicationKernel.namespace('Vaultier.Mock');

Vaultier.Mock.MockManager = {

    mocks: [],

    registerMock: function(mock) {
        this.mocks.push(mock);
    },

    runMocks: function(app, container) {
        this.mocks.forEach(function(mock) {
           mock.run();
        });
    }

}