from vaultier.models.slug.model import Slug

class RetrieveBySlugMixin(object):

    def get_object(self, *args, **kwargs):
        from modelext.slugify.model import SlugMixin
        pk = self.kwargs.get('pk')
        numeric = pk.isnumeric()
        if not numeric:
            try:
                o = Slug.objects.get(slug=pk)
                self.kwargs['pk'] = o.object_id
            except:
                pass
        return super(RetrieveBySlugMixin, self).get_object(*args, **kwargs)
