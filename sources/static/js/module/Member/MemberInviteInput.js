Vaultier.MemberInviteInput = Ember.Component.extend({
    classNames: ['vaultier-member-invite-input'],

    value: null,

    store: null,

    tagName: "input",

    didInsertElement: function () {

        if (!this.store) {
            throw 'MemberInviteInput requires store to autocomplete. Inject store to component as store=store'
        }

        var el = Ember.$(this.get('element'));

        var ajaxQueryContext = {};

        var ajaxQuery = function () {
            var members = this.store.find('Member', {search: this.query.term})
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
                Ember.run.debounce(ajaxQueryContext, ajaxQuery, 500);

            }.bind(this),
            formatResult: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            },
            formatSelection: function (member) {
                return Utils.HandlebarsHelpers.current().printUser(member, {hash: {}})
            }

        });

        el.on('change', function (e) {
            this.set('value', e.val)
        }.bind(this));

    }

});
