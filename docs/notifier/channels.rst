.. _notifier_channels:

*****************
Notifier channels
*****************

This page specify `data` message structure for every single channel

============
Node channel
============

Example message for new node

.. code-block:: json

    {
        "channel": "nodes",
        "data": {
            "id": 1,
            "type": "CREATED"
            }
    }

Data parameters
---------------
:id (int): Id of node which was changed
:type (string): Type of change ("*CREATED*", "*INSERTED*", "*DELETED*")