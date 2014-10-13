from django.db.models.manager import Manager
from django.db.models import Q
from acls.business.fields import AclLevelField
from libs.softdelete.softdelete import SoftDeleteManagerMixin


class CardManager(SoftDeleteManagerMixin, Manager):

    def get_queryset(self):
        queryset = super(CardManager, self).get_queryset()
        return queryset.filter(
            vault__workspace__deleted_at=None,
            vault__deleted_at=None,
        )

    def search(self, user, query, max_results=5):
        list = query.split()
        result = self.all_for_user(user).filter(
            Q(reduce(lambda x, y: x | y,
                     [Q(name__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y,
                     [Q(description__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y,
                     [Q(secret__name__icontains=word) for word in list]))
        ).order_by('updated_at')
        return result[:max_results]

    def all_for_user(self, user):
        cards = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return cards
