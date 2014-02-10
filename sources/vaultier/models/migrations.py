from south.modelsinspector import add_introspection_rules

add_introspection_rules([], ["^modelext\.lowercasefield\.lowercasefield\.LowerCaseCharField"])
add_introspection_rules([], ["^modelext\.version\.model\.VersionManipulatorIdrField"])

add_introspection_rules([], ["^vaultier\.models\.acl\.fields\.AclDirectionField"])
add_introspection_rules([], ["^vaultier\.models\.member\.fields\.MemberStatusField"])
add_introspection_rules([], ["^vaultier\.models\.role\.fields\.RoleLevelField"])
add_introspection_rules([], ["^vaultier\.models\.secret\.fields\.SecretTypeField"])
add_introspection_rules([], ["^vaultier\.models\.object_reference\.ObjectReferenceTypeField"])
