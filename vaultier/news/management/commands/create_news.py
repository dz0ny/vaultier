import datetime
from django.core.management.base import BaseCommand
from news.business.news_puller import puller
from django.core.cache import cache
from random import randint


class Command(BaseCommand):
    args = '<news count>'
    help = 'Creates new dummy messages for testing'

    def handle(self, *args, **options):

        try:
            count = args[0]
        except IndexError:
            count = 3

        data = []
        for _ in xrange(0, count):
            data.append({
                'id': randint(0, 999),
                'text': 'Description Description Description Description '
                        'Description',
                'title': 'Needs to do an upgrade to newer version. '
                         'Then you have to reboot your server.',
                'link': 'https://vaultier.org/blog',
                'published_at': datetime.datetime.now()
            })
        cache.set(puller.DATA_KEY, data)
        self.stdout.write('News dummy data successfully created')
