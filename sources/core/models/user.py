from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from time import timezone
from core.tools.changes import ChangesMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = UserManager.normalize_email(email)
        user = self.model(username=username, email=email,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        u = self.create_user(username, email, password, **extra_fields)
        u.is_staff = True
        u.is_active = True
        u.is_superuser = True
        u.save(using=self._db)
        return u


class User(ChangesMixin, AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'

    nickname = models.CharField(max_length=255, blank=False, null=False)
    public_key = models.CharField(max_length=1024)
    email = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField('staff status',
                                   default=False,
                                   help_text='Designates whether the user can log into this admin site.'
    )
    is_active = models.BooleanField('active',
                                    default=True,
                                    help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.'
    )

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    objects = UserManager()

    class Meta:
        app_label= 'core'
        db_table = u'vaultier_user'
