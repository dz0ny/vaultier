from user import User
from workspace import Workspace
from secret import Secret
from role import Role
from token import Token
from member import Member
from vault import Vault
from card import Card
from acl import Acl

# South introspections
from south.modelsinspector import add_introspection_rules
add_introspection_rules([], ["^vaultier\.models\.acl_fields\.AclDirectionField"])
add_introspection_rules([], ["^vaultier\.models\.member_fields\.MemberStatusField"])
add_introspection_rules([], ["^vaultier\.models\.role_fields\.RoleLevelField"])
add_introspection_rules([], ["^vaultier\.models\.secret_fields\.SecretTypeField"])
add_introspection_rules([], ["^vaultier\.models\.object_reference\.ObjectReferenceTypeField"])

# Signals registration
from vaultier.perms.signals import register_signals
register_signals()