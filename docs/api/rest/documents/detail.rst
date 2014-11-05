Document detail and manage
==========================
Working with specific document.

Detail
------
Retrieve document detail.

.. http:get:: /documents/(int:pk)

  **Example Request**

  .. sourcecode:: http

     GET /documents/3 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 201 CREATED
     Content-Type: application/json

  .. include:: _document_example.txt

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: document not found


Update
------
Updates document.

.. note::
    Changing "parent" field means that document will be moved.

.. http:put:: /documents/(int:pk)

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

  .. include:: _document_example.txt


  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: document not found


Delete
------
Removes document.

.. http:delete:: /documents/(int:pk)


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
