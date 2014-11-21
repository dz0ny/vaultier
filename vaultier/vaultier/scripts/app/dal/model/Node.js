/**
 * @module vaultier-dal-model
 * @class Vaultier.dal.model.Node
 * @extends RL.Model
 */
Vaultier.dal.model.Node = RL.Model.extend(
    Vaultier.dal.mixin.CreatedUpdatedMixin,
    Vaultier.dal.mixin.EncryptedModel.Mixin,
    Vaultier.dal.mixin.PolymorphicModel.Mixin,
    {
        mutableModelTypeField: 'type',
        mutableModelMapping: {
            100: 'Vaultier.dal.model.NodeFolderMixin',
            200: 'Vaultier.dal.model.NodeNoteMixin',
            300: 'Vaultier.dal.model.NodePasswordMixin',
            400: 'Vaultier.dal.model.NodeFileMixin'
        },

        types: new Utils.ConstantList({
            'FOLDER': {
                value: 100,
                text: 'folder'
            },
            'NOTE': {
                value: 200,
                text: 'note'
            },
            'PASSWORD': {
                value: 300,
                text: 'password'
            },
            'FILE': {
                value: 400,
                text: 'file'
            }
        }),

        node_type: RL.attr('number'),
        node_subtype: RL.attr('number'),
        data: RL.attr('string'),

        meta: RL.attr('string'),


        "name": RL.attr('string'),
        "color": RL.attr('string'),
        "enc_version": RL.attr('number'),
        "created_by": RL.attr('number'),
        "parent": RL.attr('number')

    });

Vaultier.dal.model.NodeFolderMixin = Ember.Mixin.create({

});

Vaultier.dal.model.NodeNoteMixin = Ember.Mixin.create({

});

Vaultier.dal.model.NodePasswordMixin = Ember.Mixin.create({

});

Vaultier.dal.model.NodeFileMixin = Ember.Mixin.create({

});

