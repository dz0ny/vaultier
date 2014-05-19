Po.NS('Service');

/**
 * Service is responsible of new user environment initialization
 * e.g. when user registers and has  no invitation new workspace and default vault is created
 *
 */
Service.NewUserInit = Ember.Object.extend({
    /**
     * @DI service:auth
     */
    auth: null,

    /**
     * @DI service:invitations
     */
    invitations: null,


    /**
     * @DI service:router
     */
    router: null,


    /**
     * Creates route transition function after initialization
     * @param {Vaultier.Vault}vault
     * @param {Vaultier.Workspace}workspace
     */
    createTransitionFunction: function (workspace, vault) {
        var router = this.get('router');
        if (!vault || !workspace) {
            return function () {
                router.transitionTo('index')
            }
        } else {
            return function () {
                router.transitionTo('Vault.index', workspace, vault);
            }
        }
    },


    /**
     * if condition met function creates workspace and vault for new user
     *
     * returns success promise with desired transition function,
     * which executed transition router to page desired by initialization
     *
     * resolve({
     *          transitionAfterRegister: function,
     *          createdWorkspace: Vaultier.Workspace
     *          createdVault: Vaultier.Vault
     * })
     *
     * @return {Ember.RSVP.Promise}
     */
    initializeUser: function () {
        var auth = this.get('auth');
        var invitations = this.get('invitations')

        if (!auth.get('isAuthenticated')) {
            throw new Error('User is not authenticated')
        }

        // in case there are invitations in session do nothing
        if (invitations.hasInvitationsInSession()) {
            return Ember.RSVP.resolve(this.createTransitionFunction());
        }

        // prepare variables and copywriting
        var helpers = Utils.HandlebarsHelpers.create();
        var nickname = helpers.ucfirst(auth.get('user.nickname'));
        var workspaceName = '{nickname}\'s workspace';
        var workspaceDescription = '{nickname}\'s default workspace to store vaults, cards and secrets';
        var vaultName = 'Default vault';
        var vaultDescription = '{nickname}\'s default vault to store cards and secrets';

        // prepare objects to save
        var w = new Vaultier.Workspace()
        w.setProperties({
            name: workspaceName.replace('{nickname}', nickname),
            description: workspaceDescription.replace('{nickname}', nickname)
        });

        var v = new Vaultier.Vault();
        v.setProperties({
            name: vaultName.replace('{nickname}', nickname),
            description: vaultDescription.replace('{nickname}', nickname)
        });


        // saves the object
        var promise = Ember.RSVP.resolve()
            .then(function () {
                return w.saveRecord()
            })
            .then(function () {
                v.set('workspace', w.get('id'))
                return v.saveRecord();
            })
            .then(function () {
                return new Ember.RSVP.Promise(function (resolve) {
                    resolve({
                        transitionAfterRegister: this.createTransitionFunction(w,v),
                        /**
                         * Stores default workspace if created by newuserinitservice
                         */
                        defaultWorkspace: w,
                        /**
                         * Stores default vault if created by newuserinitservice
                         */
                        defaultVault: v
                    })
                }.bind(this));
            }.bind(this))

        return promise
    }

})
;
