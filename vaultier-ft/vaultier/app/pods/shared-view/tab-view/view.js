import Ember from 'ember';
import { endWith } from 'vaultier/app/utils/tools/string';
import {inject, factory} from 'vaultier/app/utils/tools/di';

/**
 * @private
 * @type {string}
 */


/**
 *
 * @class TabView
 * @extends Ember.View
 * @module cs-phone-views-navigation
 *
 * TabView to be used with twitter bootstrap, activate selected tab based on route
 *
 * usage:
 *
 * ```
 *   <ul class="nav nav-pills nav-stacked">
 *      {{#view view.TabView urlToken="personal" }}
 *          {{#link-to 'Settings.personal'}}
 *            My Profile
 *      {{/link-to}}
 *      {{/view}}
 *
 *      {{#view view.TabView pathToken="keys" }}
 *          {{#link-to 'Settings.keys'}}
 *            Key
 *          {{/link-to}}
 *      {{/view}}
 *  </ul>
 *```
 *
 *
 */

export default Ember.View.extend({
  classNameBindings: 'isActive:active'.w(),
  tagName: 'li',

  router: inject('router:main'),

  appController: inject('controller:application'),

  isActive: function () {
    var url = this.get('router.url');
    var path = this.get('appController.currentPath');
    var pathToken = this.get('pathToken');
    var urlToken = this.get('urlToken');
    return endWith(path, pathToken) || endWith(url, urlToken);
  }.property('router.url', 'appController.currentPath')
});
