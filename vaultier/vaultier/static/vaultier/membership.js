Vaultier.InvitationUseRoute = Ember.Route.extend(
    {

        /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            transition.abort();
            return this.get('invitations').useInvitation(params.invitation, params.hash, params.data);
        }
    });


Vaultier.InvitationAcceptRoute = Ember.Route.extend(
    {

        /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            var invitations = this.get('invitations');
            var promise = invitations
                .fetchInvitationsInSession()
                .catch(function (error) {
                    transition.abort();
                    invitations.clearInvitationsInSession();

                    if (
                        (error && error.status == 400 && error.errors && error.errors.hash) // already accepted
                        || (error && error.status == 404) // not found
                        ) {
                        this.get('errors').consoleError(error)
                        this.get('errors').renderError({
                            title: 'Invalid invitation.',
                            message: 'this invitation cannot be used. Either it does not exist or it has been used by another member'
                        });
                    } else {
                        throw new Error('Invalid invitation');
                    }

                }.bind(this));

            return promise;
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model);
            var environment = this.get('environment');
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addText('List of invitations to accept')
            );
        },

        actions: {
            acceptInvitations: function () {
                var invitations = this.get('controller.content');
                var service = this.get('invitations');
                var promise = service.acceptInvitationsInSession(invitations).
                    then(function () {
                        service.clearInvitationsInSession();
                        $.notify('You have accepted your invitations', 'success');
                        this.transitionTo('index')
                    }.bind(this));

                ApplicationLoader.promise(promise);
            },

            rejectInvitations: function () {
                var invitations = this.get('invitations');
                invitations.clearInvitationsInSession();
                $.notify('You have rejected your pending invitations', 'warning');
                this.transitionTo('index')
            }
        }
    });

Vaultier.InvitationAnonymousRoute = Ember.Route.extend(
    {
        setupController: function (ctrl, model) {
            ctrl.set('content', model);
            var environment = this.get('environment');
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: environment})
                    .addHome()
                    .addText('Accept invitation')
            );
        }
    });


Vaultier.InvitationAcceptView = Ember.View.extend({
    templateName: 'Invitation/InvitationAccept',
    layoutName: 'Layout/LayoutStandard'
});

Vaultier.InvitationListView = Ember.View.extend({
    templateName: 'Invitation/InvitationList',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.InvitationAnonymousView = Ember.View.extend({
    templateName: 'Invitation/InvitationAnonymous',
    layoutName: 'Layout/LayoutStandard'
});


Vaultier.RolesAdminInviteInput = Ember.Component.extend({
    classNames: ['vaultier-roles-admin-invite-input'],

    value: null,

    store: null,

    auth: null,

    workspace: null,

    tagName: "input",

    didInsertElement: function () {

        if (!this.store) {
            throw 'RolesAdminInviteInput requires store to autocomplete. Inject store to component as store=store'
        }
        if (!this.workspace) {
            throw 'RolesAdminInviteInput requires workspace to autocomplete. Inject workspace to component as workspace=workspace'
        }
        if (!this.auth) {
            throw 'RolesAdminInviteInput requires auth service to autocomplete. Inject auth to component as auth=auth'
        }

        var el = Ember.$(this.get('element'));

        var ajaxQueryContext = {};

        function validateEmail(email) {
            // http://stackoverflow.com/a/46181/11236
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }


        var ajaxQuery = function () {
            var members = this.store.find('Member', {
                workspace: Utils.E.recordId(this.workspace),
                search: this.query.term,
                ordering: '-status'
            })
                .then(function (members) {
                    var results = [];
                    members.forEach(function (member) {
                        var invitation = member.get('status') == member.statuses['INVITED'].value;

                        // do not include current user
                        if (member.get('user') != this.auth.get('user.id')) {
                            results.push({
                                invitation: invitation,
                                text: member.get('email'),
                                id: invitation ? member.get('email') : member.get('id'),
                                nickname: member.get('nickname'),
                                email: member.get('email')
                            });
                        }
                    }.bind(this));
                    this.query.callback({results: results});
                }.bind(this))
        };


        el.select2({
            tokenSeparators: [",", " ", ";"],
            createSearchChoice: function (term, data) {
                var add = true;
                data.forEach(function (member) {
                    if (term == member.id) {
                        add = false;
                        return false;
                    }
                });

                if (!validateEmail(term)) {
                    add = false;
                }

                if (add) {
                    return {
                        invitation: true,
                        text: term,
                        nickname: term,
                        email: term.toLowerCase(),
                        id: term.toLowerCase()
                    }
                }
            },
            multiple: true,
            query: function (query) {
                ajaxQueryContext.store = this.get('controller.store')
                ajaxQueryContext.query = query;
                ajaxQueryContext.auth = this.get('auth')
                ajaxQueryContext.workspace = this.get('workspace')
                Ember.run.debounce(ajaxQueryContext, ajaxQuery, 500);

            }.bind(this),

            formatResult: function (member) {
                var str = Utils.HandlebarsHelpers.current().printUser(member, {
                    hash: {
                        disableTooltip: true,
                        displayEmailInsideBrackets: !member.invitation
                    }
                });
                if (member.invitation) {

                    str = 'Invite <b>' + str + '</b>'
                } else {
                    str = 'grant to <b>' + str + '</b>'
                }
                return str
            },

            formatSelection: function (member) {
                var str = Utils.HandlebarsHelpers.current().printUser(member, {hash: {disableTooltip: true}});
                if (member.invitation) {
                    str = 'Invite <b>' + str + '</b>'
                } else {
                    str = 'grant to <b>' + str + '</b>'
                }
                return str
            }

        });

        el.on('change', function (e) {
            this.set('value', e.val)
        }.bind(this));

    }

});


Vaultier.RolesAdminIndexRoute = Ember.Route.extend(
    {

        inviteObject: null,

        model: function (params, transition) {
            // setup invite data
            this.setProperties(this.setupInviteData(params))

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.get('inviteObject.perms.invite')
            }.bind(this), true)) {
                return;
            }

            // do lookup
            var blocks = this.setupBlocks();
            var workspace = this.modelFor('Workspace');
            var vault = this.modelFor('Vault');
            var card = this.modelFor('Card');

            var store = this.get('store')

            var queries = {
                workspace: null,
                workspaceRoles: null,
                vault: null,
                vaultRoles: null,
                card: null,
                cardRoles: null
            };

            if (blocks.workspace) {
                queries.workspace = workspace
                queries.workspaceRoles = store.find('Role', {
                    to_workspace: workspace.get('id')
                })
            }

            if (blocks.vault) {
                queries.vault = vault
                queries.vaultRoles = store.find('Role', {
                    to_vault: vault.get('id')
                })
            }

            if (blocks.card) {
                queries.card = card
                queries.cardRoles = store.find('Role', {
                    to_card: card.get('id')
                })
            }

            var models = Ember.RSVP.hash(queries);

            return models;
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupBlocks: function () {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupInviteRoute: function (models) {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupInviteData: function (params) {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupRoleLevels: function () {
            return Vaultier.Role.proto().roles.toArray();
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupBreadcrumbs: function () {
            throw 'Please override this in your route'
        },

        setupController: function (ctrl, models) {
            var blocks = [];


            if (models.card) {
                blocks.push(Ember.Object.create({
                    url: null,
                    type: 'card',
                    object: models.card,
                    roles: models.cardRoles
                }));
            }

            if (models.vault) {
                blocks.push(Ember.Object.create({
                    type: 'vault',
                    url: this.get('router').generate('Vault.rolesAdminIndex', models.vault),
                    object: models.vault,
                    roles: models.vaultRoles
                }));
            }

            if (models.workspace) {
                blocks.push(Ember.Object.create({
                    type: 'workspace',
                    url: this.get('router').generate('Workspace.rolesAdminIndex', models.workspace),
                    object: models.workspace,
                    roles: models.workspaceRoles
                }));
            }


            ctrl.set('content', blocks)

            // setup roles
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('controller', this);

            // set invite route
            ctrl.setProperties(this.setupInviteRoute(models));

            // set breadcrumbs
            ctrl.set('breadcrumbs', this.setupBreadcrumbs(models))
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminIndex', {controller: this.get('controller')})
        },


        actions: {
            deleteRole: function (role, block) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = role
                        .deleteRecord()
                        .then(function () {
                            block.roles.removeObject(role);
                            $.notify('User\'s permission has been removed.', 'success');
                        })
                        .catch(function (error) {
                            $.notify('Ooops! Something went wrong.', 'error');
                            this.get('errors').logError(error)
                        }.bind(this))

                    ApplicationLoader.promise(promise)
                });


            },

            changeRole: function (role, block) {
                var promise = role
                    .saveRecord()
                    .then(function () {
                        $.notify('User\'s permission has been updated.', 'success');
                    })
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error)
                    }.bind(this))

                ApplicationLoader.promise(promise)
            }
        }



    });

Vaultier.RolesAdminIndexController = Ember.Controller.extend({
    currentObject: null,
    blocks: function () {
        var shownIndex = 0;
        return this.get('content').map(function (item, index) {
            var isHidden = item.roles.get('length') === 0 && index > 0;
            if (!isHidden) {
                shownIndex++;
            }
            if (index < 1) {
                this.set('currentObject', item.get('object'));
            }
            var isSecond = !isHidden && shownIndex === 2;

            item.setProperties({
                index: index,
                isSecond: isSecond,
                isHidden: isHidden,
                readOnly: index > 0
            });
            var roles = Utils.RolesProxy.create({
                content: item.roles
            });
            roles.filterCreateRolesByObjectScope(this.get('currentObject'));
            item.set('roles', roles.toArray());
            return item;
        }.bind(this));
    }.property('content.@each')
});


Vaultier.RolesAdminIndexView = Ember.View.extend({
    templateName: 'RolesAdmin/RolesAdminIndex',
    layoutName: 'Layout/LayoutStandard',

    AnimatedItemWrapper: Ember.View.extend({
        Item: Ember.View.extend({
            tagName: 'div',
            Select: Ember.Selectize.extend({
                didInsertElement: function() {
                    this.renderOptions = {
                        option: function (item, escape) {
                            var item = Vaultier.Role.proto().roles.getByValue(item.value);
                            return [
                                '<div>',
                                    '<div>' + item.text + '</div>',
                                    '<div class="help-block">' + item.desc + '</div>',
                                '</div>'
                            ].join('')
                        }
                    };
                    this._super();
                },
                changeData: function (obj) {
                    var roleType = Vaultier.Role.proto().roles.getByValue(obj.value);
                    set(this, 'selection', roleType);
                    set(this, 'data.level', obj.value);
                    get(this, 'controller').send('changeRole', get(this, 'data'));
                }
            })
        }),
        animateOut: function (done) {
            EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
        }
    })

});



Vaultier.RolesAdminInviteRoute = Ember.Route.extend(
    {

        inviteObject: null,

        model: function (params, transition) {
            this.setProperties(this.setupInviteData(params));

            // check permissions
            if (!this.get('auth').checkPermissions(transition, function () {
                return this.get('inviteObject.perms.invite')
            }.bind(this), true)) {
                return;
            }
        },

        /**
         * override this to setup invite workspace and invite to object
         */
        setupInviteData: function (params) {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupBreadcrumbs: function () {
            throw 'Please override this in your route'
        },

        /**
         * override this to setup invite breadcrumbs
         */
        setupRoleLevels: function () {
            return Vaultier.Role.proto().roles.toArray();
        },

        getDefaultRoleLevel: function() {
            return Vaultier.Role.proto().roles['READ'].value
        },

        actions: {
            save: function (invited, role, resend) {
                var invitations = this.get('invitations');
                var inviteWorkspace = this.get('inviteWorkspace');
                var inviteParams = this.get('inviteParams');
                var invitedPromises = [];

                invited.forEach(function (emailOrId) {
                    invitedPromises.push(
                        invitations.invite(
                            inviteWorkspace,
                            emailOrId,
                            role.level,
                            inviteParams,
                            true,
                            resend
                        ));
                });

                var bulk = Ember.RSVP.all(invitedPromises)
                    .then(function () {
                        $.notify('Your invitations have been saved', 'success');
                        window.history.go(-1);
                    })
                    .catch(function () {
                        $.notify('Ooops! Something went wrong.', 'error');
                    })

                ApplicationLoader.promise(bulk);

                return bulk;
            }
        },

        setupController: function (ctrl, model) {
            ctrl.set('workspace', this.modelFor('Workspace'))
            ctrl.set('breadcrumbs', this.setupBreadcrumbs());
            ctrl.set('invited', []);
            ctrl.set('role', {level: this.getDefaultRoleLevel()});
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('defaultValue', Vaultier.Role.proto().roles.toArray()[0].value);
            ctrl.set('invitation_lifetime',this.get('config.invitation_lifetime'));
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminInvite', {controller: this.get('controller')})
        }

    });

Vaultier.RolesAdminInviteController = Ember.Controller.extend({
    workspace: null,
    role: null,
    invited: [],
    resend: true,

    isSubmitDisabled: function () {
        return !this.get('invited.length') || !this.get('role.level')
    }.property('invited.length', 'role.level'),

    breadcrumbs: null
});

Vaultier.RolesAdminInviteView = Ember.View.extend({
    templateName: 'RolesAdmin/RolesAdminInvite',
    layoutName: 'Layout/LayoutStandard',

    Select: Ember.Selectize.extend({
        didInsertElement: function() {
            this.renderOptions = {
                option: function (item, escape) {
                    var item = Vaultier.Role.proto().roles.getByValue(item.data.value);
                    return [
                        '<div>',
                            '<div>' + item.text + '</div>',
                            '<div class="help-block">' + item.desc + '</div>',
                        '</div>'
                    ].join('')
                  }
              };
              this._super();
        },

        changeData: function (obj) {
            var roleType = Vaultier.Role.proto().roles.getByValue(obj.value);
            set(this, 'selection', roleType);
            set(this, 'data.level', obj.value);
        }
    })
});

Vaultier.RolesAdminBoxComponent = Ember.Component.extend({
    layoutName: 'RolesAdmin/RolesAdminBox',

    init: function () {
        this._super.apply(this, arguments);
        this.checkParameters();
    },

    object: null,

    checkParameters: function () {
        var roles = this.get('roles');
        var user = this.get('user');
        if (Object.prototype.toString.call(roles) != '[object Array]') {
            throw new Error('Roles array has to be passed as roles=[Vaultier.Role] parameter');
        }

        if (!user || user.constructor != Vaultier.User) {
            throw new Error('Current user has to be passed as user=Vaultier.User')
        }

    },


    processedRoles: function () {
        // remove me from roles
        var roles = Utils.RolesProxy.create({
           content: this.get('roles')
        });

        // filter create roles for inherited permissions
        roles.filterCreateRolesByObjectScope(this.get('object'));

        // each user to be only once at result
        var foundRoles = []
        roles = roles.filter(function (role) {
            var id = role.get('member.id');
            if (foundRoles.indexOf(id) == -1) {
                foundRoles.push(id);
                return role;
            }
        });

        return roles;
    }.property('roles'),

    hasAny: function () {
        if (this.get('processedRoles').get('length') > 0) {
            return true;
        }
        return false;
    }.property('processedRoles'),

    hasRead: function () {
        return this.get('rolesRead').length != 0
    }.property('rolesRead'),

    rolesRead: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['READ'].value) {
                return role;
            }
        });
    }.property('processedRoles'),

    hasCreate: function () {
        return this.get('rolesCreate').length != 0
    }.property('rolesCreate'),

    rolesCreate: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['CREATE'].value) {
                return role;
            }
        });
    }.property('processedRoles'),


    hasWrite: function () {
        return this.get('rolesWrite').length != 0
    }.property('rolesWrite'),

    rolesWrite: function () {
        return this.get('processedRoles').filter(function (role) {
            if (role.get('level') == Vaultier.Role.proto().roles['WRITE'].value) {
                return role;
            }
        });
    }.property('processedRoles')

});


'use strict';

Vaultier.RolesAdminManagementRoute = Vaultier.RolesAdminIndexRoute.extend({
    model: function (params, transition) {

        this.setProperties(this.setupInviteData(params));

        var workspace = this.modelFor('Workspace');

        var store = this.get('store');
        var members = store.find('Member', { workspace: workspace.get('id')})
            .then(function (response) {
                return Em.ArrayProxy.create({
                    content: response
                });
            });

        var queries = {
            workspace: workspace,
            members: members
        };
        return  Ember.RSVP.hash(queries);
    },

    setupController: function (ctrl, model) {

        ctrl.set('content', model);

        // set breadcrumbs
        ctrl.set('breadcrumbs', this.setupBreadcrumbs(model))
    },

    renderTemplate: function () {
        this.render('RolesAdminManagement', {controller: this.get('controller')});
    },
    actions: {
        deleteRole: function (context, role) {

            Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                var promise = role
                    .deleteRecord()
                    .then(function () {
                        var roles = context.get('roles');
                        roles.removeObject(role);
                        $.notify('Role has been removed', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            });
        },
        loadRoles: function (context, member) {
            var roles = context.get('roles');

            var store = this.get('store');
            var promise = store.find(
                'Role',
                {
                    to_workspace: member.get('workspace'),
                    to_member: member.get('id')
                }).then(function (response) {
                    var memberRoles = Em.ArrayProxy.create({content: response}).toArray();

                    context.set('roles', memberRoles);
                    return memberRoles;
                }.bind(this));
            ApplicationLoader.promise(promise);
        },
        deleteMember: function (context, member) {

            Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

                var promise = member
                    .deleteRecord()
                    .then(function () {
                        var members = context.get('members');
                        members.removeObject(member);
                        $.notify('RolesAdmin has been removed', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            });
        }
    }
});

Vaultier.RolesAdminManagementController = Vaultier.RolesAdminIndexController.extend({
    members: function () {

        var user = this.get('auth.user');
        return this.get('content.members').filter(function (item, index) {
                return item.get('email') !== user.get('email');
            }
        ).toArray();
    }.property('content.@each')
});


Vaultier.RolesAdminManagementView = Vaultier.RolesAdminIndexView.extend({
    templateName: 'RolesAdmin/RolesAdminManagement'
});


Vaultier.RolesAdminManagerAccordionComponent = Em.Component.extend({
    store: null,
    layoutName: 'RolesAdmin/RolesAdminManagerAccordion',
    buildId: function (str) {
        str = str.replace(/[@\.]/g, ' ');
        return Em.String.dasherize(str) + '-roles';
    },
    targetElement: function () {
        var str = this.buildId(this.get('member.nickname'));
        return '#' + str;
    }.property(),
    id: function () {
        return this.buildId(this.get('member.nickname'));
    }.property(),
    roles: null,
    control: null,
    member: null,
    roleLevels: function () {
        return Vaultier.Role.proto().roles.toArray();
    }.property('content.@each'),
    actions: {

        loadRoles: function () {
            this.sendAction('loadRoles', this.get('context'), this.get('member'));
        },
        deleteRole: function (role) {
            this.sendAction('deleteRole', this.get('context'), role);
        },
        deleteMember: function (member) {
            this.sendAction('deleteMember', this.get('context'), member);
        }
    }
})
;

/**
 *
 * Mixin to be used on routes, to provide actions for MembersList views
 *
 * @class MembersAdminListActionsMixin
 * @namespace Vaultier
 */
Vaultier.MembersAdminListActionsMixin = Ember.Mixin.create({
    actions: {
        deleteRole: function (member, role) {

            var loggedUserId = this.get('auth.user.id');
            var deleteUserId = member.get('user');

            if (loggedUserId == deleteUserId && role.get('to_workspace') != null) {
                throw new Error('You can not delete yourself.');
            } else {
                Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                    var promise = role
                        .deleteRecord()

                        .then(function () {

                            var roles = member.get('roles');
                            roles.removeObject(role);
                            member.set('roles_count', roles.get('length'));

                            $.notify('Role has been remove', 'success');
                        }.bind(this))

                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationLoader.promise(promise);

                });
            }
        },

        /**
         * Delete a member from the workspace and all his roles inside of it
         * @param context
         * @param member
         */

        deleteMember: function (members, member) {
            var loggedUserId = this.get('auth.user.id');
            var deleteUserId = member.get('user');

            if (loggedUserId == deleteUserId) {
                throw new Error('You can not delete yourself.');
            } else {
                Vaultier.confirmModal(this, 'Are you sure you want to delete this member?', function () {

                    var promise = member
                        .deleteRecord()

                        .then(function () {
                            members.removeObject(member);
                            $.notify('Member has been removed', 'success');
                        }.bind(this))

                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            console.error(error);
                            //this.get('errors').logError(error);
                        }.bind(this));

                    ApplicationLoader.promise(promise);
                }.bind(this));
            }
        },

        /**
         * Retrieves one member roles for the actual workspace
         * @param context
         * @param member
         */
        loadRoles: function (member) {
            var store = this.get('controller.store');
            var promise = store
                .find('Role', {
                    member: member.get('id')
                })
                .then(function (roles) {
                    member.set('roles', roles)
                    member.set('roles_count', roles.get('length'));
                }.bind(this));
            ApplicationLoader.promise(promise);
        }
    }
});

/**
 *
 * Single member item
 *
 * @class MembersAdminListItemView
 * @namespace Vaultier
 */
Vaultier.MembersAdminListItemView = Ember.View.extend({

    layoutName: 'MembersAdmin/MembersAdminListItem',

    member: function (key, member) {

        if (arguments.length > 1 && !this.get('_member')) {
            // setter
            this.set('_member', member)
        }

        return this.get('_member');
    }.property('_member'),

    myself: function() {
        var loggedUserId = this.get('controller.auth.user.id');
        var deleteUserId = this.get('content.user');
        return loggedUserId == deleteUserId;
    }.property(),

    onRolesEmpty: function () {
        if (!this.get('member.roles.length')) {
            this.hideRoles();
        }
    }.observes('member.roles.length'),

    onRolesLoaded: function () {
        if (this.get('member.roles.length')) {
            this.showRoles();
        }
    }.observes('member.roles'),


    showRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideDown();
        }.bind(this))
    },

    hideRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideUp();
        }.bind(this))
    },

    toggleRoles: function () {
        Ember.run.next(function () {
            this.$('.vlt-panel-members-roles').slideToggle();
        }.bind(this))
    },

    animateOut: function (done) {
        EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
    },

    AnimatedView: Ember.View.extend({
        animateOut: function (done) {
            EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
        }
    }),

    actions: {

        /**
         * Toggles roles
         * @param context
         * @param role
         */
        toggleRoles: function (member) {
            this.set('member', member);
            if (this.get('member.roles')) {
                this.toggleRoles();
            } else {
                this.get('controller').send('loadRoles', member);
            }


        }
    }
});

/**
 *
 * Single role item of single member
 *
 * @class MembersAdminRoleItemView
 * @namespace Vaultier
 */
Vaultier.MembersAdminRoleItemView = Ember.View.extend({
    templateName: 'MembersAdmin/MembersAdminRoleItem',

    cannotDelete: function() {
        var loggedUserId = this.get('controller.auth.user.id');
        var deleteUserId = this.get('role.member.user');
        return loggedUserId == deleteUserId && this.get('role.to_workspace') != null;
    }.property(),

    animateOut: function (done) {
        EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
    },

    icon: function () {
        var types = Vaultier.Role.proto().types;
        if (this.get('role.relatedObjectType') == types.TO_CARD.value) {
            return '/static/vaultier/images/icon-card-grey.png';
        }
        if (this.get('role.relatedObjectType') == types.TO_VAULT.value) {
            return '/static/vaultier/images/icon-vault-grey.png';
        }
        if (this.get('role.relatedObjectType') == types.TO_WORKSPACE.value) {
            return '/static/vaultier/images/icon-workspace-grey.png';
        }
    }.property('role.relatedObjectType')
});

/**
 *
 * List view of all members
 *
 * @class MembersAdminListView
 * @namespace Vaultier
 */
Vaultier.MembersAdminListView = Ember.View.extend({
    layoutName: 'MembersAdmin/MembersAdminList',

    membersView: function () {
        var members = this.get('members');
        return Ember.CollectionView.extend({

            content: members,

            createChildView: function (itemViewClass, attrs) {
                if (attrs) {
                    attrs.members = members;
                }
                return this._super.apply(this, arguments);
            },

            emptyView: Ember.View.extend({
                template: Ember.Handlebars.compile("The collection is empty")
            }),

            itemViewClass: Vaultier.MembersAdminListItemView

        });
    }.property()

});



Vaultier.MembersAdminRoute = Ember.Route.extend(
    Vaultier.MembersAdminListActionsMixin,
    {
        model: function (params, transition) {
            var store = this.get('store');

            var workspace = this.modelFor('Workspace');

            if (!this.get('auth').checkPermissions(transition, function () {
                return workspace.get('perms.update')
            }.bind(this), true)) {
                return;
            }

            var members = store
                .find('Member', { workspace: workspace.get('id')})

            var queries = {
                workspace: workspace,
                members: members
            };
            return  Ember.RSVP.hash(queries);
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model.members);
            ctrl.set('workspace', model.workspace)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router'), environment: this.get('environment')})
                    .addHome()
                    .addWorkspace()
                    .addText('Members of workspace')
            );
        }

    }
);


Vaultier.MembersAdminController = Ember.Controller.extend({

    invitedMembers: function () {
        return Ember.ArrayProxy.createWithMixins(
            Ember.SortableMixin,
            {
                sortProperties: ['nickname'],
                content: this.get('content').filter(function (item, index, enumerable) {
                    return item.get('status') == Vaultier.Member.proto().statuses.INVITED.value;
                })
            })
    }.property('content.@each', 'content.@each.status'),

    membersWithoutKeys: function () {
        return Ember.ArrayProxy.createWithMixins(
            Ember.SortableMixin,
            {
                sortProperties: ['nickname'],
                content: this.get('content').filter(function (item, index, enumerable) {
                    return item.get('status') == Vaultier.Member.proto().statuses.MEMBER_WITHOUT_WORKSPACE_KEY.value;
                })
            })
    }.property('content.@each', 'content.@each.status'),

    concreteMembers: function () {
        return Ember.ArrayProxy.createWithMixins(
            Ember.SortableMixin,
            {
                sortProperties: ['nickname'],
                content: this.get('content').filter(function (item, index, enumerable) {
                    return item.get('status') == Vaultier.Member.proto().statuses.MEMBER.value;
                })
            })
    }.property('content.@each', 'content.@each.status')



});


Vaultier.MembersAdminView = Em.View.extend({
    layoutName: 'Layout/LayoutStandard',
    templateName: 'MembersAdmin/MembersAdmin'
});





//# sourceMappingURL=membership.js.map