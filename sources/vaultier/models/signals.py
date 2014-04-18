##################################################
#Perms signals registration
##################################################
from vaultier.perms.signals import register_signals as perm_register_signals
perm_register_signals()

##################################################
#Slugs signals registration
##################################################
from vaultier.models.slug.model import Slug
from vaultier.models.workspace.model import Workspace
from vaultier.models.vault.model import Vault
from vaultier.models.card.model import Card
from modelext.slugify.model import register_signals as slug_register_signals
slug_register_signals(Slug, Workspace)
slug_register_signals(Slug, Vault)
slug_register_signals(Slug, Card)

##################################################
# Versioning signals
##################################################
from vaultier.models.workspace.version import register_signals as workspace_register_version_signals
from vaultier.models.vault.version import register_signals as vault_register_version_signals
from vaultier.models.card.version import register_signals as card_register_version_signals
from vaultier.models.secret.version import register_signals as secret_register_version_signals

workspace_register_version_signals()
vault_register_version_signals()
card_register_version_signals()
secret_register_version_signals()

##################################################
#Role custom singals
##################################################
from vaultier.models.role.model import register_signals as role_register_signals
role_register_signals()
