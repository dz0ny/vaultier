Vaultier.Router.map(function () {
    this.resource('Auth', { path: '/auth' }, function () {
        this.route('login');
        this.route('register');
    });


    this.resource('Vault', { path: '/vault' }, function () {
        this.route('index', {queryParams: ['sort']});
    });

    this.resource('Workspace', { path: '/workspace' }, function () {
        this.route('create');
        this.route('switch');
    });
});


//Vaultier.IndexCreateRoute = Ember.Route.extend({
//    renderTemplate: function (controller, model) {
//        this.render('Kuba');
//    }
//});
//








Vaultier.IndexRoute = Ember.Route.extend({
    redirect: function () {
        return this.transitionTo('Vault.index');
    }
});

Vaultier.ApplicationRoute = Em.Route.extend({
  actions: {
    openModal: function(modal) {
      this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function() {
        this.render('empty', {
          into: 'application',
          outlet: 'modal'
        });
    }
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
