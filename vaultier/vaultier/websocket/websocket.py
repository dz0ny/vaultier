from gevent import pywsgi
from django import setup
from rest_framework.exceptions import AuthenticationFailed
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.exceptions import WebSocketError

from accounts.business.authentication import TokenAuthentication


class ConnectedClient(object):
    def __init__(self, user_pk, ws):
        self.connection_list = []
        self.user_pk = user_pk
        self.connection_list.append(ws)

    def add_connection(self, ws):
        self.connection_list.append(ws)

    def del_connection(self, ws):
        self.connection_list.remove(ws)

    # iterate clients list of connections, send message to all
    def send(self, message):
        for x in self.connection_list:
            try:
                x.send(message)
            except WebSocketError:
                x.close()
                self.del_connection(x)


class WSApplication(object):
    def __init__(self):
        self.client_pool = {}

    def connection_handler(self, environ, start_response):
        if environ["PATH_INFO"] == '/':
            ws = environ["wsgi.websocket"]

            token = ws.environ['QUERY_STRING']
            token = token[6:]
            if not token:
                ws.close()
            a = TokenAuthentication()
            try:
                # authenticate token
                user, token = a.authenticate_token(token)
                # try to get client from pool
                curr_user = self.client_pool.get(user.pk)
                if curr_user:
                    curr_user.add_connection(ws)
                else:
                    client = ConnectedClient(user_pk=user.pk, ws=ws)
                    self.client_pool[user.pk] = client
                    curr_user = self.client_pool.get(user.pk)

                # endless loop to keep connection alive
                while True:
                    try:
                        message = ws.receive()
                    except WebSocketError:
                        curr_user.del_connection(ws)
                        if len(curr_user.connection_list) == 0:
                            del curr_user
                        break
                    curr_user.send(message)

            except AuthenticationFailed:
                # token failed authentication
                ws.close()


def main():
    setup()
    ws_application = WSApplication()
    server = pywsgi.WSGIServer(("", 8000), ws_application.connection_handler,
                               handler_class=WebSocketHandler)
    server.serve_forever()
