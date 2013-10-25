Vaultier.MemberInviteRoute = Ember.Route.extend({

    workspace: null,

    actions: {
        save: function () {
        }
    },

    setupController: function (ctrl, model) {
        ctrl.set('content', {});
        ctrl.set('roles', Vaultier.Role.proto().roles);
    },

    model: function (params, queryParams) {

    },

    deactivate: function () {
    }

});

Vaultier.MemberInviteController = Ember.ObjectController.extend({
    breadcrumbs: null,
    roles: null
});

Vaultier.MemberInviteView = Ember.View.extend({
    templateName: 'Member/MemberInvite',
    layoutName: 'Layout/LayoutStandard',

    didInsertElement: function () {
        var el = Ember.$(this.get('element'));

        var ajaxQueryContext = {};

        var ajaxQuery = function () {
            var members = this.store.find('Member')
                .then(function (members) {
                    var results = [];
                    members.forEach(function (member) {
                        results.push({
                            text: member.get('email'),
                            id: member.get('id'),
                            nickname: member.get('nickname'),
                            email: member.get('email')
                        });
                    });
                    this.query.callback({results: results});
                }.bind(this))
        };


        el.find('#card-name').select2({
            tokenSeparators: [",", " "],
            createSearchChoice: function (term, data) {
                var add = true;
                data.forEach(function (member) {
                    if ('i:' + term == member.id || term == member.email) {
                        add = false;
                        return false;
                    }
                });
                if (add) {
                    return {
                        text: term,
                        nickname: term,
                        email: term,
                        id: 'i:' + term
                    }
                }
            },
            multiple: true,
            query: function (query) {
                ajaxQueryContext.store = this.get('controller.store')
                ajaxQueryContext.query = query;
                Ember.run.debounce(ajaxQueryContext, ajaxQuery, 1000 );
            }.bind(this),
            formatResult: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            },
            formatSelection: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            }

        });

    }

});