from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.db.models.deletion import SET_NULL, PROTECT, CASCADE


class Workspace(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = u'vaultier_workspace'

class Vault(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = u'vaultier_vault'

class Card(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    vault = models.ForeignKey('core.Vault',  on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = u'vaultier_card'


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

class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'

    nickname = models.CharField(max_length=255, blank=False, null=False)
    public_key = models.CharField(max_length=1024, blank=True, null=True)
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
        db_table = u'vaultier_user'







#
# class Membership(models.Model):
#     id = models.IntegerField(primary_key=True)
#     crypted_key = models.TextField(blank=True)
#     role = models.IntegerField()
#     user = models.ForeignKey(User)
#     workspace = models.ForeignKey(Workspace, null=True, blank=True)
#     relation = models.IntegerField(null=True, blank=True)
#     vault = models.ForeignKey(Vault, null=True, blank=True)
#     card = models.ForeignKey(Card, null=True, blank=True)
#     class Meta:
#         db_table = u'membership'
#
# class Secret(models.Model):
#     id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=255, blank=True)
#     crypted_data = models.TextField(blank=True)
#     card = models.ForeignKey(Card)
#     class Meta:
#         db_table = u'secret'
