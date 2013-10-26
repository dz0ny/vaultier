from core.models import Acl
from core.models.acl_fields import AclLevelField, AclDirectionField

class OnRoleCreateMaterializer(object):
    role = None
    object = None

    def __init__(self, role, object):
        self.role = role
        self.object = object

    def acl_for_object(self, direction=None):
        if not self.role.member.user:
            raise RuntimeError(''
                               'Acl could be materialized upon conrete '
                               'member not invited one without user')

        acl = Acl()
        acl.role = self.role
        acl.direction = direction
        acl.user = self.role.member.user
        if direction == AclDirectionField.DIR_UP:
            acl.level = AclLevelField.LEVEL_READ
        else:
            acl.level = self.role.level

        object = self.object
        if object.__class__.__name__ == 'Workspace':
            acl.to_workspace = object
        elif object.__class__.__name__ == 'Vault':
            acl.to_vault = object
        elif object.__class__.__name__ == 'Card':
            acl.to_card = object
        else:
            raise RuntimeError('Usupported ACL object: ' + object.__class__.__name__)

        return acl

    def get_parent(self):
        object = self.object
        if object.__class__.__name__ == 'Vault':
            return object.workspace
        if object.__class__.__name__ == 'Card':
            return object.vault
        return None

    def get_childs(self):
        object = self.object
        if object.__class__.__name__ == 'Workspace':
            return object.vault_set.all()
        if object.__class__.__name__ == 'Vault':
            return object.card_set.all()
        return []

    def materialize(self, direction=None):
        acls = []

        # materialize current
        acls.append(self.acl_for_object(direction or AclDirectionField.DIR_UP))

        # materialize down
        if direction == None or direction == AclDirectionField.DIR_DOWN:
            childs = self.get_childs();
            for child in childs:
                materializer = OnRoleCreateMaterializer(self.role, child)
                acls.extend(materializer.materialize(AclDirectionField.DIR_DOWN))

        # materialize up
        if direction == None or direction == AclDirectionField.DIR_UP:
            parent = self.get_parent();
            if parent:
                materializer = OnRoleCreateMaterializer(self.role, parent)
                acls.append(materializer.materialize(AclDirectionField.DIR_UP))

        return acls

class MaterializerSaver(object):

    def save_materialized(self, acls):
        saved = []

        # this should be optimized, not do million db qieries
        for acl in acls:
            try:
                existing = Acl.objects.get(
                    role=acl.role,
                    to_workspace=acl.to_workspace,
                    to_vault=acl.to_vault,
                    to_card=acl.to_card
                )

                # same acl found, so update existing, ignore new
                existing.level = acl.level
                existing.direction = acl.direction
                existing.save()
                saved.append(existing)

            except Acl.DoesNotExist:
                # standard behaviour acl not found, so create new
                acl.save()
                saved.append(acl)

            except Acl.MultipleObjectsReturned:
                # more acl returned, this should not happen, so delete them and create new
                Acl.objects.filter(
                    role=acl.role,
                    to_workspace=acl.to_workspace,
                    to_vault=acl.to_vault,
                    to_card=acl.to_card
                ).delete()

                acl.save()
                saved.append(acl)

