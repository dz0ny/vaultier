Vaultier.InvitationUseRoute = Ember.Route.extend(
    {

        /**
         * @DI service:invitations
         */
        invitations: null,

        model: function (params, transition) {
            transition.abort();
            return this.get('invitations').useInvitation(params.invitation, params.hash, params.data)
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
                    invitations.clearInvitationsInSession()

                    if (
                        (error && error.status == 400 && error.errors && error.errors.hash) // already accepted
                            || (error && error.status == 404) // not found
                        ) {
                        this.get('errors').consoleError(error)
                        this.get('errors').renderError({
                            title: 'Invalid invitation.',
                            message: 'this invitation cannot be used. Not found or it was already used by other member'
                        })
                    } else {
                        throw new Error('Invalid invitation');
                    }

                }.bind(this))

            return promise;
        },

        setupController: function (ctrl, model) {
            ctrl.set('content', model)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('List of invitations to accept')
            );
        },

        actions: {
            acceptInvitations: function () {
                var invitations = this.get('controller.content')
                var service = this.get('invitations')
                var promise = service.acceptInvitationsInSession(invitations).
                    then(function () {
                        service.clearInvitationsInSession()
                        $.notify('You have accepted your invitations', 'success');
                        this.transitionTo('index')
                    }.bind(this))

                ApplicationLoader.promise(promise)
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
            ctrl.set('content', model)
            ctrl.set('breadcrumbs',
                Vaultier.Breadcrumbs.create({router: this.get('router')})
                    .addHome()
                    .addText('Accept invitation')
            );
        },
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


Vaultier.MemberInviteInput = Ember.Component.extend({
    classNames: ['vaultier-member-invite-input'],

    value: null,

    store: null,

    auth: null,

    workspace: null,

    tagName: "input",

    didInsertElement: function () {

        if (!this.store) {
            throw 'MemberInviteInput requires store to autocomplete. Inject store to component as store=store'
        }
        if (!this.workspace) {
            throw 'MemberInviteInput requires workspace to autocomplete. Inject workspace to component as workspace=workspace'
        }
        if (!this.auth) {
            throw 'MemberInviteInput requires auth service to autocomplete. Inject auth to component as auth=auth'
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
                var str = Utils.HandlebarsHelpers.current().printUser(member, {hash: {disableTooltip: true}})
                if (member.invitation) {
                    str = 'Invite <b>' + str + '</b>'
                } else {
                    str = 'grant to <b>' + str + '</b>'
                }
                return str
            },

            formatSelection: function (member) {
                var str = Utils.HandlebarsHelpers.current().printUser(member, {hash: {disableTooltip: true}})
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

Vaultier.MemberSelectRoleView = Ember.Select.extend({

    willDestroyElement: function () {
        var el = $(this.get('element'));
        var selectize = el[0].selectize;
        selectize.destroy();
    },

    didInsertElement: function () {
        var el = $(this.get('element'));
        el.selectize({
            create: false,
            highlight: false,
            render: {
                option: function (item, escape) {
                    var item = Vaultier.Role.proto().roles.getByValue(item.value);
                    return [
                        '<div>',
                        '<div>' + item.text + '</div>',
                        '<div class="help-block">' + item.desc + '</div>',
                        '</div>'
                    ].join('')
                }.bind(this)
            }

        })
        var selectize = el[0].selectize;
        selectize.setValue(this.get('role.level'));

        selectize.on('dropdown_close', function () {
            if (!selectize.getValue()) {
                selectize.setValue(this.get('role.level'))
            }
        }.bind(this));

        selectize.on('change', function (value) {
            if (value) {
                this.set('role.level', value);
                this.send('changed', value);
            }
        }.bind(this));


    }
});


Vaultier.MemberIndexRoute = Ember.Route.extend(
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
                    url: this.get('router').generate('Vault.memberIndex', models.vault),
                    object: models.vault,
                    roles: models.vaultRoles
                }));
            }

            if (models.workspace) {
                blocks.push(Ember.Object.create({
                    type: 'workspace',
                    url: this.get('router').generate('Workspace.memberIndex', models.workspace),
                    object: models.workspace,
                    roles: models.workspaceRoles
                }));
            }


            ctrl.set('content', blocks)

            // setup roles
            ctrl.set('roleLevels', this.setupRoleLevels());

            // set invite route
            ctrl.setProperties(this.setupInviteRoute(models));

            // set breadcrumbs
            ctrl.set('breadcrumbs', this.setupBreadcrumbs(models))
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('MemberIndex', {controller: this.get('controller')})
        },


        actions: {
            deleteRole: function (role, block) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = role
                        .deleteRecord()
                        .then(function () {
                            block.roles.removeObject(role);
                            $.notify('User \'s permission has been removed.', 'success');
                        })
                        .catch(function (error) {
                            $.notify('Oooups! Something went wrong.', 'error');
                            this.get('errors').logError(error)
                        }.bind(this))

                    ApplicationLoader.promise(promise)
                });


            },

            changeRole: function (role, block) {
                var promise = role
                    .saveRecord()
                    .then(function () {
                        $.notify('User \'s permission has been updated.', 'success');
                    })
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error)
                    }.bind(this))

                ApplicationLoader.promise(promise)
            }
        }



    });

Vaultier.MemberIndexController = Ember.Controller.extend({
    blocks: function () {
        var secondMarked = false;
        var shownIndex = 0;
        return this.get('content').map(function (item, index) {
            var isHidden = item.roles.get('length') === 0 && index > 0;
            if (!isHidden) {
                shownIndex++;
            }
            var isSecond = !isHidden && shownIndex === 2;

            item.setProperties({
                index: index,
                isSecond: isSecond,
                isHidden: isHidden,
                readOnly: index > 0
            });

            return item;
        });
    }.property('content.@each')
});


Vaultier.MemberIndexView = Ember.View.extend({
    templateName: 'Member/MemberIndex',
    layoutName: 'Layout/LayoutStandard',


    Item: Ember.View.extend({
        tagName: 'div',
        Select: Vaultier.MemberSelectRoleView.extend({
            actions: {
                changed: function () {
                    this.get('controller').send('changeRole', this.get('role'), this.get('block'));
                }
            }
        })


    })

});



Vaultier.MemberInviteRoute = Ember.Route.extend(
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
                        $.notify('Your invitations has been saved', 'success');
                        window.history.go(-1);
                    })
                    .catch(function () {
                        $.notify('Oooups! Something went wrong.', 'error');
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
        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('MemberInvite', {controller: this.get('controller')})
        }

    });

Vaultier.MemberInviteController = Ember.Controller.extend({
    workspace: null,
    role: null,
    invited: [],
    resend: true,

    isSubmitDisabled: function () {
        return !this.get('invited.length') || !this.get('role.level')
    }.property('invited.length', 'role.level'),

    breadcrumbs: null
});

Vaultier.MemberInviteView = Ember.View.extend({
    templateName: 'Member/MemberInvite',
    layoutName: 'Layout/LayoutStandard',

    Select: Vaultier.MemberSelectRoleView
});

Vaultier.MemberBoxComponent = Ember.Component.extend({
    layoutName: 'Member/MemberBox',

    init: function () {
        this._super.apply(this, arguments);
        this.checkParameters();
    },

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
        var roles = this.get('roles').filter(function (role) {
            if (role.get('member.user') != this.get('user.id')) {
                return role;
            }
        }.bind(this))

        // sort by permission level
        roles = roles.sort(function (a, b) {
            return b.get('level') - a.get('level');
        });

        // unique array
        var foundRoles = []
        roles = roles.filter(function (role) {
            var id = role.get('member.id');
            if (foundRoles.indexOf(id) == -1) {
                foundRoles.push(id);
                return role;
            }
        })

        return roles;
    }.property('roles'),

    hasAny: function () {
        if (this.get('processedRoles').length > 0) {
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

Vaultier.MemberManagementRoute = Vaultier.MemberIndexRoute.extend({
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
        this.render('MemberManagement', {controller: this.get('controller')});
    },
    actions: {
        deleteRole: function (context, role) {

            Vaultier.confirmModal(this, 'Are you sure you want to delete this permission?', function () {

                var promise = role
                    .deleteRecord()
                    .then(function () {
                        var roles = context.get('roles');
                        roles.removeObject(role);
                        $.notify('Role has been remove', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
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
                        $.notify('Member has been remove', 'success');
                    }.bind(this))
                    .catch(function (error) {
                        $.notify('Oooups! Something went wrong.', 'error');
                        this.get('errors').logError(error);
                    }.bind(this));

                ApplicationLoader.promise(promise);
            });
        }
    }
});

Vaultier.MemberManagementController = Vaultier.MemberIndexController.extend({
    members: function () {

        var user = this.get('auth.user');
        return this.get('content.members').filter(function (item, index) {
                return item.get('email') !== user.get('email');
            }
        ).toArray();
    }.property('content.@each')
});


Vaultier.MemberManagementView = Vaultier.MemberIndexView.extend({
    templateName: 'Member/MemberManagement'
});


Vaultier.MemberManagerAccordionComponent = Em.Component.extend({
    store: null,
    layoutName: 'Member/MemberManagerAccordion',
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

//# sourceMappingURL=membership.js.map