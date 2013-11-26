__author__ = 'jan'


class RoleSummarizer(object):

    def summarize_roles(self, roles):
        highest_level = None
        highest_role = None
        for role in roles:
            if (role.level > highest_level):
                highest_level = role.level
                highest_role = role

        return highest_role