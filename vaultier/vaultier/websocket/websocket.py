from gevent import pywsgi, sleep, spawn
from django import setup
from rest_framework.exceptions import AuthenticationFailed
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.exceptions import WebSocketError
import json
from accounts.business.authentication import TokenAuthentication
import redis
import re
from django.conf import settings


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
                        print message
                    except WebSocketError:
                        curr_user.del_connection(ws)
                        if len(curr_user.connection_list) == 0:
                            del curr_user
                        break
                    curr_user.send(message)

            except AuthenticationFailed:
                # token failed authentication
                ws.close()


def test(app, p):
    while True:
        msg = p.get_message()
        if msg:
            print msg
            try:
                data = msg['data']


                # subjects = data['subject']
                # subjects = msg['data']['subject']
                # str = eval(s)
                # str = json.loads(re.sub(r",\s*(\w+)", r", '\1'", re.sub(r"\{(\w+)", r"{'\1'", s)).replace("'", '"'))

                #todo: find out how to get the stringified non-dictionary something that redis send here into dictionary again


                for x, client in app.client_pool.items():
                    print x
                    try:
                        # todo: when we have usefull list of targets iterate over what would be clients from, if match, send msg
                        client.send(msg['data'])
                    except WebSocketError:
                        client.close()
                        app.del_connection(x)
            except TypeError:
                print "err"
        sleep(5)


def main():
    setup()
    r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT,
                          db=settings.REDIS_DB)
    p = r.pubsub()
    p.psubscribe("redischannel")

    ws_application = WSApplication()
    server = pywsgi.WSGIServer(("", 8000), ws_application.connection_handler,
                               handler_class=WebSocketHandler)
    spawn(test, ws_application, p)
    server.serve_forever()
