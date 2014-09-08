from south.modelsinspector import add_introspection_rules
add_introspection_rules([], ["^vaultier\.business\.fields\."
                             "ObjectReferenceTypeField"])
add_introspection_rules([], ["^acls\.business\.fields\.RoleLevelField"])
add_introspection_rules([], ["^libs\.lowercasefield\.lowercasefield\."
                             "LowerCaseCharField"])
add_introspection_rules([], ["^acls\.business\.fields\.AclDirectionField"])
add_introspection_rules([], ["^accounts\.business\.fields\.MemberStatusField"])
