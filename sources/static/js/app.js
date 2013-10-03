 (function () {
        'use strict'

// Create the application
        window.App = Ember.Application.create({
            LOG_TRANSITIONS : true,
            HomeController: Ember.Controller.extend(),
            HomeView: Ember.View.extend({
                templateName: 'home'
            }),
            AboutController: Ember.Controller.extend(),
            AboutView: Ember.View.extend({
                templateName: 'about'
            }),
            ApplicationView: Ember.View.extend({
                templateName: 'application'
            }),
            ApplicationController: Ember.Controller.extend({
            }),
            Router: Ember.Router.extend({
                root: Ember.Route.extend({
                    toggle: function (router, event) {
                        console.log();
                        router.transitionTo(router.currentState.next);
                    },
                    home: Ember.Route.extend({
                        route: '/',
                        connectOutlets: function (router, event) {
                            router.get('applicationController').connectOutlet('home');
                        },
                        next: 'about'
                    }),
                    about: Ember.Route.extend({
                        next: 'home',
                        route: '/about',
                        connectOutlets: function (router, event) {
                            router.get('sidebarController').connectOutlet('sidebar');
                            router.get('contentController').connectOutlet('content');
                            router.get('footerController').connectOutlet('footer');
                        }
                    })
                })
            })
        });

    })();