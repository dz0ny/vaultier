App = Ember.Application.create({});

var view = Ember.View.extend({
    templateName: 'page1',
    layoutName: 'wrapper'
});

App.Page1View = view;
App.Page1Controller = null;

App.Router.map(function() {
  this.resource('about');
  this.resource('posts');
  this.resource('page1');
});

var showdown = new Showdown.converter();

$(document).ready(function() {

console.log(Ember.TEMPLATES);

});