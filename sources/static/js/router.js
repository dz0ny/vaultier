Vaultier.Router.map(function () {

    this.route('AuthRegister', { path: '/auth/register' });
    this.route('AuthRegisterBefore', { path: '/auth/register/overview' });
    this.route('AuthRegisterKeys', { path: '/auth/register/generate-keys' });

    this.route('AuthLogin', { path: '/auth/login' });

    this.resource('Vault', { path: '/vault' }, function () {
        this.route('index', {queryParams: ['sort']});
    });

    this.resource('Workspace', { path: '/workspace' }, function () {
        this.route('create');
        this.route('switch');
    });
});


Vaultier.IndexRoute = Ember.Route.extend({
    redirect: function () {
        return this.transitionTo('Vault.index');
    }
});

/**
 * This is our parent route for whole application
 * - preloads or use preloaded all shared resources - like user and workspace
 */
Ember.Route = Ember.Route.extend({
    model: function (childPromise) {

        var store = this.get('store');

        if (!Vaultier.currentUser) {
            Vaultier.currentUser = store.find('workspace');
        }
        if (!Vaultier.currentWorkspace) {
            Vaultier.currentWorkspace = store.find('workspace');
        }

        var promise = Ember.RSVP.Promise(function (resolve, reject) {

            Ember.RSVP.hash({
                user: Vaultier.currentUser,
                workspace: Vaultier.currentWorkspace,
                child: childPromise
            }).then(function (promise) {
                    //@todo: when everything went well, we have currentUser and currentWorkspace
                    resolve(promise.child);
                }, function (error) {
                    console.error('Error during initialization of currentWorkspace and currentUser');
                    //@todo: shit happened
                    reject(error);
                })
        });

        return promise;
    }
})
