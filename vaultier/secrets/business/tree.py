from libs.tree.iterator import AbstractTreeIterator


class SecretTreeIterator(AbstractTreeIterator):

    def get_parent_object(self):
        return self.get_object().card

    def get_child_objects(self):
        return []
