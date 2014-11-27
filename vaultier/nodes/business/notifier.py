from accounts.models import User
from vaultier.notifier import Message
from vaultier.notifier import Notifier


class NodeNotifier(Notifier):

    CHANNEL = 'nodes'

    TYPE_CREATED = 'CREATED'
    TYPE_MODIFIED = 'MODIFIED'
    TYPE_DELETED = 'DELETED'

    @classmethod
    def node_saved(cls, instance, **kwargs):
        """
        Node saved signal receiver. Publish message to all interested
        users by Notifier

        :param instance:
        :param kwargs:
        :return:
        """
        t = cls.TYPE_CREATED if kwargs.get('created') else cls.TYPE_MODIFIED
        data = {'id': instance.pk, 'type': t}
        message = Message(cls.CHANNEL, data)

        # todo: get only users in related to Node
        users = User.objects.all()
        for u in users:
            message.add_recipient(u.pk)

        cls().publish(message)

    @classmethod
    def node_delete(cls, instance, **kwargs):
        """
        Node pre delete signal receiver. Publish message to all interested
        users by Notifier

        :param instance:
        :param kwargs:
        :return:
        """

        message = Message(cls.CHANNEL, {'id': instance.pk,
                                        'type': cls.TYPE_DELETED})
        # todo: get only users in related to Node
        users = User.objects.all()
        for u in users:
            message.add_recipient(u.pk)

        cls().publish(message)
