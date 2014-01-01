$(document).ready(function () {

    var STATIC_URL = '/static/'

    /************************************
     ************************************
     ************************************
     * Libs
     ************************************
     ************************************
     ************************************
     ************************************/

    /******************** Sentry raven **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/sentry/raven.js');

    /******************** Jquery plugins **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jquery.notify/jquery.notify.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jquery.jstorage/jstorage.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jquery.cookie/jquery.cookie.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jquery.session/jquery.session.js');

    /******************** Generic **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/moment/moment.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsep/jsep.js');

    /******************** Cyphering core **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/core.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/enc-base64.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/md5.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/sha1.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/sha256.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/ripemd160.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/x64-core.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/components/sha512.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/cryptojs/rollups/aes.js');

    /******************** Signatures **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/ext/jsbn.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/ext/jsbn2.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/ext/rsa.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/ext/rsa2.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/ext/base64.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/rsapem-1.1.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/rsasign-1.2.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/asn1hex-1.1.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/x509-1.1.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsrsasign/crypto-1.1.js');

    /******************** RSA encoding **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/jsencrypt/bin/jsencrypt.js');

    /******************** Files **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/filesaver/filesaver.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/fileapi/dist/FileAPI.js');

    /******************** Ember,Handlebars **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/handlebars/handlebars.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/ember/ember.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/ember/ember-data.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/ember/ember-data-django.js');

    /******************** Validations **/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/lgtm/dist/lgtm-standalone.js');

    /******************** Boostrap **/
//    ApplicationLoader.queueFile(STATIC_URL + 'lib/bootstrap/assets/js/html5shiv.js');
//    ApplicationLoader.queueFile(STATIC_URL + 'lib/bootstrap/assets/js/respond.min.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/bootstrap/dist/js/bootstrap.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/bootstrap/dist/css/bootstrap.css');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/bootstrap/assets/css/bootwatch.min.css');


    /************************************
     * UI Tools
     ************************************/
    ApplicationLoader.queueFile(STATIC_URL + 'lib/select2/select2.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/select2/select2.css');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/select2/select2-bootstrap.css');

    ApplicationLoader.queueFile(STATIC_URL + 'lib/selectizejs/dist/js/standalone/selectize.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/selectizejs/dist/css/selectize.bootstrap3.css');

    ApplicationLoader.queueFile(STATIC_URL + 'lib/keypressjs/keypress.js');
    ApplicationLoader.queueFile(STATIC_URL + 'lib/marked/lib/marked.js');


    /************************************
     ************************************
     ************************************
     * Templates
     ************************************
     ************************************
     ************************************
     ************************************/

    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/SecurityBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/WorkspaceBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/SearchBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/Breadcrumbs.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/LayoutStandard.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Layout/Confirm.js');

    /********************** home and system **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Home/HomeIndex.js');

    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Error/Error404.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Error/ErrorGeneric.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Error/Layout.js');

    /**########### auth **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthLogin.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthLoginLatest.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthLoginSwitch.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthRegister.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthRegisterBefore.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthRegisterKeys.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthRegisterCreds.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Auth/AuthRegisterSum.js');

    /**########### invitation **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Invitation/InvitationAnonymous.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Invitation/InvitationAccept.js');

    /********************** workspace **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspacesIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspacesIndexItem.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspacesIndexNotApproved.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspacesCreate.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspaceEdit.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Workspace/WorkspaceMemberApprove.js');

    /********************** vault **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Vault/VaultsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Vault/VaultsIndexItem.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Vault/VaultsCreate.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Vault/VaultEdit.js');

    /********************** card **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Card/CardsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Card/CardsIndexItem.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Card/CardsCreate.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Card/CardEdit.js');

    /********************** secret **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretCreate.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretTypeSelect.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretTypeNote.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretTypePassword.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretTypeFile.js');

    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretEdit.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretIndex.js');

    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretIndexItemNote.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretIndexItemPassword.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretIndexItemFile.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Secret/SecretIndexItemControls.js');

    /********************** member **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Member/MemberIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Member/MemberInvite.js');

    /********************** Settings **/
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Settings/SettingsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Settings/SettingsPersonal.js');
    ApplicationLoader.queueFile(STATIC_URL + 'tpl/Settings/SettingsKeys.js');

    /************************************
     ************************************
     ************************************
     * Utils
     ************************************
     ************************************
     ************************************
     ************************************/


    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/Pohon.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/E.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/ConstantList.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/Singleton.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/HandlebarsHelpers.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/RSVPAjax.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/utils/MutableAdapterMixin.js');

    /************************************
     ************************************
     ************************************
     * Application
     ************************************
     ************************************
     ************************************
     ************************************/


    ApplicationLoader.queueFile(STATIC_URL + 'js/application.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/di.js');

    /********************** Router **/

    ApplicationLoader.queueFile(STATIC_URL + 'js/router.js');

    /********************** services **/

    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Errors.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Environment.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Auth.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/AuthPromises.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Session.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Coder.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Invitations.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/service/Members.js');

    /********************** model **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/shared/Shared.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/shared/Adapter.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/User.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Workspace.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Member.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Role.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Vault.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Card.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/model/Secret.js');

    /********************** Layout **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/LayoutStandard.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/SecurityBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/SearchBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/Breadcrumbs.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/WorkspaceBox.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Layout/Confirm.js');

    /********************** Home and system**/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Home/HomeIndex.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Error/Error.js');

    /********************** Auth **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Auth/AuthLogin.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Auth/AuthRegister.js');

    /********************** Invitation **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Invitation/Invitation.js');

    /********************** member **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Member/MemberIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Member/MemberInvite.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Member/MemberInviteInput.js');

    /********************** Workspace **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspacesIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspacesCreate.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspaceIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspaceEdit.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspaceMember.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Workspace/WorkspaceMemberApprove.js');


    /********************** Vault **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Vault/VaultsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Vault/VaultsCreate.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Vault/VaultIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Vault/VaultEdit.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Vault/VaultMember.js');

    /********************** Card **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Card/CardsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Card/CardsCreate.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Card/CardIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Card/CardEdit.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Card/CardMember.js');

    /********************** Secret **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Secret/EditorInput.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Secret/SecretCreate.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Secret/SecretEdit.js');

    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Secret/SecretType.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Secret/SecretIndex.js');

    /********************** Settings **/
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Settings/SettingsIndex.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Settings/SettingsPersonal.js');
    ApplicationLoader.queueFile(STATIC_URL + 'js/module/Settings/SettingsKeys.js');


    /************************************
     ************************************
     ************************************
     * Main CSS
     ************************************
     ************************************
     ************************************
     ************************************/

    ApplicationLoader.queueFile(STATIC_URL + 'css/main.css');


    /************************************
     ************************************
     ************************************
     * Start
     ************************************
     ************************************
     ************************************
     ************************************/
    ApplicationLoader.queueFile(STATIC_URL + 'js/run.js');
    ApplicationLoader.loadQueued();
});
