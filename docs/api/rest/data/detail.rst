Data upload and download
========================

Download
--------
Returns data.

.. note::
    Can be used only for documents with type="file"

.. http:get:: /documents/(int:pk)/data/

  **Example Request**

  .. sourcecode:: http

     GET /data/1 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: text/text; charset=utf-8
     Content-Length: length

     encrypted-data-here


  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Document not found

Upload Data
-----------
Updates data for file document

.. note::
    Can be used only for documents with type="file"

.. http:put:: /documents/(int:pk)/data/

  **Example Request**

  .. sourcecode:: http

     PUT /data/1 HTTP/1.1
     Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryePkpFF7tjBAqx29L

     ------WebKitFormBoundaryePkpFF7tjBAqx29L
     Content-Disposition: form-data; name="data"; filename="hello.o"
     Content-Type: application/x-object

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 204 NO CONTENT

  :status 200: OK
  :status 400: Bad request (bad data, ...)
  :status 401: Unauthorized
  :status 403: Forbidden
