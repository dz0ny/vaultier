List of Nodes
=============
Retrieve lists of nodes.


All Nodes
---------
List of all nodes.

.. http:get:: /nodes/

  **Example Request**

  .. sourcecode:: http

     GET /nodes/ HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    [

      {
        "id": 3,
        "name" : "some-encrypted-data",
        "meta": "some-encrypted-data",
        "type": 1,
        "data": null,
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z",
        "parent": null,
      },

      {
        "id": 4,
        "name" : "some-encrypted-data",
        "meta" : "some-encrypted-data",
        "type" : 2,
        "data" : "http://example.com/1",
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-30T22:22:22.501Z",
        "updated_at": "2015-05-30T23:23:23.501Z",
        "parent": null,
      }

    ]

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden


Children Nodes
--------------
Retrieves list of nodes with specific parent

.. http:get:: /nodes/?parent=(int:pk)

  **Example Request**

  .. sourcecode:: http

     GET /nodes/?parent=1 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    [

      {
        "id": 3,
        "name" : "some-encrypted-data",
        "meta": "some-encrypted-data",
        "type": 1,
        "data": null,
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z",
        "parent": 1,
      },

      {
        "id": 4,
        "name" : "some-encrypted-data",
        "meta" : "some-encrypted-data",
        "type" : 2,
        "data" : "http://example.com/1",
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-30T22:22:22.501Z",
        "updated_at": "2015-05-30T23:23:23.501Z",
        "parent": 1,
      }

    ]

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found
