Create Node
===========
Creates new nodes.

.. note::
    To add data to nodes type=file

.. http:post:: /nodes/

  **Example Request**

  .. sourcecode:: http

     POST /nodes/ HTTP/1.1
     Content-Type: application/json
     Accept: application/json

     {
        "name" : "some-encrypted-data",
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

  .. include:: _node_example.rst

  :status 201: Created
  :status 400: Bad request (bad data, missing value/file, ...)
  :status 401: Unauthorized
  :status 403: Forbidden
