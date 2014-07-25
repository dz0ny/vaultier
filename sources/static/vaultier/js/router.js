var router = Vaultier.Router.map(function () {

    /************************************************************
     * REGISTRATION
     ************************************************************/

    this.resource('AuthRegister', {path: '/auth/register'}, function () {
        this.route('before', { path: 'overview' });
        this.route('keys', { path: 'generate-keys' });
        this.route('creds', { path: 'submit-credentials' });
        this.route('sum', { path: '/registration-done' });
    });


    /************************************************************
     * Login
     ************************************************************/

    this.route('AuthLogin', {path: '/auth/login'});

    /*************************************************************
     * Recovery Key
     *************************************************************/

    this.resource('AuthLostKey', {path: '/lostkey'}, function () {
        this.route('success', {path: 'success'});

        this.resource('AuthLostKeyRecovery', {path: '/:id/:hash'}, function () {
            this.route('reset', {path: 'reset'});
            this.route('rebuild', {path: 'rebuild'});
            this.route('disable', {path: 'disable'});
            this.route('success', {path: 'success'});
        });
    });

    /************************************************************
     * invitations
     ************************************************************/

    this.resource('Invitation', {path: '/invitations'}, function () {
        // automatic Invitation.index
        this.route('use', { path: '/use/:invitation/:hash' });
        this.route('anonymous', { path: '/anonymous' });
        this.route('accept', { path: '/accept' });
    });

    /************************************************************
     * Settings
     ************************************************************/

    this.resource('Settings', {path: '/settings'}, function () {
        // automatic Settings.index
        this.route('personal', { path: '/personal' });
        this.route('keys', { path: '/keys' });

    });


    /************************************************************
     * Workspaces
     ************************************************************/
    this.resource('Workspaces', {path: '/workspaces'}, function () {
        // automatic Workspaces.index
        this.route('create', { path: '/create'});
        this.route('select', { path: '/select'});

        /************************************************************
         * Workspace
         ************************************************************/
        this.resource('Workspace', {path: '/w/:workspace'}, function () {
            // automatic Workspace.index

            // edit
            this.route('edit', { path: '/edit'});

            // no keys
            this.route('noKeys', { path: '/waiting-for-keys'});

            // member
            this.route('memberIndex', { path: '/team'});
            this.route('memberInvite', { path: '/team/invite'});

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

                            // move
                            this.route('move', { path: '/move'});

                            // members
                            this.route('memberIndex', { path: '/team'});
                            this.route('memberInvite', { path: '/team/invite'});

                            this.resource('Secret', {path: '/secrets'}, function () {
                                // automatic Secrets.index

                                // secrets manipulation
                                this.route('createSelect', { path: '/create/select'});
                                this.route('createSubmit', { path: '/create/submit/:type'});
                                this.route('edit', { path: '/edit/:secret'});
                                this.route('move', { path: '/move/:secret'});
                            });
                        });

                    });

                });

            });

        });

    });

    /************************************************************
     * System and error routes
     ************************************************************/

    this.resource('Home', {path: '/home'}, function () {
        //this.route('about', { path: '/about'});
    });

    this.route("ErrorGeneric", { path: "/errors/"});
    this.route("Error404", { path: "*path"}); //also referred as /errors/error-404

});

Ember.Route.reopen({
    activate: function () {
        this._super();
        window.scrollTo(0, 0);
    }
});

Vaultier.ApplicationRoute = Ember.Route.extend(
    {
        actions: {

            error: function (error, transition) {
                this.get('errors').processError(error);
                return false;
            },

            loading: function (transition, originRoute) {
                ApplicationLoader.showLoader();
//                Ember.run.scheduleOnce('afterRender', this, function () {
//                    ApplicationLoader.hideLoader();
//                })
                transition.promise.finally(function () {
                    ApplicationLoader.hideLoader();
                }.bind(this))
            }

        },

        beforeModel: function (params, transition) {
            // reload authenticated user from server
            var auth = this.get('auth');
            var status = auth.reload()
            return status;

        }
    })
;

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

