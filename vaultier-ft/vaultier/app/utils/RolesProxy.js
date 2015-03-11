'use strict';

ApplicationKernel.namespace('Utils');

/**
 * Util class to sort a collection of roles
 * by default will use the 'level' and 'member.email' keys
 *
 * @class RolesProxy
 * @namespace Utils
 * @uses Ember.SortableMixin
 * @since Vaultier 0.7.0
 */
Utils.RolesProxy = Em.ArrayProxy.extend(
    Em.SortableMixin,
    {
        init: function () {
            this._super.apply(this, arguments);
            this.set('sealedUsers', []);// must be reset manually each time tha the class is instantiated
        },
        content: [],

        /**
         * User to be seal(reverse of filter) from content array
         * @type {Array}
         */
        sealedUsers: [],

        /**
         * Current object {Node}
         * {Em.Object}
         */
        objectScope: null,

        /**
         * Default sort keys to be used when sorting,
         * order of elements indicates priority
         *
         * @type {Array}
         */
        sortProperties: ['isCurrentUser', 'level', 'member.email'],

        /**
         * @type {Array}
         */
        arrangedContent: function () {
            return Ember.ArrayProxy.createWithMixins(
                Ember.SortableMixin,
                {
                    sortProperties: this.get('sortProperties'),
                    sortFunction: this.sortFunction,
                    content: this.get('content').filter(this.filterFunction.bind(this))
                });
        }.property('content', 'objectScope', 'sealedUsers.[]', 'sortProperties.[]'),

        /**
         * @type {Number}
         */
        createLevelValue: function () {
            return Vaultier.dal.model.Role.proto().roles['CREATE'].value;
        }.property(),

        /**
         * Compare logic to used against strings or numbers
         * (member.email or level respectively)
         * @param a {string|number}
         * @param b {string|number}
         * @returns {number}
         */
        sortFunction: function (a, b) {
            if (a == b) {
                return 0;
            }
            if (typeof a === 'string' && typeof b === 'string') {
                return a < b ? -1 : 1;
            }
            return b - a;
        },

        /**
         * Filters items of the content array using the
         * functions in the filters array
         *
         * @param item
         * @param idx
         * @param enumerable
         * @returns {boolean}
         */
        filterFunction: function (item, idx, enumerable) {
            var objectScope = this.get('objectScope');
            var sealUsers = this.get('sealedUsers');
            if (objectScope && !this.isRoleRelatedToObject(item, objectScope)) {
                return false;
            } else if (sealUsers.length && this.isRoleSealed(item)) {
                return false;
            }
            return true;
        },

        /**
         * Set the scopeObject, this will update the arrangedContent property
         *
         * @param {mixed} currentObject
         */
        filterCreateRolesByObjectScope: function (objectScope) {
            this.set('objectScope', objectScope);
            return this;
        },

        /**
         * Add a user to the sealedUsers array if the user is not yet there.
         *
         * @param user {Vaultier.dal.model.User}
         * @returns {RolesProxy}
         */
        sealUser: function (user) {
            if (this.get('sealedUsers').indexOf(user.get('id')) < 0) {
                this.get('sealedUsers').push(user.get('id'));
            }

            return this;
        },

        /**
         * Returns true if the user of role is not on the sealedUsers array
         * @param role {Vaultier.dal.model.Role}
         * @returns {boolean}
         */
        isRoleSealed: function (role) {
            return this.get('sealedUsers').indexOf(role.get('member.user')) > -1;
        },

        /**
         * Returns true if the role belong to the actual object scope
         * @param role
         * @param objectScope
         * @returns {boolean}
         */
        isRoleRelatedToObject: function (role, objectScope) {
            var create = this.get('createLevelValue');
            if (role.get('level') !== create) {
                return true;
            }
            return role.isRelatedToObject(objectScope);
        },

        /**
         *
         * @param array
         * @param idx
         * @param removedCount
         * @param addedCount
         */
        contentArrayDidChange: function (array, idx, removedCount, addedCount) {
            if (addedCount) {
                var items = array.slice(idx, idx + addedCount);
                items.forEach(function (item) {
                    if (this.filterFunction(item)) {
                        this.get('arrangedContent').pushObject(item);
                    }
                }.bind(this));
            }
        }

    });
