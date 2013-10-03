
    var App;

    App = Ember.Application.create();

    App.LOG_TRANSITIONS = true;

    App.Store = DS.Store.extend({
        revision: 11,
        adapter: 'DS.FixtureAdapter'
    });

    App.Post = DS.Model.extend({
        title: DS.attr('string'),
        body: DS.attr('string')
    });

    App.Post.FIXTURES = [];

    App.Router.map(function (match) {
        return this.resource('posts', function () {
            this.route('new');
            return this.resource('post', {
                path: '/:post_id'
            }, function () {
                return this.route('edit');
            });
        });
    });

    App.IndexRoute = Ember.Route.extend({
        redirect: function () {
            return this.transitionTo('posts');
        }
    });

    App.PostsIndexRoute = Ember.Route.extend({
        model: function () {
            return App.Post.find();
        }
    });

    App.PostsFormable = Ember.Mixin.create({
        renderTemplate: function () {
            return this.render('posts/form', function () {
                return {
                    outlet: 'modal'
                };
            });
        },
        events: {
            cancel: function (post) {
                post.transaction.rollback();
                return this.transitionTo('posts');
            },
            submit: function (post) {
                post.get('store').commit();
                if (post.didCreate) {
                    return this.transitionTo('posts');
                }
            }
        }
    });

    App.PostsNewRoute = Ember.Route.extend(App.PostsFormable, {
        model: function () {
            return App.Post.createRecord();
        }
    });

    App.PostEditRoute = Ember.Route.extend(App.PostsFormable, {
        model: function () {
            return this.modelFor('post');
        }
    });

    App.PostsFormView = Em.View.extend({
        tagName: 'form',
        classNames: 'modal fade in form-custom-field-modal'.w(),
        didInsertElement: function () {
            return this.$().modal('show');
        },
        willDestroyElement: function () {
            return this.$().modal('hide');
        }
    });