Vaultier.RolesAdminIndexRoute = Ember.Route.extend(
    {

        inviteObject: null,

        model: function (params, transition) {
            Utils.Logger.log.debug("Vaultier.RolesAdminIndexRoute model");

            // setup invite data
            this.setProperties(this.setupInviteData(params));

            var selectedNode = this.get('tree').getSelectedNode();

            var store = this.get('store')

            var queries = {};

            queries.node = selectedNode;
            queries.nodeRoles = store.find('Role', {
                node: selectedNode.get('id')
            });

            queries.parent = selectedNode;
            queries.parentRoles = store.find('Role', {
                parent_node: selectedNode.get('id')
            });

            var models = Ember.RSVP.hash(queries);

            return models;
        },

        setupRoleLevels: function () {
            return Vaultier.dal.model.Role.proto().roles.toArray();
        },

        setupController: function (ctrl, models) {
            Utils.Logger.log.debug("Vaultier.RolesAdminIndexRoute setupController");
            Utils.Logger.log.debug(models);

            var blocks = [];

            blocks.push(Ember.Object.create({
                type: 'node',
                object: models.node,
                roles: models.nodeRoles
            }));

            blocks.push(Ember.Object.create({
                type: 'parent',
                object: models.parent,
                roles: models.parentRoles
            }));

            ctrl.set('content', blocks)

            // setup roles
            ctrl.set('roleLevels', this.setupRoleLevels());
            ctrl.set('controller', this);
            ctrl.get('controllers.Document').set('toolbar', this.createToolbar());

        },

        renderTemplate: function () {
            // this is important if you want to inherite this route https://github.com/emberjs/ember.js/issues/1872 to use proper controller
            this.render('RolesAdminIndex', {controller: this.get('controller')})
        },


        actions: {
            deleteRole: function (role, block) {
                Vaultier.confirmModal(this, 'Are you sure?', function () {
                    var promise = role
                        .deleteRecord()
                        .then(function () {
                            block.roles.removeObject(role);
                            $.notify('User\'s permission has been removed.', 'success');
                        })
                        .catch(function (error) {
                            $.notify('Ooops! Something went wrong.', 'error');
                            this.get('errors').logError(error)
                        }.bind(this))

                    ApplicationKernel.UI.showLoaderUponPromise(promise)
                });


            },

            changeRole: function (role, block) {
                var promise = role
                    .saveRecord()
                    .then(function () {
                        $.notify('User\'s permission has been updated.', 'success');
                    })
                    .catch(function (error) {
                        $.notify('Ooops! Something went wrong.', 'error');
                        this.get('errors').logError(error)
                    }.bind(this))

                ApplicationKernel.UI.showLoaderUponPromise(promise)
            }
        }



    });

Vaultier.RolesAdminIndexController = Ember.Controller.extend({
    currentObject: null,
    blocks: function () {
        var shownIndex = 0;
        return this.get('content').map(function (item, index) {
            var isHidden = item.roles.get('length') === 0 && index > 0;
            if (!isHidden) {
                shownIndex++;
            }
            if (index < 1) {
                this.set('currentObject', item.get('object'));
            }
            var isSecond = !isHidden && shownIndex === 2;

            item.setProperties({
                index: index,
                isSecond: isSecond,
                isHidden: isHidden,
                readOnly: index > 0
            });
            var roles = Utils.RolesProxy.create({
                content: item.roles
            });
            roles.filterCreateRolesByObjectScope(this.get('currentObject'));
            item.set('roles', roles.toArray());
            return item;
        }.bind(this));
    }.property('content.@each')
});


Vaultier.RolesAdminIndexView = Ember.View.extend({
    templateName: 'RolesAdmin/RolesAdminIndex',

    didInsertElement: function () {
        Utils.Logger.log.debug(this.get('parentView'));
        this.get('parentView').set('showLeftTreeNodePanel', false);
    },

    AnimatedItemWrapper: Ember.View.extend({
        Item: Ember.View.extend({
            tagName: 'div',
            Select: Ember.Selectize.extend({
                didInsertElement: function () {
                    this.renderOptions = {
                        option: function (item, escape) {
                            var item = Vaultier.dal.model.Role.proto().roles.getByValue(item.value);
                            return [
                                '<div>',
                                    '<div>' + item.text + '</div>',
                                    '<div class="help-block">' + item.desc + '</div>',
                                '</div>'
                            ].join('')
                        }
                    };
                    this._super();
                },
                changeData: function (obj) {
                    var roleType = Vaultier.dal.model.Role.proto().roles.getByValue(obj.value);
                    set(this, 'selection', roleType);
                    set(this, 'data.level', obj.value);
                    get(this, 'controller').send('changeRole', get(this, 'data'));
                }
            })
        }),
        animateOut: function (done) {
            EmberExt.AnimatedIf.Transitions.create().runFx(this.$(), 'slideUp').then(done);
        }
    })

});

