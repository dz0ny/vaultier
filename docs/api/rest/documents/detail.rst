Document detail and manage
==========================
Working with specific document.

Detail
------
Retrieve document detail.

.. http:get:: /documents/(int:pk)/

  **Example Request**

  .. sourcecode:: http

     GET /documents/3 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

  .. include:: _document_example.rst

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Document not found


Path
----
Retrieve list of path to current document.

.. http:get:: /documents/(int:pk)/path/

  **Example Request**

  .. sourcecode:: http

     GET /documents/1/path/ HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

    [

      {
        "id": 2,
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
        "id": 3,
        "name" : "some-encrypted-data",
        "meta" : "some-encrypted-data",
        "type" : 2,
        "data" : "http://example.com/1",
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-30T22:22:22.501Z",
        "updated_at": "2015-05-30T23:23:23.501Z",
        "parent": 2,
      }

    ]

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: document not found


Update
------
Updates document.

.. note::
    Changing "parent" field means that document will be moved.

.. http:put:: /documents/(int:pk)/

  **Example Request**

  .. sourcecode:: http

     PUT /documents/3 HTTP/1.1
     Accept: application/json

     {
        "meta": "some-encrypted-data",
        "parent": 3
     }

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

  .. include:: _document_example.rst


  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: document not found


Delete
------
Removes document.

.. http:delete:: /documents/(int:pk)/


  **Example Request**

  .. sourcecode:: http

     DELETE /documents/3 HTTP/1.1

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 204 NO CONTENT

  :status 204: No Content - Deleted
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: document not found
