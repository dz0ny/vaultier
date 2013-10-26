var router = Vaultier.Router.map(function () {

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
     * invitations
     ************************************************************/

    this.resource('Invitation', {path: '/invitations'}, function () {
        this.route('use', { path: '/use/:invitation/:hash' });
        this.route('anonymous', { path: '/anonymous' });
        this.route('accepted', { path: '/accepted' });
    })

    /************************************************************
     * Workspaces
     ************************************************************/
    this.resource('Workspace', {path: '/manage'}, function () {
        // automatic Workspace.index
        this.route('create', { path: '/action/create-workspace'});
        this.route('edit', { path: '/action/edit-workspace/:workspace'});

        /************************************************************
         * Vaults
         ************************************************************/
        this.resource('Vault', {path: '/workspace/:workspace'}, function () {
            // automatic Vault.index
            this.route('create', { path: '/action/create-vault'});
            this.route('edit', { path: '/action/edit-vault/:vault'});

            /************************************************************
             * Members
             ************************************************************/
            this.route('memberIndex', { path: '/team'});
            this.route('memberInvite', { path: '/team/invite'});

            /************************************************************
             * Cards
             ************************************************************/
            this.resource('Card', {path: '/vault/:vault'}, function () {
                // automatic Card.index
                this.route('create', { path: '/create-card'});
                this.route('edit', { path: '/action/edit-card/:card'});

                /************************************************************
                 * Card detail
                 ************************************************************/
                this.resource('Secret', {path: '/card/:card'}, function () {
                    // automatic Vault.index
                    this.route('createSelect', { path: '/action/create-secret/select'});
                    this.route('createSubmit', { path: '/action/create-secret/submit/:type'});
                    this.route('edit', { path: '/action/edit-secret/:secret'});
                });
            });

        })

    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.resource('Home', {path: '/home'}, function () {
        //this.route('about', { path: '/about'});
    })

    this.route("Error400", { path: "/errors/error-400"});
    this.route("Error403", { path: "/errors/error-403"});
    this.route("Error404", { path: "*path"}); //also referred as /errors/error-404

});

Service.Environment.current().set('router', router);


Vaultier.ApplicationRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        model: function (params, transition) {
            var auth = Service.Auth.current();
            var status = auth.reload()
            return status;
        }
    });

Vaultier.IndexRoute = Ember.Route.extend(
    Utils.ErrorAwareRouteMixin,
    {
        redirect: function () {
            var auth = Service.Auth.current();
            if (auth.get('isAuthenticated')) {
                return this.transitionTo('Workspace.index');
            } else {
                return this.transitionTo('Home.index');
            }
        }
    });

