'use strict';

var vaultierModulesConfig = {
    "application": "vaultier",
    "dev": {
        "raven": {
            "scripts": [
                "./bower_components/raven-js/dist/raven.js"
            ]
        },
        "jquery-plugins": {
            "scripts": [
                "./bower_components/notifyjs/dist/notify.js",
                "./bower_components/notifyjs/dist/styles/bootstrap/notify-bootstrap.js",
                "./bower_components/jstorage/jstorage.js",
                "./bower_components/jquery-cookie/jquery.cookie.js",
                "./bower_components/jquery.sessionstorage/jquery.sessionStorage.js"
            ]
        },
        "pohon": {
            "scripts": [
                "./local_components/pohon/pohon.js"
            ]
        },
        "generic": {
            "scripts": [
                "./bower_components/momentjs/moment.js",
                "./bower_components/jsep/src/jsep.js"
            ]
        },
        "cyphering-core": {
            "scripts": [
                "./bower_components/CryptoJS/build/components/core.js",
                "./bower_components/CryptoJS/build/components/enc-base64.js",
                "./bower_components/CryptoJS/build/components/md5.js",
                "./bower_components/CryptoJS/build/components/sha1.js",
                "./bower_components/CryptoJS/build/components/sha256.js",
                "./bower_components/CryptoJS/build/components/ripemd160.js",
                "./bower_components/CryptoJS/build/components/x64-core.js",
                "./bower_components/CryptoJS/build/components/sha512.js",
                "./bower_components/CryptoJS/build/rollups/aes.js"
            ]
        },
        "signatures": {
            "scripts": [
                "./bower_components/jsrsasign/ext/jsbn.js",
                "./bower_components/jsrsasign/ext/jsbn2.js",
                "./bower_components/jsrsasign/ext/rsa.js",
                "./bower_components/jsrsasign/ext/rsa2.js",
                "./bower_components/jsrsasign/ext/base64.js",
                "./bower_components/jsrsasign/rsapem-1.1.js",
                "./bower_components/jsrsasign/rsasign-1.2.js",
                "./bower_components/jsrsasign/asn1hex-1.1.js",
                "./bower_components/jsrsasign/x509-1.1.js",
                "./bower_components/jsrsasign/crypto-1.1.js"
            ]
        },
        "rsa-encoding": {
            "scripts": [
                "./bower_components/jsencrypt/bin/jsencrypt.js"
            ]
        },
        "files": {
            "scripts": [
                "./bower_components/FileSaver/FileSaver.js",
                "./bower_components/FileAPI/dist/FileAPI.js"
            ]
        },
        "ember": {
            "scripts": [
                "./bower_components/handlebars/handlebars.js",
                "./bower_components/ember/ember.js",
                "./bower_components/ember-restless/dist/ember-restless+extras.js",
                "./local_components/ember-ext/Tree/EmberTree.js"
            ]
        },
        "validation": {
            "scripts": [
                "./bower_components/lgtm/dist/lgtm-standalone.js"
            ]
        },
        "ui-tools": {
            "scripts": [
                "./bower_components/bootstrap/dist/js/bootstrap.js",
                "./bower_components/select2/select2.js",
                "./bower_components/Keypress/keypress.js",
                "./bower_components/marked/lib/marked.js",
                "./bower_components/selectize/dist/js/standalone/selectize.js"
            ],
            "styles": [
                "./local_components/bootswatch/css/bootstrap.css",
                "./local_components/bootswatch/css/bootwatch.min.css",
                "./bower_components/select2/select2.css",
                "./bower_components/select2/select2-bootstrap.css",
                "./bower_components/selectize/dist/css/selectize.bootstrap3.css"
            ]
        },
        "main": {
            "skip_from_loader": true,
            "scripts": [
                "./bower_components/jquery/dist/jquery.js",
                "./bower_components/headjs/dist/1.0.0/head.js",
                "./js/loader.js"
            ],
            // assets must be reference here so that we skip it from loader
            "fonts": [
                './local_components/bootswatch/fonts/glyphicons-halflings-regular.eot',
                './local_components/bootswatch/fonts/glyphicons-halflings-regular.svg',
                './local_components/bootswatch/fonts/glyphicons-halflings-regular.ttf',
                './local_components/bootswatch/fonts/glyphicons-halflings-regular.woff'
            ],
            "images": [
                './images/**/*'
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
                "./js/model/Secret.js"
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
                "./js/module/Layout/Footer.hbs"
            ],
            "scripts": [
                "./js/module/Layout/LayoutStandard.js",
                "./js/module/Layout/SecurityBox.js",
                "./js/module/Layout/SearchBox.js",
                "./js/module/Layout/Breadcrumbs.js",
                "./js/module/Layout/WorkspaceBox.js",
                "./js/module/Layout/Confirm.js"
            ]
        },
        "assets": {
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
                "./js/module/Auth/AuthRegister.js"
            ],
            "templates": [
                "./js/module/Auth/AuthLogin.hbs",
                "./js/module/Auth/AuthRegister.hbs",
                "./js/module/Auth/AuthRegisterBefore.hbs",
                "./js/module/Auth/AuthRegisterKeys.hbs",
                "./js/module/Auth/AuthRegisterCreds.hbs",
                "./js/module/Auth/AuthRegisterSum.hbs"
            ]
        },
        "membership": {
            "scripts": [
                "./js/module/Invitation/Invitation.js",
                "./js/module/Member/MemberInviteInput.js",
                "./js/module/Member/MemberIndex.js",
                "./js/module/Member/MemberInvite.js"
            ],
            "templates": [
                "./js/module/Member/MemberIndex.hbs",
                "./js/module/Member/MemberInvite.hbs",
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
                "./js/module/Workspace/WorkspaceMember.js"
            ],
            "templates": [
                "./js/module/Workspace/WorkspacesIndex.hbs",
                "./js/module/Workspace/WorkspacesIndexItem.hbs",
                "./js/module/Workspace/WorkspacesIndexWithoutKeys.hbs",
                "./js/module/Workspace/WorkspacesCreate.hbs",
                "./js/module/Workspace/WorkspaceNoKeys.hbs",
                "./js/module/Workspace/WorkspaceEdit.hbs"
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
        "utils": {
            "scripts": [
                "./js/utils/ConstantList.js",
                "./js/utils/E.js",
                "./js/utils/HandlebarsHelpers.js",
                "./js/utils/MutableAdapterMixin.js",
                "./js/utils/RSVPAjax.js",
                "./js/utils/Singleton.js"
            ]
        },
        "run": {
            "scripts": [
                "./js/run.js"
            ]
        }
    },

    "prod": {
        "vendors": {
            "scripts": [
                "./bower_components/raven-js/dist/raven.min.js",

                "./bower_components/notifyjs/dist/notify.js",
                "./bower_components/notifyjs/dist/styles/bootstrap/notify-bootstrap.js",
                "./bower_components/jstorage/jstorage.min.js",
                ".bower_components/jquery-cookie/jquery.cookie.js",
                ".bower_components/jquery.sessionistorage/jquery.sessionStorage.js",

                "./local_componets/pohon/pohon.js",
                "./bower_components/momentjs/min/moment.min.js",
                ".bower_components/jsep/src/jsep.js",

                "./bower_components/CryptoJS/src/core.js",
                "./bower_components/CryptoJS/src/enc-base64.js",
                "./bower_components/CryptoJS/src/md5.js",
                "./bower_components/CryptoJS/src/sha1.js",
                "./bower_components/CryptoJS/src/sha256.js",
                "./bower_components/CryptoJS/src/ripemd160.js",
                "./bower_components/CryptoJS/src/x64-core.js",
                "./bower_components/CryptoJS/src/sha512.js",
                "./bower_components/CryptoJS/src/aes.js",

                "./bower_components/jsrsasign/ext/jsbn-min.js",
                "./bower_components/jsrsasign/ext/jsbn2-min.js",
                "./bower_components/jsrsasign/ext/rsa-min.js",
                "./bower_components/jsrsasign/ext/rsa2-min.js",
                "./bower_components/jsrsasign/ext/base64-min.js",
                "./bower_components/jsrsasign/rsapem-1.1.min.js",
                "./bower_components/jsrsasign/rsasign-1.2.min.js",
                "./bower_components/jsrsasign/asn1hex-1.1.min.js",
                "./bower_components/jsrsasign/x509-1.1.min.js",
                "./bower_components/jsrsasign/crypto-1.1.min.js",

                "./bower_components/jsencrypt/bin/jsencrypt.min.js",

                "./bower_components/FileSaver/FileSave.js",
                "./bower_components/FileAPI/dist/FileAPI.min.js",

                "./bower_components/handlebars/handlebars.min.js",
                "./bower_components/ember/ember.min.js",
                "./bower_components/ember-restless/dist/ember-restless+extras.js",
                "./local_components/ember-ext/Tree/EmberTree.js",

                "./bower_components/bootstrap/dist/bootstrap.min.js",

                "./bower_components/select2/select2.min.js",
                "./bower_components/Keypress/keypress-2.0.1.min.js",
                "./bower_components/marked/lib/marked.js",
                "./bower_components/selectize/dist/js/standalone/selectize.min.js"
            ],
            "styles": [
                "./bower_components/bootstrap/dist/css/bootstrap.css",
                "./bower_components/bootswatch/assets/css/bootwatch.min.css",
                "./bower_components/select2/select2.css",
                "./bower_components/select2-bootstrap.css",
                "./bower_components/selectize/dist/css/selectize.bootstrap3.css"
            ]
        }
    }
};

module.exports = vaultierModulesConfig;
