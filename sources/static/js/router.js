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
        this.route('accept', { path: '/accept' });
    })

    /************************************************************
     * Workspaces
     ************************************************************/
    this.resource('Workspaces', {path: '/workspaces'}, function () {
        // automatic Workspaces.index
        this.route('create', { path: '/create'});

        /************************************************************
         * Workspace
         ************************************************************/
        this.resource('Workspace', {path: '/w/:workspace'}, function () {
            // automatic Workspace.index

            // edit
            this.route('edit', { path: '/edit'});

            // member
            this.route('memberIndex', { path: '/team'});
            this.route('memberInvite', { path: '/team/invite'});
            this.route('memberApprove', { path: '/team/approve' });

            /************************************************************
             * Vaults
             ************************************************************/
            this.resource('Vaults', {path: '/vaults'}, function () {
                // automatic Vaults.index
                this.route('create', { path: '/create'});

                /************************************************************
                 * Vault
                 ************************************************************/
                this.resource('Vault', {path: '/v/:vault'}, function () {
                    // automatic Vault.index

                    // edit
                    this.route('edit', { path: '/edit'});

                    // members
                    this.route('memberIndex', { path: '/team'});
                    this.route('memberInvite', { path: '/team/invite'});


                    /************************************************************
                     * Cards
                     ************************************************************/
                    this.resource('Cards', {path: '/cards'}, function () {
                        // automatic Cards.index
                        this.route('create', { path: '/create'});

                        /************************************************************
                         * Card
                         ************************************************************/
                        this.resource('Card', {path: '/c/:card'}, function () {
                            // automatic Card.index

                            // edit
                            this.route('edit', { path: '/edit'});

                            // members
                            this.route('memberIndex', { path: '/team'});
                            this.route('memberInvite', { path: '/team/invite'});

                            this.resource('Secret', {path: '/secrets'}, function () {
                                // automatic Secrets.index

                                // secrets manipulation
                                this.route('createSelect', { path: '/create/select'});
                                this.route('createSubmit', { path: '/create/submit/:type'});
                                this.route('edit', { path: '/edit/:secret'});
                            })
                        })


                    });

                })

            })

        })

    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.resource('Home', {path: '/home'}, function () {
        //this.route('about', { path: '/about'});
    })

    this.route("ErrorGeneric", { path: "/errors/"});
    this.route("Error404", { path: "*path"}); //also referred as /errors/error-404

});

Service.Environment.current().set('router', router);

Vaultier.ApplicationRoute = Ember.Route.extend(
    {
        model: function (params, transition) {
            var auth = this.get('auth');
            var status = auth.reload()
            return status;
        }
    });

Vaultier.IndexRoute = Ember.Route.extend(
    {
        redirect: function () {
            var auth = this.get('auth');
            if (auth.get('isAuthenticated')) {
                return this.transitionTo('Workspaces.index');
            } else {
                return this.transitionTo('Home.index');
            }
        }
    });

