from libs.tree.iterator import AbstractTreeIterator


class VaultTreeIterator(AbstractTreeIterator):

    def get_parent_object(self):
        return self.get_object().workspace

    def get_child_objects(self):
        return self.get_object().card_set.all()
