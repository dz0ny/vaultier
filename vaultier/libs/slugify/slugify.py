import re
from django.template.defaultfilters import slugify


def unique_slugify(
        value,
        queryset,
        instance=None,
        max_length=255,
        slug_field_name="slug",
        default_slug='slug',
        slug_separator='-'):

    # trim slug before
    try:
        value = value.strip()
    except:
        # cast to str only if value is not a unicode
        value = str(value).strip()

    # disallow empty slugs
    if value == '':
        value = default_slug

    # Sort out the initial slug, limiting its length if necessary.
    slug = slugify(value)

    # disable non numeric slug, not to confuse with pks
    num = unicode(slug).replace('-', '')
    if num.isnumeric():
        slug = 'n' + num

    if max_length:
        slug = slug[:max_length]
    slug = _slug_strip(slug, slug_separator)
    original_slug = slug

    if instance and instance.pk:
        queryset = queryset.exclude(pk=instance.pk)

    # Find a unique slug. If one matches, at '-2' to the end and try again
    # (then '-3', etc).
    next = 2
    while not slug or queryset.filter(**{slug_field_name: slug}):
        slug = original_slug
        end = '%s%s' % (slug_separator, next)
        if max_length and len(slug) + len(end) > max_length:
            slug = slug[:max_length - len(end)]
            slug = _slug_strip(slug, slug_separator)
        slug = '%s%s' % (slug, end)
        next += 1

    return slug


def _slug_strip(value, separator='-'):
    """
    Cleans up a slug by removing slug separator characters that occur at the
    beginning or end of a slug.

    If an alternate separator is used, it will also replace any instances of
    the default '-' separator with the new separator.
    """
    separator = separator or ''
    if separator == '-' or not separator:
        re_sep = '-'
    else:
        re_sep = '(?:-|%s)' % re.escape(separator)
        # Remove multiple instances and if an alternate separator is provided,
    # replace the default '-' separator.
    if separator != re_sep:
        value = re.sub('%s+' % re_sep, separator, value)
        # Remove separator from the beginning and end of the slug.
    if separator:
        if separator != '-':
            re_sep = re.escape(separator)
        value = re.sub(r'^%s+|%s+$' % (re_sep, re_sep), '', value)
    return value
