Node detail and manage
======================
Working with specific node.

Detail
------
Retrieve node detail.

.. http:get:: /nodes/(int:pk)/

  **Example Request**

  .. sourcecode:: http

     GET /nodes/3 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

  .. include:: _node_example.rst

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found


Path
----
Retrieve list of path to current node.

.. http:get:: /nodes/(int:pk)/path/

  **Example Request**

  .. sourcecode:: http

     GET /nodes/1/path/ HTTP/1.1
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
  :status 404: Node not found


Update
------
Update node.

.. note::
    Changing "parent" field means that node will be moved.

.. http:put:: /nodes/(int:pk)/

  **Example Request**

  .. sourcecode:: http

     PUT /nodes/3 HTTP/1.1
     Accept: application/json

     {
        "meta": "some-encrypted-data",
        "parent": 3
     }

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

  .. include:: _node_example.rst


  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found


Delete
------
Removes node.

.. http:delete:: /nodes/(int:pk)/


  **Example Request**

  .. sourcecode:: http

     DELETE /nodes/3 HTTP/1.1

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 204 NO CONTENT

  :status 204: No Content - Deleted
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found
