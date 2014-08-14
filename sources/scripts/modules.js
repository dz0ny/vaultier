'use strict';

var vaultierModulesConfig = {
    "dev": {

        "boot": {
            "skipLoading": true,
            "scripts": [

                /**************** boot **/
                "./bower_components/jquery/dist/jquery.js",
                "./bower_components/headjs/dist/1.0.0/head.js",
                "./bower_components/raven-js/dist/raven.js",
                "./local_components/pohon/pohon.js",
                "./js/loader.js"
            ]
        },

        "vendors": {
            "scripts": [

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
                "./bower_components/ember-restless/dist/ember-restless+extras.js",

                /**************** ember extensions **/
                "./bower_components/ember-animate/ember-animate.js",
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

                /**************** bootwatch css as modified boostrap **/
                "./local_components/bootwatch/css/bootstrap.css",
                "./local_components/bootwatch/css/bootwatch.min.css",

                /**************** select2 and selectize styles **/
                "./bower_components/select2/select2.css",
                "./bower_components/select2/select2-bootstrap.css",
                "./bower_components/selectize/dist/css/selectize.bootstrap3.css"
            ],

            "resources": [
                /**************** bootsrap resources **/
                "./bower_components/bootstrap/dist/css/**/*.*",
                "./bower_components/bootstrap/dist/fonts/**/*.*",

                /**************** bootwatch resources **/
                "./local_components/bootwatch/css/**/*.*",
                "./local_components/bootwatch/fonts/**/*.*"
           ]
        },

        "core": {
            "scripts": [
            /**************** Utils **/
                "./js/utils/E.js",
                "./js/utils/ConstantList.js",
                "./js/utils/Singleton.js",
                "./js/utils/HandlebarsHelpers.js",
                "./js/utils/RSVPAjax.js",
                "./js/utils/MutableAdapterMixin.js",
                "./js/utils/RolesProxy.js",
            /**************** App **/
                "./js/application.js",
                "./js/keypressBindings.js",
                "./js/di.js",
                "./js/router.js",
            /**************** Services **/
                "./js/service/Errors.js",
                "./js/service/Environment.js",
                "./js/service/Auth.js",
                "./js/service/AuthPromises.js",
                "./js/service/Session.js",
                "./js/service/Storage.js",
                "./js/service/Coder.js",
                "./js/service/Invitations.js",
                "./js/service/WorkspaceKey.js",
                "./js/service/KeyTransfer.js",
                "./js/service/ChangeKey.js",
                "./js/service/NewUserInit.js",

            /**************** Models **/
                "./js/model/mixin/CreatedUpdatedMixin.js",
                "./js/model/mixin/MutableModelMixin.js",
                "./js/model/mixin/EncryptedModelMixin.js",
                "./js/model/mixin/RollbackMixin.js",
                "./js/model/adapter/Adapter.js",
                "./js/model/User.js",
                "./js/model/Workspace.js",
                "./js/model/WorkspaceKey.js",
                "./js/model/Member.js",
                "./js/model/Invitation.js",
                "./js/model/Role.js",
                "./js/model/Vault.js",
                "./js/model/Card.js",
                "./js/model/Secret.js",
                "./js/model/LostKey.js"
            ]
        },
        "layout": {
            "templates": [
                "./js/module/Layout/SecurityBox.hbs",
                "./js/module/Layout/WorkspaceBox.hbs",
                "./js/module/Layout/SearchBox.hbs",
                "./js/module/Layout/Breadcrumbs.hbs",
                "./js/module/Layout/LayoutStandard.hbs",
                "./js/module/Layout/Confirm.hbs",
                "./js/module/Layout/Footer.hbs",
                "./js/module/Layout/PasswordField.hbs"
            ],
            "scripts": [
                "./js/module/Layout/LayoutStandard.js",
                "./js/module/Layout/SecurityBox.js",
                "./js/module/Layout/SearchBox.js",
                "./js/module/Layout/DotDotDot.js",
                "./js/module/Layout/Breadcrumbs.js",
                "./js/module/Layout/WorkspaceBox.js",
                "./js/module/Layout/Confirm.js",
                "./js/module/Layout/PasswordField.js"
            ],
            "resources": [
                './images/**/*'
            ],
            "styles": [
                "./css/application.css",
                "./css/home.css"
            ]
        },
        "error": {
            "templates": [
                "./js/module/Error/Error404.hbs",
                "./js/module/Error/ErrorGeneric.hbs",
                "./js/module/Error/Layout.hbs"
            ],
            "scripts": [
                "./js/module/Error/Error.js"
            ]
        },
        "home": {
            "scripts": [
                "./js/module/Home/HomeIndex.js"
            ],
            "templates": [
                "./js/module/Home/HomeIndex.hbs"
            ]
        },
        "auth": {
            "scripts": [
                "./js/module/Auth/AuthLogin.js",
                "./js/model/LostKey.js",
                "./js/module/Auth/AuthLostKeyIndex.js",
                "./js/module/Auth/AuthRegister.js",
                "./js/module/Auth/AuthLostKeyRecoveryIndex.js",
                "./js/module/Auth/AuthLostKeyRecoveryReset.js",
                "./js/module/Auth/AuthLostKeyRecoveryRebuild.js",
                "./js/module/Auth/AuthLostKeyRecoveryDisable.js"
            ],
            "templates": [
                "./js/module/Auth/AuthLogin.hbs",
                "./js/module/Auth/AuthRegister.hbs",
                "./js/module/Auth/AuthRegisterBefore.hbs",
                "./js/module/Auth/AuthRegisterKeys.hbs",
                "./js/module/Auth/AuthRegisterCreds.hbs",
                "./js/module/Auth/AuthLostKeyIndex.hbs",
                "./js/module/Auth/AuthLostKeySuccess.hbs",
                "./js/module/Auth/AuthRegisterSum.hbs",
                "./js/module/Auth/AuthLostKeyRecoveryReset.hbs",
                "./js/module/Auth/AuthLostKeyRecoveryRebuild.hbs",
                "./js/module/Auth/AuthLostKeyRecoveryDisable.hbs",
                "./js/module/Auth/AuthLostKeyRecoverySuccess.hbs"
            ]
        },
        "membership": {
            "scripts": [
                "./js/module/Invitation/Invitation.js",
                "./js/module/RolesAdmin/RolesAdminInviteInput.js",
                "./js/module/RolesAdmin/RolesAdminIndex.js",
                "./js/module/RolesAdmin/RolesAdminInvite.js",
                "./js/module/RolesAdmin/RolesAdminBox.js",
                "./js/module/RolesAdmin/RolesAdminManagement.js"
            ],
            "templates": [
                "./js/module/RolesAdmin/**/*.hbs",
                "./js/module/Invitation/InvitationAnonymous.hbs",
                "./js/module/Invitation/InvitationAccept.hbs"
            ]
        },
        "workspace": {
            "scripts": [
                "./js/module/Workspace/WorkspacesIndex.js",
                "./js/module/Workspace/WorkspacesCreate.js",
                "./js/module/Workspace/WorkspaceIndex.js",
                "./js/module/Workspace/WorkspaceEdit.js",
                "./js/module/Workspace/WorkspaceRolesAdmin.js",
                "./js/module/Workspace/WorkspaceRolesAdminManagement.js"
            ],
            "templates": [
                "./js/module/Workspace/MembersAdminRoleItemWorkspace.hbs",
                "./js/module/Workspace/MembersAdminRoleItemVault.hbs",
                "./js/module/Workspace/MembersAdminRoleItemCard.hbs",
                "./js/module/Workspace/MembersAdmin.hbs",
                "./js/module/Workspace/WorkspacesIndex.hbs",
                "./js/module/Workspace/WorkspacesIndexItem.hbs",
                "./js/module/Workspace/WorkspacesIndexWithoutKeys.hbs",
                "./js/module/Workspace/WorkspacesCreate.hbs",
                "./js/module/Workspace/WorkspaceEdit.hbs",
                "./js/module/Workspace/WorkspaceNoKeys.hbs"
            ]
        },
        "vault": {
            "scripts": [
                "./js/module/Vault/VaultsIndex.js",
                "./js/module/Vault/VaultsCreate.js",
                "./js/module/Vault/VaultIndex.js",
                "./js/module/Vault/VaultEdit.js",
                "./js/module/Vault/VaultMember.js",
                "./js/module/Vault/VaultHistory.js"
            ],
            "templates": [
                "./js/module/Vault/VaultsIndex.hbs",
                "./js/module/Vault/VaultsIndexItem.hbs",
                "./js/module/Vault/VaultsCreate.hbs",
                "./js/module/Vault/VaultEdit.hbs",
                "./js/module/Vault/VaultHistoryIndex.hbs"
            ]
        },
        "card": {
            "scripts": [
                "./js/module/Card/CardsIndex.js",
                "./js/module/Card/CardsCreate.js",
                "./js/module/Card/CardEdit.js",
                "./js/module/Card/CardIndex.js",
                "./js/module/Card/CardMember.js",
                "./js/module/Card/CardMove.js"
            ],
            "templates": [
                "./js/module/Card/CardsIndex.hbs",
                "./js/module/Card/CardsIndexItem.hbs",
                "./js/module/Card/CardsCreate.hbs",
                "./js/module/Card/CardEdit.hbs",
                "./js/module/Card/CardMove.hbs",
                "./js/module/Card/CardMoveVaultNode.hbs"
            ]
        },
        "secret": {
            "scripts": [
                "./js/module/Secret/EditorInput.js",
                "./js/module/Secret/SecretCreate.js",
                "./js/module/Secret/SecretEdit.js",
                "./js/module/Secret/SecretType.js",
                "./js/module/Secret/SecretIndex.js",
                "./js/module/Secret/SecretMove.js"
            ],
            "templates": [
                "./js/module/Secret/SecretIndex.hbs",
                "./js/module/Secret/SecretEdit.hbs",
                "./js/module/Secret/SecretCreate.hbs",
                "./js/module/Secret/SecretTypeSelect.hbs",
                "./js/module/Secret/SecretTypeNote.hbs",
                "./js/module/Secret/SecretTypePassword.hbs",
                "./js/module/Secret/SecretTypeFile.hbs",
                "./js/module/Secret/SecretIndexItemNote.hbs",
                "./js/module/Secret/SecretIndexItemPassword.hbs",
                "./js/module/Secret/SecretIndexItemFile.hbs",
                "./js/module/Secret/SecretIndexItemControls.hbs",
                "./js/module/Secret/SecretMove.hbs",
                "./js/module/Secret/SecretMoveVaultNode.hbs",
                "./js/module/Secret/SecretMoveCardNode.hbs"
            ]
        },
        "settings": {
            "scripts": [
                "./js/module/Settings/ChangeKey.js",
                "./js/module/Settings/SettingsIndex.js",
                "./js/module/Settings/SettingsPersonal.js",
                "./js/module/Settings/SettingsKeys.js"
            ],
            "templates": [
                "./js/module/Settings/ChangeKey.hbs",
                "./js/module/Settings/SettingsIndex.hbs",
                "./js/module/Settings/SettingsPersonal.hbs",
                "./js/module/Settings/SettingsKeys.hbs"
            ]
        },
        "run": {
            "scripts": [
                "./js/run.js"
            ]
        }
    }

};

module.exports = vaultierModulesConfig;
