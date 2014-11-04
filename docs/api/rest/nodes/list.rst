List of nodes
=============

Retrieve list of Nodes in root.

.. http:get:: /nodes/

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
        "id" : 3,
        "meta" : "some-encrypted-data",
        "path" : [1],
        "created_by" : 1,
        "data" : null,
        "type" : 1,
        "owner": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z"
      },

      {
        "id" : 4,
        "meta" : "some-encrypted-data",
        "path" : [1],
        "created_by" : 1,
        "data" : "http://example.com/1",
        "type" : 2,
        "owner": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z"
      }

    ]