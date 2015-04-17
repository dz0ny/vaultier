import Ember from 'ember';
import BaseModel from 'ember-dabl/services/dabl/model/model';
import FieldFactory from 'ember-dabl/services/dabl/field/field-factory';
import CreatedUpdatedMixin from 'ember-dabl/services/dabl/addons/created-updated-mixin/created-updated-mixin';

var UserModel = BaseModel.extend(
    CreatedUpdatedMixin,
    {

        id: FieldFactory.defineField('integer', {primaryKey: true}),

        nickname: FieldFactory.defineField('string'),

        email: FieldFactory.defineField('email'),

        public_key: FieldFactory.defineField('string')

    });

export default UserModel;
