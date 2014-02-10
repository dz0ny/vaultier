from vaultier.models.slug.model import Slug
from vaultier.models.workspace.model import Workspace
from vaultier.models.vault.model import Vault
from vaultier.models.card.model import Card


#Perms signals registration
from vaultier.perms.signals import register_signals as perm_register_signals
perm_register_signals()

#Slugs signals registration
from modelext.slugify.model import register_signals as slug_register_signals
slug_register_signals(Slug, Workspace)
slug_register_signals(Slug, Vault)
slug_register_signals(Slug, Card)

#Secret signals registration
from vaultier.models.secret.model import register_signals as secret_register_signals
secret_register_signals()

# History signals
from vaultier.models.vault.history import register_signals as vault_register_signals
from vaultier.models.card.history import register_signals as card_register_signals

vault_register_signals()
card_register_signals()
