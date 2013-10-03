from django.db import models

class Workspace(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True)
    class Meta:
        db_table = u'workspace'


class Vault(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    # workspace = models.ForeignKey(Workspace)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = u'vault'

# class Card(models.Model):
#     id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=255, blank=True)
#     description = models.CharField(max_length=1024, blank=True)
#     vault = models.ForeignKey(Vault)
#     class Meta:
#         db_table = u'card'
#
#
# class User(models.Model):
#     id = models.IntegerField(primary_key=True)
#     nickname = models.CharField(max_length=255, blank=True)
#     email = models.CharField(max_length=4096)
#     is_active = models.IntegerField()
#     class Meta:
#         db_table = u'user'
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
