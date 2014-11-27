from gevent import pywsgi, spawn
from django import setup
from rest_framework.exceptions import AuthenticationFailed
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.exceptions import WebSocketError
from accounts.business.authentication import TokenAuthentication
import logging
from urlparse import parse_qs
from vaultier.notifier.notifier import Notifier

_logger = logging.getLogger('notifier')


class Client(object):
    """
    Object representing concrete user connections
    """
    def __init__(self, user_id, ws, name=None):
        self._connections = []
        self.add_connection(ws)
        self.user_id = user_id
        self.name = name

    def add_connection(self, ws):
        """
        Adds connection to user connection pool
        """
        key = ws.environ.get('HTTP_SEC_WEBSOCKET_KEY')
        self._connections.append(key)

    def del_connection(self, ws):
        """
        Delete connection
        """

        try:
            key = ws.environ.get('HTTP_SEC_WEBSOCKET_KEY')
        except (KeyError, AttributeError):
            if not isinstance(ws, str):
                raise TypeError("Parameter ws must be instance of WebSocket or string")
            key = ws
        try:
            self._connections.remove(key)
        except ValueError:
            _logger.error("User #{} does not have connection {} ".format(self.user_id, key))

    def send(self, message):
        """
        Send message to all User connections
        """
        for x in self._connections:
            ws = x["wsgi.websocket"]

            # try:
            ws.send(message)
            # except WebSocketError:
            #     self.del_connection(ws)
            #     ws.close()

    def __unicode__(self):
        return self.__str__()

    def __str__(self):
        str = "#{}".format(self.user_id)
        if self.name:
            str = "{} ({})".format(str, self.name)
        return str


class Application(object):
    """
    WebSocket application
    """
    def __init__(self):
        self.client_pool = {}
        self._logger = logging.getLogger('notifier')

    def handle(self, client, ws):
        """
        Handle websocket client connection.

        :param client:
        :param environ:
        :return:
        """
        self._logger.debug("Entering message loop for connection [{}] {}".format(ws.environ['REMOTE_ADDR'], str(client)))
        key = ws.environ.get('HTTP_SEC_WEBSOCKET_KEY')
        while True:
            try:
                message = ws.receive()
                self.on_message(ws, client, message)
            except WebSocketError:
                ws.close()
                break

        client.del_connection(key)

    def on_message(self, ws, client, message):
        """
        Receiving messages sent by client. Do nothing right now

        :param ws:
        :param client:
        :param message:
        :return:
        """
        self._logger.debug("Received message from {}: {}".format(client, message))

    def connection_handler(self, environ, start_response):
        """
        Handle every single client connection. Perform authentication

        :param environ:
        :param start_response:
        :return:
        """
        def disconnect(ws):
            self._logger.debug("Disconnecting user {}".format("asdf"))
            ws.send("Authentication failed. Closing connection")
            ws.close()

        self._logger.debug("New connection from {}".format(environ['REMOTE_ADDR']))

        if environ["PATH_INFO"] == '/':
            ws = environ["wsgi.websocket"]

            qs = ws.environ['QUERY_STRING']
            if qs.endswith('/'):
                qs = qs[:-1]
            qp = parse_qs(qs)
            if 'token' not in qp:
                disconnect(ws)
                return
            token = qp.get('token')[0]

            try:
                a = TokenAuthentication()
                # authenticate token
                user, token = a.authenticate_token(token)
                # try to get client from pool
                if not user:
                    disconnect(ws)
            except AuthenticationFailed:
                disconnect(ws)
            else:
                self._logger.debug("User #{} authenticated {}".format(user.pk, user.nickname))
                if user.pk in self.client_pool:
                    client = self.client_pool.get(user.pk)
                    client.add_connection(ws)
                else:
                    client = Client(user_id=user.pk, ws=ws, name=user.nickname)
                    self.client_pool[user.pk] = client

                self.handle(client, ws)

    def control(self, message):
        """
        Handle incomming message from application

        :param message:
        :return:
        """
        self._logger.debug("New control message: {}".format(message))
        for user_id in message.recipients:
            if user_id in self.client_pool:
                client = self.client_pool.get(user_id)
                client.send(message)


def run(ipaddr, port):
    setup()
    app = Application()
    server = pywsgi.WSGIServer((ipaddr, port), app.connection_handler,
                               handler_class=WebSocketHandler)
    try:
        notifier = Notifier()
        spawn(notifier.subscribe, app.control)
        server.serve_forever()
    except KeyboardInterrupt:
        server.stop()