Create Node
===========
Creates new node

.. note::
    To create file node, use POST /data/(int:pk)

.. http:post:: /nodes/

  **Example Request**

  .. sourcecode:: http

     POST /nodes/ HTTP/1.1
     Content-Type: application/json
     Accept: application/json

     {
        "meta" : "some-encrypted-data",
        "type" : 1,
        "parent" : 2,
        "enc_version": 1,
        "mime": null,
        "color": "#ffcccc"
     }

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 201 CREATED
     Content-Type: application/json

  .. include:: _node_example.txt

  :status 201: Created
  :status 400: Bad request (bad data, missing value/file, ...)
  :status 401: Unauthorized
  :status 403: Forbidden

