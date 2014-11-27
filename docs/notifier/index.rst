********
Notifier
********

Notifier is service collecting data changes that users needs to know in realtime.
Now is collections node modification. insertion and deletion.


==============
Message format
==============

Example message for new node

.. code-block:: json

    {
        "channel": "nodes",
        "data": {
            "id": 1,
            "type": "CREATED"
            }
    }

Message parameters
------------------
:channel (string): name of channel *(required field)*
:data (object): message data *(required field)*. Message format is specific for each channel


======================
Messages specification
======================

See :ref:`notifier_channels`

===================
Notifier interfaces
===================

Right now notifier supports only WebSocket communication