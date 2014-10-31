##################################################
#Perms signals registration
##################################################
from acls.business.perms.signals import register_signals as \
    perm_register_signals
perm_register_signals()

##################################################
#Slugs signals registration
##################################################
from slugs.models import Slug
from workspaces.models import Workspace
from vaults.models import Vault
from cards.models import Card
from libs.slugify.model import register_signals as slug_register_signals
slug_register_signals(Slug, Workspace)
slug_register_signals(Slug, Vault)
slug_register_signals(Slug, Card)

##################################################
# Versioning signals
##################################################
from workspaces.business.version import register_signals as \
    workspace_register_version_signals
from vaults.business.version import register_signals as \
    vault_register_version_signals
from cards.business.version import register_signals as \
    card_register_version_signals
from secrets.business.version import register_signals as \
    secret_register_version_signals

workspace_register_version_signals()
vault_register_version_signals()
card_register_version_signals()
secret_register_version_signals()

##################################################
#Role custom signals
##################################################
from acls.models import register_signals as role_register_signals
role_register_signals()

##################################################
#LostKey custom signals
##################################################
from accounts.models import register_signals as lostkey_register_signals
lostkey_register_signals()
