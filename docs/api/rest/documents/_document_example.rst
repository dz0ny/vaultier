.. code-block:: json

    {
        "id": 3,
        "meta" : "some-encrypted-data",
        "type" : 1,
        "data" : null,
        "color": "#ff6600",
        "enc_version": 1,
        "created_by": 1,
        "created_at": "2014-05-28T10:10:30.501Z",
        "updated_at": "2014-05-28T10:10:30.501Z"
    }

:jsonparam string meta: encrypted-data about document
:jsonparam string type: type of document (directory|file)
:jsonparam string [color]: Folder hex color
:jsonparam int enc_version: How was document encrypted
:jsonparam string data: link to file content (only for type=file)
:jsonparam int created_by: id of document creator