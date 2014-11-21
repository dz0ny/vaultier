import redis

from django.conf import settings

from accounts.models import User


def trigger_node_signal(sender, instance, **kwargs):
    r = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT,
                          db=settings.REDIS_DB)

    # todo: get only users in related to Node
    users = User.objects.all()
    clients = []
    for u in users:
        clients.append(u.pk)
        # created: True if created, False if modified
    message = {'clients': 'clients', 'subject': {'type': kwargs['created'],
                                               'node': instance.pk}}
    r.publish("redischannel", message)
