List of Documents
=================
Retrieve list of documents in root.

.. http:get:: /documents/

Retrieves list of documents with specific parent

.. http:get:: /documents/?parent=(int:pk)

  **Example Request**

  .. sourcecode:: http

     GET /documents/?parent=1 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    [

      {
        "id": 3,
        "meta": "some-encrypted-data",
        "type": 1,
        "data": null,
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z"
      },

      {
        "id": 4,
        "meta" : "some-encrypted-data",
        "type" : 2,
        "data" : "http://example.com/1",
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-30T22:22:22.501Z",
        "updated_at": "2015-05-30T23:23:23.501Z"
      }

    ]
