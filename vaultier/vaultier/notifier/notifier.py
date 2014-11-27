import logging
import redis
import json
from django.conf import settings
import gevent


class Message(object):

    def __init__(self, channel, message, recipients=None):

        self.channel = channel
        self.message = message
        if not recipients:
            recipients = []
        self.recipients = recipients

    def add_recipient(self, user_id):
        """
        Add user to recipients list

        :param user_id:
        :return:
        """
        self.recipients.append(user_id)
        return self

    def to_json(self, public=True):
        """
        Convert message object to json

        :return:
        """

        data = self.__dict__
        if public:
            del data['recipients']
        return json.dumps(data)

    @classmethod
    def from_json(cls, data, public=True):
        """
        Create new instance from json

        :param data:
        :param public:
        :return:
        """
        data = json.loads(data)
        channel = data.get('channel')
        message = data.get('message')
        if not public:
            recipients = data.get('recipients')
        else:
            recipients = None
        return cls(channel, message, recipients)

    def __str__(self):
        return "#{} :: {}".format(self.channel, self.message)

    def __unicode__(self):
        return self.__str__()


class Notifier(object):

    _redis = None
    _channel = None
    _logger = None

    def __init__(self, *args, **kwargs):
        self._logger = logging.getLogger('notifier')
        redis_host = kwargs.pop('redis_host', settings.REDIS_HOST)
        redis_port = kwargs.pop('redis_port', settings.REDIS_PORT)
        redis_db = kwargs.pop('redis_db', settings.REDIS_DB)

        self._redis = redis.StrictRedis(host=redis_host, port=redis_port,
                                        db=redis_db)
        self._channel = kwargs.pop('channel', 'notifier')
        self._logger.info("Connected to redis {}:{} Db: {}".format(
            redis_host, redis_port, redis_db))

    def publish(self, message):
        """
        Publish message to gien channel using Redis pubsub

        :param message:
        :return:
        """
        self._logger.debug("Publishing message: {}".format(self._channel, message.message))
        self._redis.publish(self._channel, message.to_json(public=False))

    def subscribe(self, *args):
        """
        Subscribe on given channel to

        :param args: function
        :return:
        """
        s = self._redis.pubsub()
        s.subscribe(self._channel)
        self._logger.info("Subscribed to channel {}".format(self._channel))
        while True:
            try:
                msg = s.get_message(ignore_subscribe_messages=True)
                if msg:
                    message = Message.from_json(msg['data'], False)

                    for f in args:
                        f(message)
            except (KeyError, TypeError, ValueError) as e:
                msg = msg or ''
                self._logger.error("Message {} is malformed: {}".format(msg, str(e)))
            gevent.sleep()