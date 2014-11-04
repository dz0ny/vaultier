Node detail and manage
======================
Working with specific Node.

Detail
------
Retrieve Node detail.

.. http:get:: /nodes/(int:pk)

  **Example Request**

  .. sourcecode:: http

     GET /nodes/3 HTTP/1.1
     Accept: application/json

  **Example Response**

  .. sourcecode:: http

     HTTP/1.1 201 CREATED
     Content-Type: application/json

  .. include:: _node_example.txt

  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found


Update
------
Updates Node.

.. note::
    Changing "parent" field means that node will be moved.

.. http:put:: /nodes/(int:pk)

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

  .. include:: _node_example.txt


  :status 200: OK
  :status 401: Unauthorized
  :status 403: Forbidden
  :status 404: Node not found


Delete
------
Removes Node.

.. http:delete:: /nodes/(int:pk)


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
