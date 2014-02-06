from vaultier.models.vault import Vault
from vaultier.models.version.handler import VersionHandler, register_handler, factory_handler
from vaultier.models.version.model import Version
from vaultier.tools.changes import INSERT, post_change

def callback(signal=None, sender=None, instance=None, event_type=None, **kwargs):
        oldstate = instance.old_changes().keys()
        prevstate = instance.previous_changes().keys()
        currstate = instance.changes().keys()
        pass

def register_signals():


    post_change.connect(callback, sender=Vault)

    #
    #register_handler(
    #    required_sender=Vault,
    #    required_fields=['description', 'name'],
    #    required_event_type=INSERT,
    #    handler_cls=VersionHandler
    #)

