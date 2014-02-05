from vaultier.models.vault import Vault
from vaultier.models.version.handler import VersionHandler
from vaultier.models.version.model import Version
from vaultier.tools.changes import INSERT, post_change

def on_vault_created(signal=None, sender=None, instance=None, event_type=None, **kwargs):
    if event_type == INSERT:
        version = VersionHandler(Version(versioned=instance)).create_version(fields=['name', 'description'])
        version.save()

def register_signals():
    post_change.connect(on_vault_created, sender=Vault)

