Anonymous usage statistics
==========================
We would like to inform you about application setting
`allow_anonymous_usage_statistics` which is by default True (allowed).

When anonymous usage statistics is enabled, Vaultier periodically anonymously
notifies its maintainer and developer about running instance of Vaultier.
As Vaultier is Open Source we kindly ask you to leave this option enabled
and let us know how many instances are deployed. We send these statistics
data: hashed id, version, count of workspaces, vaults, cards, secrets, users
and members.

.. http:post:: http://www.vaultier.org/api/ping/

  **Example Request**

  .. sourcecode:: http

     POST /api/ping/ HTTP/1.1
     Accept: application/json
     Content-Type: application/json

     {
        "uid": "14b570acce51451285fa2340e01f97344efe518c8770f5bbc0a794d9bcd55f01",
        "workspaces": 3,
        "vaults": 80,
        "cards": 2,
        "secrets": 50,
        "users": 4,
        "members": 5,
        "version": "0.7.3"
     }

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 201 CREATED
     Content-Type: application/json

     {}

  :jsonparam string [uid]: hashed site url - we use it as unique ID, to differentiate Vaultier instances
  :jsonparam int workspaces: number of workspaces
  :jsonparam int vaults: number of vaults
  :jsonparam int cards: number of cards
  :jsonparam int secrets: number of secrets
  :jsonparam int users: number of users
  :jsonparam int members: number of members
  :jsonparam string version: version of Vaultier

  :status 201: New Ping created
  :status 400: Bad request
