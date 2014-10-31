from libs.tree.iterator import AbstractTreeIterator


class CardTreeIterator(AbstractTreeIterator):

    def get_parent_object(self):
        return self.get_object().vault

    def get_child_objects(self):
        return []
