PersonApp = Ember.Application.create();
PersonApp.SearchField = Ember.TextField.extend({
    keyUp: function (e) {
        var search = this.get('value');
        model = PersonApp.Page.create({term: search});
        this.get('controller.target').transitionTo('person.search', model);
    }
});

PersonApp.PersonView = Ember.View.extend({
    templateName: 'person',
    addPerson: function (event) {
        var username = event.get('username');
        if (username) {
            this.get('controller').addPerson(username);
            event.set('username', '');
        }
    }
});

PersonApp.PersonController = Ember.ArrayController.extend(Ember.FilterSortSliceMixin, {
    content: [],
    sortBy: 'id',
    itemsPerPage: 2,
    paginationRoute: 'pagination',
    sortableRoute: 'sort',
    addPerson: function (username) {
        PersonApp.Person.createRecord({ username: username });
        this.commit();
    },
    updatePerson: function (event) {
        this.commit();
    },
    deletePerson: function (event) {
        event.deleteRecord();
        this.commit();
    },
    commit: function () {
        this.get('store').commit();
    }
});

PersonApp.Person = DS.Model.extend({
    username: DS.attr('string')
}).reopenClass({
        find: function () {
            var one = PersonApp.Person.createRecord({id: 1, username: 'dave one'});
            var two = PersonApp.Person.createRecord({id: 2, username: 'dave two'});
            var three = PersonApp.Person.createRecord({id: 3, username: 'dave three'});
            var four = PersonApp.Person.createRecord({id: 4, username: 'dave four'});
            return [one, two, three, four];
        }
    });

PersonApp.Store = DS.Store.extend({
    revision: 11,
    adapter: DS.Adapter.create({
        createRecord: function (store, type, object) {
            console.log(object.toJSON({ associations: true }));
        }
    })
});

PersonApp.Page = Ember.Object.extend({
    term: '',
    column: ''
});

PersonApp.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',
    spanClasses: 'paginator pageNumber',

    page: function () {
        return PersonApp.Page.create({id: this.get('content.page_id')});
    }.property(),

    isActive: function () {
        var currentPage = this.get('parentView.controller.currentPage');
        var page_id = this.get('content.page_id');

        if (currentPage) {
            return currentPage.toString() === page_id.toString();
        } else {
            return false;
        }
    }.property('parentView.controller.currentPage')
});

PersonApp.Router.map(function (match) {
    this.resource("person", { path: "/" }, function () {
        this.route("page", { path: "/page/:page_id" });
        this.route("search", { path: "/search/:page_term" });
        this.route("sort", { path: "/sort/:page_column" });
    });
});

PersonApp.PersonSortRoute = Ember.Route.extend({
    setupController: function (controller, model) {

        this.controllerFor('person').set('sortBy', model);
    },
    model: function (params) {
        return PersonApp.Page.create({column: params.page_column});
    }
});

PersonApp.PersonSearchRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        this.controllerFor('person').set('filterBy', model.get('term'));
    },
    model: function (params) {
        return PersonApp.Page.create({term: params.page_term});
    },
    serialize: function (model) {
        return { page_term: model.term };
    }
});

PersonApp.PersonPageRoute = Ember.Route.extend({
    model: function (params) {
        return PersonApp.Person.find(params.page_id);
    },
    setupController: function (controller, model) {
        this.controllerFor('person').set('selectedPage', model.get('id'));
    }
});

PersonApp.PersonRoute = Ember.Route.extend({
    model: function (params) {
        return PersonApp.Person.find();
    }
});
