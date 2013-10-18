Vaultier.Router.map(function () {

    /************************************************************
     * REGISTRATION
     ************************************************************/

    this.resource('AuthRegister', {path: '/auth/register'}, function () {
        this.route('before', { path: 'overview' });
        this.route('keys', { path: 'generate-keys' });
        this.route('creds', { path: 'submit-credentials' });
        this.route('sum', { path: '/registration-done' });
    })


    /************************************************************
     * Login
     ************************************************************/

    this.resource('AuthLogin', {path: '/auth/login'}, function () {
        this.route('switch', { path: '/switch-user' });
        this.route('latest', { path: '/latest-user' });
    })


    /************************************************************
     * Workspaces
     ************************************************************/
    this.resource('Workspace', {path: '/manage'}, function () {
        // automatic Workspace.index
        this.route('create', { path: '/action/create-workspace'});

        /************************************************************
         * Vaults
         ************************************************************/
        this.resource('Vault', {path: '/workspace/:workspace'}, function () {
            // automatic Vault.index
            this.route('create', { path: '/action/create-vault'});

            /************************************************************
             * Cards
             ************************************************************/
            this.resource('Card', {path: '/vault/:vault'}, function () {
                // automatic Card.index
                this.route('create', { path: '/create-card'});
            });

        })

    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.resource('Home', {path: '/home'}, function () {
        //this.route('about', { path: '/about'});
    })

    this.route("Error404", { path: "*path"});

})
;

Vaultier.ApplicationRoute = Ember.Route.extend({
    model: function (params, transition) {
        var auth = Vaultier.Services.Auth.AuthService.current();
        var status = auth.status()
        return status;
    }
});

Vaultier.IndexRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        redirect: function () {
            var auth = Vaultier.Services.Auth.AuthService.current();
            if (auth.get('isAuthenticated')) {
                return this.transitionTo('Workspace.index');
            } else {
                return this.transitionTo('Home.index');
            }
        }
    });

