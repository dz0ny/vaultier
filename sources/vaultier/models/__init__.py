from vaultier.models.user.model import User
from vaultier.models.secret_blob.model import SecretBlob
from vault.model import Vault
from vaultier.models.slug.model import Slug
from vaultier.models.workspace.model import Workspace
from vaultier.models.secret.model import Secret
from vaultier.models.role.model import Role
from vaultier.models.token.model import Token
from vaultier.models.member.model import Member
from vaultier.models.card.model import Card
from vaultier.models.acl.model import Acl
from version.model import Version

# South introspections
from south.modelsinspector import add_introspection_rules

add_introspection_rules([], ["^vaultier\.models\.acl\.fields\.AclDirectionField"])
add_introspection_rules([], ["^vaultier\.models\.member\.fields\.MemberStatusField"])
add_introspection_rules([], ["^vaultier\.models\.role\.fields\.RoleLevelField"])
add_introspection_rules([], ["^vaultier\.models\.secret\.fields\.SecretTypeField"])
add_introspection_rules([], ["^modelext\.lowercasefield\.lowercasefield\.LowerCaseCharField"])
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
from vaultier.models.secret.model import register_signals as secret_register_signals

secret_register_signals()

#History signals
#from vaultier.models.version.signals import register_signals as version_register_signals
#version_register_signals()
