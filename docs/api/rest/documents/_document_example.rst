.. code-block:: json

    {
        "id": 3,
        "name" : "some-encrypted-data",
        "meta" : "some-encrypted-data",
        "type" : 1,
        "data" : null,
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z",
        "parent": null,
        "tree_id": 1,
        "level": 0
    }

:jsonparam string name: encrypted-data about name of document
:jsonparam string meta: encrypted-data about document
:jsonparam string type: type of document (directory|file)
:jsonparam string [color]: Folder hex color
:jsonparam int enc_version: How was document encrypted
:jsonparam string data: link to file content (only for type=file)