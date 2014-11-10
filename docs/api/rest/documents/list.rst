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

  .. include:: _document_list_example.rst
