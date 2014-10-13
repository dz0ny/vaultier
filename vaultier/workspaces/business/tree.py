from libs.tree.iterator import AbstractTreeIterator


class WorkspaceTreeIterator(AbstractTreeIterator):

    def get_parent_object(self):
        return None

    def get_child_objects(self):
        return self.get_object().vault_set.all()
