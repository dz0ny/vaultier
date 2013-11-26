#from django.db.models.signals import post_save
#from vaultier.models import Acl
#from vaultier.models.acl_fields import AclDirectionField
#from vaultier.perms.materializer import RoleMaterializer
#
#
#def _on_role_post_save(sender, instance, created, **kwargs):
#    if created and not instance.member.is_invitation():
#        materializer = RoleMaterializer(instance, instance.get_object())
#        acls = materializer.materialize()
#
#        saver = MaterializationSaver()
#        saver.save_materialized(acls)
#    if not created:
#        materializer = onRoleUpdateMaterializer(instance)
#        materializer.materialize()
#
#def _on_member_post_save(sender, instance, created, **kwargs):
#    if kwargs.get('update_fields', None):
#        member = instance
#        fields = kwargs.get('update_fields', [])
#        if fields.count('status') and not member.is_invitation():
#            acls = []
#            for role in member.role_set.all():
#                materializer = RoleMaterializer(member, member.get_object())
#                acls.extend(materializer.materialize())
#            saver = MaterializationSaver()
#            saver.save_materialized(acls)
#
#
#def _on_object_post_save(sender, instance, created, **kwargs):
#    if created:
#        materializer = OnObjectCreateMaterializer(instance)
#        acls = materializer.materialize()
#
#        saver = MaterializationSaver()
#        saver.save_materialized(acls)
#
#def register_materializers():
#
#    from vaultier.models.role import Role
#    post_save.connect(_on_role_post_save, sender=Role)
#
#    from vaultier.models.workspace import Workspace
#    post_save.connect(_on_object_post_save, sender=Workspace)
#
#    from vaultier.models.vault import Vault
#    post_save.connect(_on_object_post_save, sender=Vault)
#
#    from vaultier.models.card import Card
#    post_save.connect(_on_object_post_save, sender=Card)
#
#    from vaultier.models.member import Member
#    post_save.connect(_on_object_post_save, sender=Member)
#
#class onRoleUpdateMaterializer(object):
#    def __init__(self, role):
#        self.role = role
#
#    def materialize(self):
#        Acl.objects.filter(role=self.role, direction=AclDirectionField.DIR_DOWN).update(level=self.role.level)
#
#class OnObjectCreateMaterializer(object):
#    def __init__(self, object):
#        self.object = object
#
#    def get_parent(self):
#        object = self.object
#        if object.__class__.__name__ == 'Vault':
#            return object.workspace
#        if object.__class__.__name__ == 'Card':
#            return object.vault
#        return None
#
#    def materialize(self):
#        acls = []
#
#        # materialize parent roles, only in direction up to assure path to object will be available to users
#        roles = self.find_parent_roles();
#        for role in roles:
#            materializer = RoleMaterializer(role, role.get_object())
#            acls.extend(materializer.materialize(AclDirectionField.DIR_UP))
#
#        # materialize parent roles to current object and its children
#        for role in roles:
#            materializer = RoleMaterializer(role, self.object)
#            acls.extend(materializer.materialize(AclDirectionField.DIR_DOWN))
#
#        return acls
#
#
#    def find_parent_roles(self):
#        roles = []
#        roles.extend(self.object.role_set.all())
#
#        parent = self.get_parent()
#        if parent:
#            materializer = OnObjectCreateMaterializer(parent)
#            roles.extend(materializer.find_parent_roles())
#
#        return roles
#
#
#class MaterializationSaver(object):
#
#    def save_materialized(self, acls):
#        saved = []
#
#        # this should be optimized, not do million db queries
#        for acl in acls:
#            try:
#                existing = Acl.objects.get(
#                    role=acl.role,
#                    to_workspace=acl.to_workspace,
#                    to_vault=acl.to_vault,
#                    to_card=acl.to_card
#                )
#
#                # same acl found, so update existing, ignore same
#                if existing.level < acl.level:
#                    existing.level = acl.level
#                    existing.save()
#                    saved.append(existing)
#
#            except Acl.DoesNotExist:
#                # standard behaviour acl not found, so create new
#                acl.save()
#                saved.append(acl)
#
#            except Acl.MultipleObjectsReturned:
#                # more acl returned, this should not happen, so delete them and create new
#                Acl.objects.filter(
#                    role=acl.role,
#                    to_workspace=acl.to_workspace,
#                    to_vault=acl.to_vault,
#                    to_card=acl.to_card
#                ).delete()
#
#                acl.save()
#                saved.append(acl)

#register_materializers()