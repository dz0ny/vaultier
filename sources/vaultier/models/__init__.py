from user import User
from vaultier.models.secret_blob import SecretBlob
from vault.model import Vault
from vaultier.models.slug import Slug
from workspace import Workspace
from secret import Secret
from role import Role
from token import Token
from member import Member
from card import Card
from acl import Acl
from version.model import Version

# South introspections
from south.modelsinspector import add_introspection_rules

add_introspection_rules([], ["^vaultier\.models\.fields\.AclDirectionField"])
add_introspection_rules([], ["^vaultier\.models\.fields\.MemberStatusField"])
add_introspection_rules([], ["^vaultier\.models\.fields\.RoleLevelField"])
add_introspection_rules([], ["^vaultier\.models\.fields\.SecretTypeField"])
add_introspection_rules([], ["^vaultier\.models\.fields\.LowerCaseCharField"])
add_introspection_rules([], ["^vaultier\.models\.object_reference\.ObjectReferenceTypeField"])
add_introspection_rules([], ["^vaultier\.models\.version\.fields\.PythonClassField"])

#Perms signals registration
from vaultier.perms.signals import register_signals as perm_register_signals

perm_register_signals()

#Slugs signals registration
from modelext.slugify.model import register_signals as slug_register_signals

slug_register_signals(Slug, Workspace)
slug_register_signals(Slug, Vault)
slug_register_signals(Slug, Card)

#Secret signals registration
from vaultier.models.secret import register_signals as secret_register_signals

secret_register_signals()

#History signals
#from vaultier.models.version.signals import register_signals as version_register_signals
#version_register_signals()
