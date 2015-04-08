from django.contrib.auth.models import AbstractBaseUser
from django.db.models.fields import CharField, BooleanField

from vaultier.utils.lib.changes.changes import ChangesMixin
from vaultier.utils.lib.lowercasefield.lowercasefield import LowerCaseCharField
from vaultier.auth.models.user.manager import UserManager


class User(ChangesMixin, AbstractBaseUser):
    nickname = CharField(max_length=255, blank=False, null=False)
    public_key = CharField(max_length=1024)
    email = LowerCaseCharField(max_length=255, unique=True)
    is_active = BooleanField(default=True)
    is_superuser = BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    def save(self, *args, **kwargs):
        # first user created is super user
        if (self.pk == None):
            if not User.objects.count():
                self.is_superuser = True

        return super(User, self).save(*args, **kwargs)


    class Meta:
        db_table = u'vaultier_user'
        app_label = 'vaultier_auth'