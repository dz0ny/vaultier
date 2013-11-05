
class TreeItemMixin(object):
    object = None

    def get_parent_object(self):
        raise RuntimeError('Please implement this method')

    def get_root_object(self):
        root = self
        o = root
        while o.get_parent_object():
            o = o.get_parent_object()
            root = o

        return root

