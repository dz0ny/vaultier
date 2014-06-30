from django import template


register = template.Library()

@register.filter(name='get_by_key')
def get_by_key(dictionary, key):
    """
    Gets a dictionary and a key, return the value under
    that given key in the dictionary.
    :param dictionary:
    :param key:
    :return:
    """
    return dictionary.get(key)
