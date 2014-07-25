Vaultier.EncryptedModel = Vaultier.EncryptedModel || {};

var getEncryptedDataKey = function (encryptedField) {
    return '_decrypted-data-' + encryptedField;
}

Vaultier.EncryptedModel.Mixin = Ember.Mixin.create({

    EncryptedModelMixedIn: true,

    /**
     * @DI service:workspacekey
     */
    workspacekey: null,

    /**
     * Overriden constructor
     * Retrieves dependencies from container
     */
    init: function () {
        this.workspacekey = Vaultier.__container__.lookup('service:workspacekey');
        this._super.apply(this, arguments);

        if (this.get('isNew')) {
            this.set('decrypted', true);
        }
    },

    /**
     map of all decrypted fields
     @property fields
     @type Ember.Map
     */
    decryptedFields: Ember.computed(function () {
        var map = Ember.Map.create();
        this.constructor.eachComputedProperty(function (name, meta) {
            if (meta.isDecryptedField) {
                map.set(name, true);
            }
        });
        return map;
    }),

    /**
     * map of all encrypted fields
     *
     * This is only solution how to retrieve properties in runtime (including mixed in computed properties over mixin.apply method)
     *
     * @property fields
     * @type Ember.Map
     *
     *
     */
    encryptedFields: Ember.computed(function () {
        var props = Ember.meta(this, false).descs;
        var map = Ember.Map.create();
        for (var k in props) {
            var p = props[k];
            if (p instanceof Ember.ComputedProperty && p._meta && p._meta.isDecryptedField) {
                map.set(p._meta.encryptedField, true);
            }
        }
        return map;
    }),


    /**
     map of all dirty encrypted fields
     @property fields
     @type Ember.Map
     */
    getDirtyEncryptedFields: function () {
        var map = Ember.Map.create();
        this.get('encryptedFields').forEach(function (encryptedField) {
            var data = this.getDecryptedData(encryptedField);
            if (data && data.isDirty) {
                map.set(encryptedField, true);
            }
        }.bind(this));
        return map;
    },

    areDecryptedDataDirty: function (decryptedData) {
        var dataKeys = Ember.keys(decryptedData['data']);
        var cleanDataKeys = Ember.keys(decryptedData['cleanData']);
        if (dataKeys.length !== cleanDataKeys.length) {
            return true;
        }
        for (var i = 0; i < dataKeys.length; i++) {
            var key = dataKeys[i];
            if (Ember.get(decryptedData, 'data.' + key) != Ember.get(decryptedData, 'cleanData.' + key)) {
                return true;
            }
        }
        return false;
    },

    setDecryptedData: function (encryptedField, data, initial) {
        var key = getEncryptedDataKey(encryptedField);
        var data = data || {};

        var decryptedData = {
            cleanData: data.cleanData || {},
            data: data,
            isDirty: null
        }

        if (initial) {
            decryptedData.cleanData = Ember.merge({}, data)
            decryptedData.isDirty = false;
        } else {
            decryptedData['isDirty'] = this.areDecryptedDataDirty(decryptedData);
        }

        this.set(key, decryptedData);
    },

    clearDecryptedData: function () {
        this.get('encryptedFields').forEach(function (encryptedField) {
            this.setDecryptedData(encryptedField);
        }.bind(this));
    },

    getDecryptedData: function (encryptedField) {
        var key = getEncryptedDataKey(encryptedField);
        var data = this.get(key);

        if (data) {
            return data;
        } else {
            this.setDecryptedData(encryptedField);
            return this.get(key);
        }
    },

    decryptField: function (encryptedField) {
        var encryptedData = this.get(encryptedField);
        var data;

        if (encryptedData) {
            data = this.workspacekey.decryptWorkspaceData(encryptedData) || {};
        }
        else {
            data = null;
        }
        this.setDecryptedData(encryptedField, data, true);
    },

    decryptFields: function () {
        this.get('encryptedFields').forEach(function (encryptedField) {
            this.decryptField(encryptedField);
        }.bind(this))
    },

    encryptField: function (encryptedField) {
        var decryptedData = this.getDecryptedData(encryptedField);
        var data = this.workspacekey.encryptWorkspaceData(decryptedData['data']);
        this.set(encryptedField, data);
    },

    deserialize: function (options) {
        var deserialized = this._super.apply(this, arguments);
        deserialized.clearDecryptedData();

        this.set('decrypted', false);
        try {
            deserialized.decryptFields();
            this.set('decrypted', true);
        } catch (e) {
            this.set('decrypted', false);
            console.error('Secret decryption failed');
            console.error(e.stack);
            throw e;
        }

        return deserialized;
    },

    serialize: function (options) {
        this.getDirtyEncryptedFields().forEach(function (encryptedField) {
            this.encryptField(encryptedField);
        }.bind(this));
        return this._super.apply(this, arguments);
    }
})

/**
 * Each field to be automatically decrypted/encrypted should be marked by this model attribute decorator
 * @param encryptedField {String} source encrypted field out of which decrypted field will be decrypted
 * @param decryptedField {String} name of decrypted field to be contained in decrypted {} out of encrypted field
 */
Vaultier.EncryptedModel.decryptedField = function (encryptedField, decryptedField) {
    return Ember.computed(function (key, value) {
        if (!Vaultier.EncryptedModel.Mixin.detect(this)) {
            throw new Error('Only models with mixin Vaultier.EncryptedModelMixin can have decryptedField');
        }

        // decryptedField is optional, if encrypted stored key differs from field name
        if (decryptedField) {
            key = decryptedField
        }

        // retrieve decrypted data from cache
        var data = this.getDecryptedData(encryptedField);

        // Getter
        if (arguments.length === 1) {
            if (data) {
                return Ember.get(data, 'data.' + key);
            } else {
                return undefined;
            }
        }

        // Setter
        else {
            Ember.set(data, 'data.' + key, value);
            Ember.set(data, 'isDirty', this.areDecryptedDataDirty(data));
            this.set('isDirty', true);
            return this;
        }


    }).property(getEncryptedDataKey(encryptedField))
        .meta({
            encryptedField: encryptedField,
            isDecryptedField: true
        })
}
