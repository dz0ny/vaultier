from vaultier.models.vault.model import Vault
from vaultier.models.version.handler import VersionHandler, register_handler_signal
from modelext.changes.changes import SOFT_DELETE


def register_signals():

    #def callback(signal=None, sender=None, instance=None, event_type=None, saved_values=None):
    #        pass
    #
    #post_change.connect(callback, sender=Vault, weak=False)

    #
    #register_handler_signal(
    #    required_sender=Vault,
    #    required_fields=['description', 'name'],
    #    required_event_type=UPDATE,
    #    handler_cls=VersionHandler
    #)

    register_handler_signal(
        required_sender=Vault,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        handler_cls=VersionHandler
    )
