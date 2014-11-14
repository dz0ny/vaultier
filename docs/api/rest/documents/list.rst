List of Documents
=================
Retrieve lists of documents.


All Documents
-------------
List of all documents

.. http:get:: /documents/

  **Example Request**

  .. sourcecode:: http

     GET /documents/ HTTP/1.1
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


Children Documents
------------------
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
  :status 404: Document not found
