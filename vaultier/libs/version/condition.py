from libs.version.context import version_context_manager


class BasicCondition(object):
    def will_do_version(
            self, signal=None, sender=None, instance=None, event_type=None,
            overwritten_values=None, **kwargs):
        return version_context_manager.get_enabled()


class RequiredFieldEventCondition(BasicCondition):
    required_sender = None
    required_event = None
    required_fields = None

    def __init__(self, required_fields=[], required_event=None,
                 required_sender=None, *args, **kwargs):
        self.required_fields = required_fields
        self.required_event = required_event
        self.required_sender = required_sender

    def will_do_version(
            self, signal=None, sender=None, instance=None, event_type=None,
            overwritten_values=None, **kwargs):
        basic = super(RequiredFieldEventCondition, self).will_do_version(
            signal=signal,
            sender=sender,
            instance=instance,
            event_type=event_type,
            overwritten_values=overwritten_values,
            **kwargs
        )

        if basic \
            and event_type == self.required_event \
                and sender == self.required_sender:

            saved_keys = overwritten_values.keys()
            do_save = False
            intersection = {}
            if self.required_fields:
                if set(saved_keys).intersection(self.required_fields):
                    do_save = True
                    # required fields specified, intersection only
                    # required fields
                    for saved_key in saved_keys:
                        if saved_key in self.required_fields:
                            intersection[saved_key] = \
                                overwritten_values[saved_key]
            else:
                # no required fields specifed, intersection is whole save state
                do_save = True
                intersection = overwritten_values

            if do_save:
                return intersection

        return None
