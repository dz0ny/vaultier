from django.dispatch import Signal

post_change = Signal()
"""
Signal sent whenever an instance is saved or deleted
and changes have been recorded.

signal receiver should be following:
def on_change(
    sender=None,
    instance=None,
    overwritten_values=None,
    event_type=None,
    **kwargs
)
"""


from django.db.models import signals

INSERT = 10
UPDATE = 20
DELETE = 30
SOFT_DELETE = 40


class ChangesMixin(object):
    """
    Mixin could be used on models to get access to model lifecycle.
    Generally mixin provides:
     - dirtiness
     - access to overwritten values by latest save/delete call
     - signal when change happen
     - hooks on model to simplify code base

    Example model to use ChangesMixin
        class Garage(ChangesMixin, models.Model):
            class Meta:
                db_table = u'garage'

            car1 = models.CharField(max_length=255, default='')
            car2 = models.CharField(max_length=255, default='')

            def on_post_change(self, sender=None,instance=None,
                    overwritten_values=None,event_type=None,**kwargs):
                raise 'this is called when change happen'

            def on_pre_save(self, sender=None,instance=None**kwargs):
                raise 'this is called when pre_save happen'

     Example to for connect signal

        def on_change(self, sender=None,instance=None,overwritten_values=None,
                      event_type=None,**kwargs):
            // do something here
            pass

        post_change.connect(on_change, sender=Garage)

    Description of lifecycle
        self.dirty_values()  - return dict of clean values before changed
            locally
        self.previous_values() - return dict of values before latest safe
        self.clean_values() - return dict of values when new model was created
            or persisted model hydrated
        self.current_values() - return dict of current values


    """
    _overwritten_values = {}
    _previous_values = {}
    _clean_values = {}
    _post_change_signal_disabled = 0

    def __init__(self, *args, **kwargs):
        super(ChangesMixin, self).__init__(*args, **kwargs)

        if self.pk is None:
            # new
            self._clean_values = self._current_values()
        else:
            # existing
            self._clean_values = self._current_values()
            self._save_state()

        def _post_save(sender, instance, **kwargs):
            instance._post_save(**kwargs)

        def _post_delete(sender, instance, **kwargs):
            instance._post_delete(**kwargs)

        def _pre_save(sender, instance, **kwargs):
            try:
                getattr(instance, 'on_pre_save')
                exist = True
            except:
                exist = False
            if exist:
                instance.on_pre_save(sender=sender, instance=instance,
                                     **kwargs)

        signals.pre_save.connect(
            _pre_save,
            weak=False,
            sender=self.__class__,
            dispatch_uid='django-changes-pre-save-{}'.format(
                self.__class__.__name__)
        )

        signals.post_save.connect(
            _post_save,
            weak=False,
            sender=self.__class__,
            dispatch_uid='django-changes-post-save-{}'.format(
                self.__class__.__name__)
        )
        signals.post_delete.connect(
            _post_delete,
            weak=False,
            sender=self.__class__,
            dispatch_uid='django-changes-post-delete-{}'.format(
                self.__class__.__name__)
        )

    def _compute_changed_fields(self, current, previous):
        result = {}
        for key in current.keys():
            if key in previous and previous[key] is not current[key]:
                result[key] = previous[key]

        return result

    def _save_state(self):
        self._previous_values = self._clean_values
        self._clean_values = self._current_values()
        self._overwritten_values = self._compute_changed_fields(
            self._clean_values, self._previous_values)

    def _current_values(self):
        """
        Returns a ``field -> value`` dict of the current state of the instance.
        """
        field_names = set()
        [field_names.add(f.name) for f in self._meta.local_fields]
        [field_names.add(f.attname) for f in self._meta.local_fields]

        dict = {}
        for field_name in field_names:
            try:
                dict[field_name] = getattr(self, field_name)
            except:
                pass

        return dict

    def _post_delete(self, **kwargs):
        overwritten_values = self._current_values()
        self._save_state()

        if self._post_change_signal_disabled == 0:
            post_change.send(
                sender=self.__class__,
                instance=self,
                event_type=DELETE,
                overwritten_values=overwritten_values,
            )

    def _fire_post_change(self, sender=None, instance=None, event_type=None,
                          overwritten_values=None):
        exist = False
        try:
            getattr(self, 'on_post_change')
            exist = True
        except:
            exist = False

        if exist:
            self.on_post_change(
                sender=sender,
                instance=instance,
                event_type=event_type,
                overwritten_values=overwritten_values
            )

        post_change.send(
            sender=sender,
            instance=instance,
            event_type=event_type,
            overwritten_values=overwritten_values
        )

    def _post_save(self, **kwargs):
        self._save_state()

        if self._post_change_signal_disabled == 0:

            if kwargs.get('created'):
                event_type = INSERT
            else:
                event_type = UPDATE

            self._fire_post_change(
                sender=self.__class__,
                instance=self,
                event_type=event_type,
                overwritten_values=self._overwritten_values
            )

    def dirty_values(self):
        return self._compute_changed_fields(self._current_values(),
                                            self._clean_values)

    def overwritten_values(self):
        return self._overwritten_values

    def previous_values(self):
        return self._previous_values

    def clean_values(self):
        return self._clean_values

    def set_post_change_signal_enabled(self, enabled):
        if enabled:
            toadd = -1
        else:
            toadd = 1

        self._post_change_signal_disabled += toadd

        if self._post_change_signal_disabled < 0:
            self._post_change_signal_disabled = 0
