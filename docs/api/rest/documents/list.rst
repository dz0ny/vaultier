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

  .. include:: _document_list_example.rst

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

  .. include:: _document_list_example.rst

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Document not found
