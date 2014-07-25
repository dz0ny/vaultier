'use strict';

Vaultier.RolesService = Em.Object.extend({

    /**
     * @DI store:main
     */
    store: null,

    getMemberRolesOnWorkspace: function (workspace, member) {
        return this.get('store').find('Roles', {to_workspace: worspace, member: member})
            .then(function (response) {
                return Em.ArrayProxy.create({content: response});
            });
    }
});