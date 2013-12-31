Vaultier.registerDI = function(app) {

        // service:errors
        app.register('service:errors', Service.Errors)
        app.inject('route', 'errors', 'service:errors');
        app.inject('service:errors', 'errorController', 'controller:ErrorGeneric')
        app.inject('service:errors', 'router', 'router:main')
        app.__container__.lookup('service:errors').register();

        // service:session
        app.register('service:session', Service.Session)

        // service:auth
        app.register('service:auth', Service.Auth)
        app.inject('service:auth', 'coder', 'service:coder')
        app.inject('service:auth', 'store', 'store:main')
        app.inject('service:auth', 'session', 'service:session')
        app.inject('route', 'auth', 'service:auth');
        app.inject('controller', 'auth', 'service:auth');

        // service:coder
        app.register('service:coder', Service.Coder)

        // service:invitations
        app.register('service:invitations', Service.Invitations)
        app.inject('service:invitations', 'store', 'store:main')
        app.inject('service:invitations', 'session', 'service:session')
        app.inject('service:invitations', 'auth', 'service:auth');
        app.inject('route:InvitationUse', 'invitations', 'service:invitations')
        app.inject('route:InvitationAccept', 'invitations', 'service:invitations')
        app.inject('route:WorkspaceMemberInvite', 'invitations', 'service:invitations')
        app.inject('route:VaultMemberInvite', 'invitations', 'service:invitations')
        app.inject('route:CardMemberInvite', 'invitations', 'service:invitations')
        app.inject('route:Workspaces', 'invitations', 'service:invitations')

        // service:members
        app.register('service:members', Service.Members)
        app.inject('service:members', 'auth', 'service:auth')
        app.inject('service:members', 'store', 'store:main');
        app.inject('service:members', 'coder', 'service:coder')
        app.inject('route:WorkspacesCreate', 'members', 'service:members')
        app.inject('route:Workspace', 'members', 'service:members')
        app.inject('route:WorkspaceMemberApprove', 'members', 'service:members')

        // model:Role
        app.inject('model:Role', 'auth', 'service:auth');

        // model:Workspace
        app.inject('model:Workspace', 'members', 'service:members');

        // model:Secret
        app.inject('model:Secret', 'members', 'service:members');



}