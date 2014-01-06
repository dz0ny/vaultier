from vaultier.models.card import Card
from vaultier.models.member import Member
from vaultier.models.role import Role
from vaultier.models.secret import Secret
from vaultier.models.vault import Vault
from vaultier.perms.materializer import CreateRoleMaterializer, UpdateRoleLevelMaterializer, UpdateRoleMemberMaterializer, UpdateMemberUserMaterializer, InsertedObjectMaterializer, MovedObjectMaterializer
from vaultier.tools.changes import post_change, INSERT, UPDATE


# when role is created and member has related user
def on_role_created(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == INSERT and instance.member.user:
        materializer = CreateRoleMaterializer(instance)
        materializer.materialize(instance.get_object())

# when role level is updated
def on_role_level_updated(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == UPDATE and instance.old_changes().get('level'):
        materializer = UpdateRoleLevelMaterializer(instance)
        materializer.materialize()

# when member of role is updated
def on_role_member_updated(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == UPDATE and instance.old_changes().get('member') and instance.member.user:
        materializer = UpdateRoleMemberMaterializer(instance)
        materializer.materialize()

# when invited member becames regular member
def on_member_is_regular(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == UPDATE and instance.old_changes().get('user') and instance.user:
        materializer = UpdateMemberUserMaterializer(instance)
        materializer.materialize()

# when new object is inserted parent acls are inherited
def on_object_inserted(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == INSERT:
        materializer = InsertedObjectMaterializer(instance)

        # materialize CREATE roles
        materializer.materialize_role()

        # materialize acl
        materializer.materialize()


# when object is moved (parent id is changed)
#@todo:disallow moving of vaults
def on_object_moved(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if (event_type == UPDATE):
        materializer = None
        n = instance.__class__.__name__
        c = instance.changes()
        o = instance.old_changes()
        p = instance.previous_changes()
        os = instance.old_state()
        ps = instance.previous_state()

        if ( instance.__class__.__name__ == 'Card' and instance.old_changes().get('vault')):
            materializer = MovedObjectMaterializer(instance);
        if (instance.__class__.__name__ == 'Secret' and instance.old_changes().get('card')):
            materializer = MovedObjectMaterializer(instance.card);

        if materializer:
            materializer.materialize()


def register_signals():
    post_change.connect(on_role_created, sender=Role)
    post_change.connect(on_role_level_updated, sender=Role)
    post_change.connect(on_role_member_updated, sender=Role)
    post_change.connect(on_member_is_regular, sender=Member)

    post_change.connect(on_object_inserted, sender=Vault)
    post_change.connect(on_object_inserted, sender=Card)

    post_change.connect(on_object_moved, sender=Card)
    post_change.connect(on_object_moved, sender=Secret)

