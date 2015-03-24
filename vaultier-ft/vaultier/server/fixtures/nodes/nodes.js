/* global require, module, __dirname */

module.exports = function (app) {
  return [
    {
      "id": 1,
      "name": "rClick",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-28T10:10:30.501Z",
      "updated_at": "2014-05-28T10:10:30.501Z",
      "parent": null,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 2,
      "name": "Cloudsoftphone",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "jakub.bokoc@rclick.cz",
        "nickname": "Jakub Bokoč"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-15T23:23:23.501Z",
      "parent": 1,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 3,
      "name": "Production server",
      "type": 100,
      "data": null,
      "color": "green",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-14T23:23:23.501Z",
      "parent": 2,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 19,
      "name": "Database",
      "type": 100,
      "data": null,
      "color": "red",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "stepan.bokoc@rclick.cz",
        "nickname": "Štěpán Bokoč"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-11-16T23:23:23.501Z",
      "parent": 3,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 4,
      "name": "Beta server",
      "type": 100,
      "data": null,
      "color": "purple",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "jan.misek@rclick.cz",
        "nickname": "Jan Míšek"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 2,
      "perms": {
        "read": true,
        "create": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 5,
      "name": "Jira",
      "type": 100,
      "data": null,
      "color": "orange",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 2,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 6,
      "name": "Sentry",
      "type": 100,
      "data": null,
      "color": "red",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "jakub.bokoc@rclick.cz",
        "nickname": "Jakub Bokoč"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 2,
      "perms": {
        "read": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 7,
      "name": "Readme",
      "type": 400,
      "data": {
        "password": "heslo",
        "username": "uzivatelske jmeno",
        "url": "adresa",
        "note": "poznamka"
      },
      blob_meta: {
        "filename": "nazev",
        "filesize": "velikost",
        "filetype": "typ"
      },
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "stepan.bokoc@rclick.cz",
        "nickname": "Štěpán Bokoč"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 2,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 8,
      "name": "Vaultier",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 3,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-05-16T23:23:23.501Z",
      "parent": 1,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 9,
      "name": "File server",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "jan.misek@rclick.cz",
        "nickname": "Jan Míšek"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-08-01T23:23:23.501Z",
      "parent": 1,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 10,
      "name": "Prod03",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-10-20T23:23:23.501Z",
      "parent": 1,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 11,
      "name": "Confluence",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "jan.misek@rclick.cz",
        "nickname": "Jan Míšek"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 1,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 12,
      "name": "CVUT",
      "type": 100,
      "data": null,
      "color": "purple",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": null,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 13,
      "name": "Personal",
      "type": 100,
      "data": null,
      "color": "blue",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": null,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 14,
      "name": "Supr veci",
      "type": 100,
      "data": null,
      "color": "green",
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 13,
      "perms": {
        "read": true,
        "create": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 16,
      "name": "Facebook",
      "type": 300,
      "data": {
        "username": "uzivatelske jmeno",
        "password": "heslo",
        "url": "adresa",
        "note": "poznamka"
      },
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2015-05-30T23:23:23.501Z",
      "parent": 13,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 15,
      "name": "Certificate",
      "type": 400,
      "data": {
        "password": "heslo",
        "username": "uzivatelske jmeno",
        "url": "adresa",
        "note": "poznamka"
      },
      blob_meta: {
        "filename": "nazev",
        "filesize": "velikost",
        "filetype": "typ"
      },
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 13,
      "perms": {
        "read": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 17,
      "name": "Readme",
      "type": 400,
      "data": {
        "username": "uzivatelske jmeno",
        "password": "heslo",
        "url": "adresa",
        "note": "poznamka"
      },
      blob_meta: {
        "filename": "nazev",
        "filesize": "velikost",
        "filetype": "typ"
      },
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 13,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    },
    {
      "id": 18,
      "name": "Certificate iOS",
      "type": 200,
      "data": {
        "note": "poznamka"
      },
      "enc_version": 1,
      "created_by": {
        "id": 1,
        "email": "vojtech.knaisl@rclick.cz",
        "nickname": "Vojtech Knaisl"
      },
      "created_at": "2014-05-30T22:22:22.501Z",
      "updated_at": "2014-12-16T23:23:23.501Z",
      "parent": 13,
      "perms": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "invite": true
      },
      "membership": {
        "id": 23,
        "status": 300,
        "workspace_key": "QiJIXGEj0tMPllpksp/0lTBy6HaxmaEVhqAWrtwgdvkm0"
      }
    }


  ];
}
