import redis
from django.conf import settings


def trigger_node_signal(sender, instance, **kwargs):
    r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT,
                          db=settings.REDIS_DB)
    r.publish("redischannel", instance.pk)
