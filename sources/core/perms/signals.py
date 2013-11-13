from core.models.role import Role
from core.perms.materializer import CreateRoleMaterializer,  UpdateRoleLevelMaterializer
from core.tools.changes import post_change, INSERT, UPDATE


def on_role_created(signal=None, sender=None, instance=None, event_type=None):
    if event_type == INSERT:
        materializer = CreateRoleMaterializer(instance)
        materializer.materialize(instance.get_object())

def on_role_level_updated(signal=None, sender=None, instance=None, event_type=None):
    if event_type == UPDATE and instance.old_changes().get('level'):
        materializer = UpdateRoleLevelMaterializer(instance)
        materializer.materialize()




def register_signals():
    post_change.connect(on_role_created, sender=Role)
    post_change.connect(on_role_level_updated, sender=Role)