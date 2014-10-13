from django.db import models


class AbstractTreeIterator(object):
    def __init__(self, object, *args, **kwargs):
        self.object = object
        super(AbstractTreeIterator, self).__init__(*args, **kwargs)

    def get_object(self):
        return self.object

    def get_child_objects(self):
        raise NotImplementedError

    def get_parent_object(self):
        raise NotImplementedError

    def get_root_object(self):
        root = self
        o = root
        while o.get_parent_object():
            o = o.get_parent_object()
            root = o

        return root


class TreeIterableModelMixin(models.Model):
    class Meta:
        abstract = True

    tree_iterator_class = AbstractTreeIterator

    _tree_iterator = None

    def get_tree_iterator(self):
        if not self._tree_iterator:
            self._tree_iterator = self.tree_iterator_class(self)
        return self._tree_iterator
