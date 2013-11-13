from core.models.role import Role
from core.perms.materializer import RoleMaterializer, MaterializationSaver
from core.tools.changes import post_change, INSERT

def on_role_created(signal=None, sender=None, instance=None, event_type=None):
    if event_type == INSERT:
        materializer = RoleMaterializer(instance)
        acls = materializer.materialize(instance.get_object())

        saver = MaterializationSaver()
        saver.save_materialized(acls)


def register_signals():
    post_change.connect(on_role_created, sender=Role)