*********
Websocket
*********
@TODO

==============
Authentication
==============
Authentication is almost same as http one (@todo: link to auth page), but you have to send authentication token as query parameter. For example::

    ws://localhost:7890/?token=893kjsdfhk298assfjk29fgjLDMCSK

.. note:: It is due to impossibility change request headers in javascript

===================
Running in dev. mode
===================

In development mode you can run websocket using django command.::

    ./manage.py websocket

You can specify address and port which will websocket listen on. It is same as django runserver command::

    ./manage.py websocket localhost:7890

.. note:: Default port is 9000
