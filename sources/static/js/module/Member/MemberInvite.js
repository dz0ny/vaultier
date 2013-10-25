Vaultier.MemberInviteRoute = Ember.Route.extend({

    workspace: null,

    model: function (params, queryParams) {
        this.workspace = this.modelFor('Vault');
    },

    actions: {
        save: function (invited, role) {
            var invitations = Service.Invitations.current();
            var promise = Ember.RSVP.resolve();
            var workspace = this.workspace;

            invited.forEach(function(email) {
                promise.then(invitations.invite(workspace, email, role, true, false));
           });

            promise.then(function() {
                console.log('success');
            })

            return promise;
            //invitations.invite()
//
//            console.log(this.workspace);
//            console.log(invited);
//            console.log(role);

        }
    },

    setupController: function (ctrl, model) {



        ctrl.set('content', {});
        ctrl.set('roles', Vaultier.Role.proto().roles);
    },


    deactivate: function () {
    }

});

Vaultier.MemberInviteController = Ember.ObjectController.extend({
    invited: [],
    role: null,
    isButtonNextEnabled: function() {
        return this.invited.length < 1;
    }.property('invited'),
    breadcrumbs: null,
});

Vaultier.MemberInviteView = Ember.View.extend({
    templateName: 'Member/MemberInvite',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var el = Ember.$(this.get('element')).find('#card-name');

        var ajaxQueryContext = {};

        var ajaxQuery = function () {
            var members = this.store.find('Member')
                .then(function (members) {
                    var results = [];
                    members.forEach(function (member) {
                        results.push({
                            text: member.get('email'),
                            id: member.get('email'),
                            nickname: member.get('nickname'),
                            email: member.get('email')
                        });
                    });
                    this.query.callback({results: results});
                }.bind(this))
        };


        el.select2({
            tokenSeparators: [",", " "],
            createSearchChoice: function (term, data) {
                var add = true;
                data.forEach(function (member) {
                    if (term == member.id) {
                        add = false;
                        return false;
                    }
                });
                //@todo: validate email, else show invalid email notification

                if (add) {
                    return {
                        text: term,
                        nickname: term,
                        email: term,
                        id: term
                    }
                }
            },
            multiple: true,
            query: function (query) {
                ajaxQueryContext.store = this.get('controller.store')
                ajaxQueryContext.query = query;

                //Ember.run.debounce(ajaxQueryContext, ajaxQuery, 1000 );
                ajaxQuery.call(ajaxQueryContext);

            }.bind(this),
            formatResult: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            },
            formatSelection: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            }

        });

        el.on('change', function(e) {
            this.get('controller').set('invited', e.val);
        }.bind(this));

    }

});