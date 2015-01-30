'use strict';

var vaultierModulesConfig = {

    "boot": {
        environments: ['*'],
        "skipLoading": true,
        "scripts": [

        /**************** boot **/
            "./bower_components/jquery/dist/jquery.js",
            "./bower_components/headjs/dist/1.0.0/head.js",
            "./bower_components/raven-js/dist/raven.js",
            "./local_components/pohon/pohon.js",

            "./kernel/ApplicationKernel.js",
            "./kernel/ApplicationKernel.Config.js",
            "./kernel/ApplicationKernel.Loader.js",
            "./kernel/ApplicationKernel.UI.js"
        ]
    },

    "vendors": {
        environments: ['*'],
        "scripts": [

        /**************** logger **/
            "./bower_components/loglevel/dist/loglevel.js",
            "./app/utils/Logger.js",

        /**************** jquery extensions **/
            "./bower_components/notifyjs/dist/notify.js",
            "./bower_components/notifyjs/dist/styles/bootstrap/notify-bootstrap.js",
            "./bower_components/jstorage/jstorage.js",
            "./bower_components/jquery-cookie/jquery.cookie.js",
            "./bower_components/jquery.dotdotdot/src/js/jquery.dotdotdot.js",
            "./bower_components/jquery.sessionstorage/jquery.sessionStorage.js",

        /**************** pohon library (@deprecated to be removed) **/
            "./local_componets/pohon/pohon.js",

        /**************** moment js - utility library for time **/
            "./bower_components/momentjs/moment.js",

        /**************** utility library for parsing expressings **/
            "./bower_components/jsep/src/jsep.js",

        /**************** file utitlities **/
            "./bower_components/FileSaver/FileSaver.js",
            "./bower_components/FileAPI/dist/FileAPI.js",

        /**************** ember **/
            "./bower_components/handlebars/handlebars.js",
            "./bower_components/ember/ember.js",
            "./bower_components/ember-restless/dist/ember-restless.js",

        /**************** ember extensions **/
            "./bower_components/ember-animate/ember-animate.js",
            "./bower_components/ember-selectize/src/ember.selectize.js",
            "./local_components/ember-ext/Tree/Tree.js",
            "./local_components/ember-ext/AnimatedIf/AnimatedIf.js",

        /**************** boostrap **/
            "./bower_components/bootstrap/dist/js/bootstrap.js",

        /**************** select2 and selectize ui combos **/
            "./bower_components/select2/select2.js",
            "./bower_components/selectize/dist/js/standalone/selectize.js",

        /**************** utility library to manage keypresses **/
            "./bower_components/Keypress/keypress.js",

        /**************** utility library to render MarkDown **/
            "./bower_components/marked/lib/marked.js",

        /**************** utility library for validations **/
            "./bower_components/lgtm/dist/lgtm-standalone.js",

        /**************** encryption core **/
            "./bower_components/CryptoJS/build/components/core.js",
            "./bower_components/CryptoJS/build/components/enc-base64.js",
            "./bower_components/CryptoJS/build/components/md5.js",
            "./bower_components/CryptoJS/build/components/sha1.js",
            "./bower_components/CryptoJS/build/components/sha256.js",
            "./bower_components/CryptoJS/build/components/ripemd160.js",
            "./bower_components/CryptoJS/build/components/x64-core.js",
            "./bower_components/CryptoJS/build/components/sha512.js",
            "./bower_components/CryptoJS/build/rollups/aes.js",

        /**************** rsa encryptions **/
            "./bower_components/jsrsasign/ext/jsbn.js",
            "./bower_components/jsrsasign/ext/jsbn2.js",
            "./bower_components/jsrsasign/ext/rsa.js",
            "./bower_components/jsrsasign/ext/rsa2.js",
            "./bower_components/jsrsasign/ext/base64.js",
            "./bower_components/jsrsasign/rsapem-1.1.js",
            "./bower_components/jsrsasign/rsasign-1.2.js",
            "./bower_components/jsrsasign/asn1hex-1.1.js",
            "./bower_components/jsrsasign/x509-1.1.js",
            "./bower_components/jsrsasign/crypto-1.1.js",


        /**************** rsa signatures **/
            "./bower_components/jsrsasign/jsrasign-latest-all.js",

        /**************** rsa keys generation **/
            "./bower_components/jsencrypt/bin/jsencrypt.js"


        ],
        "styles": [
        /**************** boostrap css **/
            "./bower_components/bootstrap/dist/css/bootstrap.css",
            "./bower_components/select2/select2.css",
            "./bower_components/select2/select2-bootstrap.css",
            "./bower_components/selectize/dist/css/selectize.bootstrap3.css",

        /**************** select2 and selectize styles **/
            "./bower_components/select2/select2.css",
            "./bower_components/select2/select2-bootstrap.css",
            "./bower_components/selectize/dist/css/selectize.bootstrap3.css",

        /**************** font-awesome **/
            "./bower_components/fontawesome/css/font-awesome.css"

        ],

        "resources": [
        /**************** bootsrap resources **/
            "./bower_components/bootstrap/dist/css/**/*.*",
            "./bower_components/bootstrap/dist/fonts/**/*.*",

        /**************** select2 resources **/
            "./bower_components/select2/*.png",
            "./bower_components/select2/*.jpg",
            "./bower_components/select2/*.gif",

        /**************** font-awesome **/
            "./bower_components/fontawesome/fonts/*.*"
        ]
    },

    "resources": {
        environments: ['*'],
        "resources": [
            './images/**/*',
            "./font/**/*"
        ],
        "styles": [
            "./css/application.css"
        ]
    },


    "core": {
        environments: ['*'],
        "scripts": [
        /**************** Utils **/
            "./app/utils/E.js",
            "./app/utils/ConstantList.js",
            "./app/utils/Singleton.js",
            "./app/utils/HandlebarsHelpers.js",
            "./app/utils/RSVPAjax.js",
            "./app/utils/RolesProxy.js",
            "./app/utils/Security.js",
        /**************** App **/
            "./app/application.js",
            "./app/initializer/Boot.js",
            "./app/initializer/DI.js",
            "./app/initializer/DAL.js",
            "./app/initializer/JQBindings.js",
            "./app/initializer/Handlebars.js",
            "./app/initializer/Keypress.js",
            "./app/di.js",
            "./app/router.js",

        /**************** DAL **/
            "./app/dal/field/Object.js",
            "./app/dal/core/BetterRestless.js",
            "./app/dal/core/Adapter.js",
            "./app/dal/core/Client.js",

            "./app/dal/mixin/CreatedUpdatedMixin.js",
            "./app/dal/mixin/PolymorphicModelMixin.js",
            "./app/dal/mixin/EncryptedModelMixin.js",
            "./app/dal/mixin/RollbackMixin.js",
            "./app/dal/mixin/NodeFolderMixin.js",
            "./app/dal/mixin/NodeNoteMixin.js",
            "./app/dal/mixin/NodePasswordMixin.js",
            "./app/dal/mixin/NodeFileMixin.js",

            "./app/dal/adapter/NewsAdapter.js",
            "./app/dal/adapter/NodeAdapter.js",
            "./app/dal/adapter/NodeBlobAdapter.js",

            "./app/dal/model/Color.js",
            "./app/dal/model/User.js",
            "./app/dal/model/WorkspaceKey.js",
            "./app/dal/model/Member.js",
            "./app/dal/model/Invitation.js",
            "./app/dal/model/Role.js",
            "./app/dal/model/LostKey.js",
            "./app/dal/model/News.js",
            "./app/dal/model/Node.js",
            "./app/dal/model/NodeBlob.js"
        ]
    },

    "service": {
        environments: ['*'],
        "scripts": [
            "./app/service/Tree.js",
            "./app/service/Errors.js",
            "./app/service/Auth.js",
            "./app/service/AuthPromises.js",
            "./app/service/Session.js",
            "./app/service/Storage.js",
            "./app/service/Coder.js",
            "./app/service/Invitations.js",
            "./app/service/NodeKey.js",
            "./app/service/KeyTransfer.js",
            "./app/service/ChangeKey.js",
            "./app/service/NewUserInit.js"
        ]
    },

    "mock": {
        environments: ['test', 'dev-mock'],
        "scripts": [
            "./bower_components/jquery-mockajax/jquery.mockjax.js",

            "./mock/BaseMock.js",
            "./mock/MockManager.js",
            "./mock/NodeMock.js",
            "./mock/MemberMock.js",
            "./mock/RoleMock.js",
            "./mock/NodeKeyMock.js"
        ]
    },

    "layout": {
        environments: ['*'],
        "templates": [
            "./app/module/Layout/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Layout/LayoutStandard.js",
            "./app/module/Layout/SecurityBox.js",
            "./app/module/Layout/SearchBox.js",
            "./app/module/Layout/DotDotDot.js",
            "./app/module/Layout/Toolbar.js",
            "./app/module/Layout/Confirm.js",
            "./app/module/Layout/PasswordField.js"
        ]
    },
    "error": {
        environments: ['*'],
        "templates": [
            "./app/module/Error/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Error/Error.js"
        ]
    },
    "auth": {
        environments: ['*'],
        "templates": [
            "./app/module/Auth/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Auth/AuthLogin.js",
            "./app/model/LostKey.js",
            "./app/module/Auth/AuthLostKeyIndex.js",
            "./app/module/Auth/AuthRegister.js",
            "./app/module/Auth/AuthLostKeyRecoveryIndex.js",
            "./app/module/Auth/AuthLostKeyRecoveryReset.js",
            "./app/module/Auth/AuthLostKeyRecoveryRebuild.js",
            "./app/module/Auth/AuthLostKeyRecoveryDisable.js"
        ]
    },
    "membership": {
        environments: ['*'],
        "templates": [
            "./app/module/RolesAdmin/**/*.hbs",
            "./app/module/Invitation/**/*.hbs",
            "./app/module/MembersAdmin/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Invitation/Invitation.js",
            "./app/module/RolesAdmin/RolesAdminInviteInput.js",
            "./app/module/RolesAdmin/RolesAdminIndex.js",
            "./app/module/RolesAdmin/RolesAdminInvite.js",
            "./app/module/RolesAdmin/RolesAdminBox.js",
            "./app/module/RolesAdmin/RolesAdminManagement.js",
            "./app/module/MembersAdmin/MembersAdminList.js",
            "./app/module/MembersAdmin/MembersAdmin.js"
        ]
    },
    "documents": {
        environments: ['*'],
        "templates": [
            "./app/module/Documents/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Documents/DocumentKeysMixin.js",
            "./app/module/Documents/Color/DocumentColor.js",
            "./app/module/Documents/Tree/Mixin/StyleBindingsMixin.js",
            "./app/module/Documents/Tree/DocumentNode.js",
            "./app/module/Documents/Tree/DocumentTree.js",
            "./app/module/Documents/Detail/DocumentDetail.js",
            "./app/module/Documents/List/DocumentList.js",
            "./app/module/Documents/TypeEditable/DocumentTypeEditable.js",
            "./app/module/Documents/Create/DocumentCreate.js",
            "./app/module/Documents/Edit/DocumentEdit.js",
            "./app/module/Documents/Move/DocumentMove.js",
            "./app/module/Documents/NoKeys/DocumentNoKeys.js",
            "./app/module/Documents/RolesAdmin/DocumentRolesAdminIndex.js",
            "./app/module/Documents/RolesAdmin/DocumentRolesAdminInvite.js",
            "./app/module/Documents/TypeStatic/DocumentTypeStatic.js",
            "./app/module/Documents/CreateRoot/DocumentCreateRoot.js",
            "./app/module/Documents/NoNodes/DocumentsNoNodes.js",
            "./app/module/Documents/Document.js",
            "./app/module/Documents/Documents.js"
        ]
    },
    "settings": {
        environments: ['*'],
        "templates": [
            "./app/module/Settings/**/*.hbs"
        ],
        "scripts": [
            "./app/module/Settings/ChangeKey.js",
            "./app/module/Settings/SettingsIndex.js",
            "./app/module/Settings/SettingsPersonal.js",
            "./app/module/Settings/SettingsKeys.js"
        ]
    },

    "run-default": {
        environments: ['prod', 'dev', 'dev-mock'],
        "scripts": [
            "./app/run-default.js"
        ]
    },

    "test-env": {
        environments: ['test'],
        scripts: [
            "./bower_components/qunit/qunit/qunit.js",

            "./test/util/Test.js"
        ],
        "styles": [
            "./bower_components/qunit/qunit/qunit.css"
        ]
    },

    "test-case": {
        environments: ['test'],
        scripts: [
            "./test/case/module/Auth/AuthCases.js"
        ]
    },

    "run-test": {
        environments: ['test'],
        "scripts": [
            "./app/run-tests.js"
        ]
    }

};

module.exports = vaultierModulesConfig;
