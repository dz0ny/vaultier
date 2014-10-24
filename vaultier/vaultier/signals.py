from acls.business.perms.signals import register_signals as \
    perm_register_signals
from slugs.models import Slug
from workspaces.models import Workspace
from vaults.models import Vault
from cards.models import Card
from libs.slugify.model import register_signals as slug_register_signals

from workspaces.business.version import register_signals as \
    workspace_register_version_signals
from vaults.business.version import register_signals as \
    vault_register_version_signals
from cards.business.version import register_signals as \
    card_register_version_signals
from secrets.business.version import register_signals as \
    secret_register_version_signals

from acls.models import register_signals as role_register_signals

from accounts.models import register_signals as lostkey_register_signals


def init_signals():
    # #################################################
    # Perms signals registration
    ##################################################
    perm_register_signals()
    ##################################################
    #Slugs signals registration
    ##################################################
    slug_register_signals(Slug, Workspace)
    slug_register_signals(Slug, Vault)
    slug_register_signals(Slug, Card)

    ##################################################
    # Versioning signals
    ##################################################
    workspace_register_version_signals()
    vault_register_version_signals()
    card_register_version_signals()
    secret_register_version_signals()
    ##################################################
    #Role custom signals
    ##################################################
    role_register_signals()
    ##################################################
    #LostKey custom signals
    ##################################################
    lostkey_register_signals()
