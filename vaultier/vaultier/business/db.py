from django.db import models
import datetime
import pytz


class TimestampableMixin(models.Model):
    """
    will add 'created_at' and 'updated_at' fields to model, which are filled
    when model is created or updated (in save method).
    """
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField(editable=False)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """
        Filling fields `created_at` and `updated_at`
        """
        now = datetime.datetime.utcnow().replace(tzinfo=pytz.utc)
        # Check if already exists or not
        if self.id:
            self.updated_at = now
        else:
            self.created_at = now
            self.updated_at = now

        return super(TimestampableMixin, self).save(*args, **kwargs)
