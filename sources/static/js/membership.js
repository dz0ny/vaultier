Ember.TEMPLATES["Invitation/InvitationAnonymous"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>You have been invited to vaultier</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-8 col-md-offset-2 top-30 bottom-30\">\r\n                    <b>\r\n                        Before further procceeding we need you to have account. Please login or create new\r\n                        account.\r\n                    </b>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["Invitation/InvitationAccept"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers.each.call(depth0, "role", "in", "invitation.roles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                                <tr>\n                                    <td>");
  stack1 = helpers._triageMustache.call(depth0, "role.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" by user ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.created_by", options) : helperMissing.call(depth0, "printUser", "role.created_by", options))));
  data.buffer.push(" </td>\n                                </tr>\n\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>You have pending invitations</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2 top-15 bottom-30\">\n                    <div class=\"bottom-15\">\n                        You have been invited to Vaultier.\n                        <b>Please see invitations to accept:</b>\n                    </div>\n                    <table class=\"table vlt-table table-bordered\">\n                        ");
  stack1 = helpers.each.call(depth0, "invitation", "in", "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </table>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"#\" class=\"btn btn-default btn-sm\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rejectInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                    Reject invitations\n                </a>\n                <a href=\"#\" class=\"btn btn-primary btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "acceptInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Accept invitations\n                </a>\n            </div>\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});

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
        var shownIndex = 0
        return this.get('content').map(function (item, index) {
            var isHidden = item.roles.get('length') == 0 && index > 0;
            if (!isHidden) {
                shownIndex++;
            }
            var isSecond = !isHidden && shownIndex > 1

            item.setProperties({
                index: index,
                isSecond: isSecond,
                isHidden: isHidden,
                readOnly: index > 0
            })

            return item
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

Ember.TEMPLATES["Invitation/InvitationAccept"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers.each.call(depth0, "role", "in", "invitation.roles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n                                <tr>\n                                    <td>");
  stack1 = helpers._triageMustache.call(depth0, "role.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" by user ");
  data.buffer.push(escapeExpression((helper = helpers.printUser || (depth0 && depth0.printUser),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "role.created_by", options) : helperMissing.call(depth0, "printUser", "role.created_by", options))));
  data.buffer.push(" </td>\n                                </tr>\n\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\n    <form>\n        <div class=\"vlt-dialog-content\">\n            <div class=\"vlt-dialog-header\">\n                <h2>You have pending invitations</h2>\n            </div>\n            <div class=\"vlt-dialog-body\">\n\n                <div class=\"col-md-8 col-md-offset-2 top-15 bottom-30\">\n                    <div class=\"bottom-15\">\n                        You have been invited to Vaultier.\n                        <b>Please see invitations to accept:</b>\n                    </div>\n                    <table class=\"table vlt-table table-bordered\">\n                        ");
  stack1 = helpers.each.call(depth0, "invitation", "in", "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </table>\n                </div>\n\n                <div class=\"clearfix\"></div>\n\n            </div>\n            <div class=\"vlt-dialog-footer\">\n                <a href=\"#\" class=\"btn btn-default btn-sm\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "rejectInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                    Reject invitations\n                </a>\n                <a href=\"#\" class=\"btn btn-primary btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "acceptInvitations", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">\n                    <span class=\"glyphicon glyphicon-ok\"></span>\n                    Accept invitations\n                </a>\n            </div>\n        </div>\n    </form>\n</div>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["Invitation/InvitationAnonymous"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Create an account");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<div class=\"vlt-dialog col-md-8 col-md-offset-2 top-50\">\r\n    <form>\r\n        <div class=\"vlt-dialog-content\">\r\n            <div class=\"vlt-dialog-header\">\r\n                <h2>You have been invited to vaultier</h2>\r\n            </div>\r\n            <div class=\"vlt-dialog-body\">\r\n\r\n                <div class=\"col-md-8 col-md-offset-2 top-30 bottom-30\">\r\n                    <b>\r\n                        Before further procceeding we need you to have account. Please login or create new\r\n                        account.\r\n                    </b>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n\r\n            </div>\r\n            <div class=\"vlt-dialog-footer\">\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-default btn-sm")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthLogin", options) : helperMissing.call(depth0, "link-to", "AuthLogin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n");
  return buffer;
  
});

//# sourceMappingURL=membership.js.map