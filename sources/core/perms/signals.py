from core.models.card import Card
from core.models.member import Member
from core.models.role import Role
from core.models.vault import Vault
from core.perms.materializer import CreateRoleMaterializer,  UpdateRoleLevelMaterializer, UpdateRoleMemberMaterializer, UpdateMemberUserMaterializer, InsertedObjectMaterializer
from core.tools.changes import post_change, INSERT, UPDATE


# when role is created and member has related user
def on_role_created(signal=None, sender=None, instance=None, event_type=None):
    if event_type == INSERT and instance.member.user:
        materializer = CreateRoleMaterializer(instance)
        materializer.materialize(instance.get_object())

# when role level is updated
def on_role_level_updated(signal=None, sender=None, instance=None, event_type=None):
    if event_type == UPDATE and instance.old_changes().get('level'):
        materializer = UpdateRoleLevelMaterializer(instance)
        materializer.materialize()

# when role member is updated
def on_role_member_updated(signal=None, sender=None, instance=None, event_type=None):
    if event_type == UPDATE and instance.old_changes().get('member') and instance.member.user:
        materializer = UpdateRoleMemberMaterializer(instance)
        materializer.materialize()

# when invited member becames regular member
def on_member_is_regular(signal=None, sender=None, instance=None, event_type=None):
    if event_type == UPDATE and instance.old_changes().get('user') and instance.user:
        materializer = UpdateMemberUserMaterializer(instance)
        materializer.materialize()

# when new object is inserted parent acls are inherited
def on_object_inserted(signal=None, sender=None, instance=None, event_type=None):
    if event_type == INSERT:
        materializer = InsertedObjectMaterializer(instance)
        materializer.materialize()


def register_signals():
    post_change.connect(on_role_created, sender=Role)
    post_change.connect(on_role_level_updated, sender=Role)
    post_change.connect(on_role_member_updated, sender=Role)
    post_change.connect(on_member_is_regular, sender=Member)

    post_change.connect(on_object_inserted, sender=Vault)
    post_change.connect(on_object_inserted, sender=Card)