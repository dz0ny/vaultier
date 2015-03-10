import Ember from 'ember';

export default Ember.Controller.extend({
  latestUser: null,
  rememberOptions: [
    {ttl: 0, text: 'Do not remember'},
    {ttl: 24 * 3600 * 1000, text: 'Remember for one day'},
    {ttl: 7 * 24 * 3600 * 1000, text: 'Remember for one week'},
    {ttl: 31 * 24 * 3600 * 1000, text: 'Remember for one month'},
    {ttl: 365 * 24 * 3600 * 1000, text: 'Remember for one year'}
  ]
});

