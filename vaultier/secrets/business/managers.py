from django.db.models.loading import get_model
from django.db.models.manager import Manager
from acls.business.fields import AclLevelField
from libs.softdelete.softdelete import SoftDeleteManagerMixin


class SecretManager(SoftDeleteManagerMixin, Manager):

    def get_queryset(self):
        queryset = super(SecretManager, self).get_queryset()
        return queryset.filter(
            card__vault__workspace__deleted_at=None,
            card__vault__deleted_at=None,
            card__deleted_at=None,
        )

    def all_for_user(self, user):

        cards = get_model('cards', 'Card').objects.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        secrets = self.filter(
            card__in=cards
        )

        return secrets
