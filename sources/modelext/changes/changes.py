from django.dispatch import Signal


post_change = Signal()
"""
Signal sent whenever an instance is saved or deleted
and changes have been recorded.
"""

from django.db.models import signals

INSERT = 1
UPDATE = 2
DELETE = 3
SOFT_DELETE = 4


class ChangesMixin(object):
    _saved_values = {}
    _previous_values = {}
    _clean_values = {}
    _post_change_signal_disabled = 0

    def __init__(self, *args, **kwargs):
        super(ChangesMixin, self).__init__(*args, **kwargs)

        if (self.pk == None):
            # new
            self._clean_values = self._current_values()
            for k in self._clean_values: self._clean_values[k] = None
        else:
            # existing
            self._clean_values = self._current_values()
            self._save_state()

        def _post_save(sender, instance, **kwargs):
            instance._post_save(**kwargs)

        def _post_delete(sender, instance, **kwargs):
            instance._post_delete(**kwargs)

        signals.post_save.connect(
            _post_save,
            weak=False,
            sender=self.__class__,
            dispatch_uid='django-changes-%s' % self.__class__.__name__
        )
        signals.post_delete.connect(
            _post_delete,
            weak=False,
            sender=self.__class__,
            dispatch_uid='django-changes-%s' % self.__class__.__name__
        )

    def _compute_changed_field(self, current, previous):
        result = {}
        for key in current.keys():
            if (previous.has_key(key) and previous[key] != current[key]):
                result[key] = previous[key]

        return result
        #return dict([(key, (was, current[key])) for key, was in previous.iteritems() if was != current[key]])

    def _save_state(self):
        self._previous_values = self._clean_values
        self._clean_values = self._current_values()
        self._saved_values = self._compute_changed_field(self._clean_values, self._previous_values)

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
        saved_values = self._current_values();
        self._save_state();

        if self._post_change_signal_disabled==0:
            post_change.send(
                sender=self.__class__,
                instance=self,
                event_type=DELETE,
                saved_values=saved_values,
            )

    def _post_save(self, **kwargs):
        self._save_state();

        if self._post_change_signal_disabled==0:

            if kwargs.get('created'):
                event_type = INSERT
            else:
                event_type = UPDATE

            post_change.send(
                sender=self.__class__,
                instance=self,
                event_type=event_type,
                saved_values=self._saved_values,
            )

    def dirty_values(self):
        return self._compute_changed_field(self._current_values(), self._clean_values)

    def saved_values(self):
        return self._saved_values

    def previous_values(self):
        return self._previous_values

    def clean_values(self):
        return self._clean_values

    def set_post_change_signal_enabled(self, enabled):
        if (enabled):
            toadd = -1
        else:
            toadd = 1

        self._post_change_signal_disabled += toadd

        if (self._post_change_signal_disabled < 0):
            self._post_change_signal_disabled = 0;

