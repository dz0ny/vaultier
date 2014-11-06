Create Document
===============
Creates new document.

.. note::
    To add data to document type=file

.. http:post:: /documents/

  **Example Request**

  .. sourcecode:: http

     POST /documents/ HTTP/1.1
     Content-Type: application/json
     Accept: application/json

     {
        "meta" : "some-encrypted-data",
        "type" : 1,
        "parent" : 2,
        "enc_version": 1,
        "data": null,
        "color": "#ffcccc"
     }

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 201 CREATED
     Content-Type: application/json

  .. include:: _document_example.rst

  :status 201: Created
  :status 400: Bad request (bad data, missing value/file, ...)
  :status 401: Unauthorized
  :status 403: Forbidden
