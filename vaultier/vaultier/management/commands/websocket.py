import re
import socket
from django.core.management import BaseCommand, CommandError
from django.utils import autoreload
from optparse import make_option
from vaultier.notifier.websocket import run
from django.conf import settings
from datetime import datetime
from django.utils.encoding import get_system_encoding
import pkg_resources


naiveip_re = re.compile(r"""^(?:
(?P<addr>
    (?P<ipv4>\d{1,3}(?:\.\d{1,3}){3}) |         # IPv4 address
    (?P<ipv6>\[[a-fA-F0-9:]+\]) |               # IPv6 address
    (?P<fqdn>[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*) # FQDN
):)?(?P<port>\d+)$""", re.X)
DEFAULT_PORT = "9000"


class Command(BaseCommand):

    option_list = BaseCommand.option_list + (
        make_option('--ipv6', '-6', action='store_true', dest='use_ipv6', default=False,
            help='Tells Django to use an IPv6 address.'),
        make_option('--noreload', action='store_false', dest='use_reloader', default=True,
            help='Tells Django to NOT use the auto-reloader.'),
    )
    help = "Starts Websocket server for development."
    args = '[optional port number, or ipaddr:port]'

    def handle(self, addrport='', *args, **options):
        self.use_ipv6 = options.get('use_ipv6')
        if self.use_ipv6 and not socket.has_ipv6:
            raise CommandError('Your Python does not support IPv6.')
        if args:
            raise CommandError('Usage is runserver %s' % self.args)
        self._raw_ipv6 = False
        if not addrport:
            self.addr = ''
            self.port = DEFAULT_PORT
        else:
            m = re.match(naiveip_re, addrport)
            if m is None:
                raise CommandError('"%s" is not a valid port number '
                                   'or address:port pair.' % addrport)
            self.addr, _ipv4, _ipv6, _fqdn, self.port = m.groups()
            if not self.port.isdigit():
                raise CommandError("%r is not a valid port number." % self.port)
            if self.addr:
                if _ipv6:
                    self.addr = self.addr[1:-1]
                    self.use_ipv6 = True
                    self._raw_ipv6 = True
                elif self.use_ipv6 and not _fqdn:
                    raise CommandError('"%s" is not a valid IPv6 address.' % self.addr)
        if not self.addr:
            self.addr = '::1' if self.use_ipv6 else '127.0.0.1'
            self._raw_ipv6 = bool(self.use_ipv6)
        self.run(*args, **options)

    def run(self, *args, **options):
        """
        Runs the server, using the autoreloader if needed
        """
        use_reloader = options.get('use_reloader')

        if use_reloader:
            autoreload.main(self.inner_run, args, options)
        else:
            self.inner_run(*args, **options)

    def inner_run(self, *args, **options):
        """
        Call run method in notifier websocket

        :param args:
        :param options:
        :return:
        """
        now = datetime.now().strftime('%B %d, %Y - %X')
        now = now.decode(get_system_encoding())
        self.stdout.write((
            "%(started_at)s\n"
            "Django version %(version)s, Vaultier version %(vaultier)s,  using settings %(settings)r\n"
            "Starting development server at ws://%(addr)s:%(port)s/\n\n"
        ) % {
            "started_at": now,
            "version": self.get_version(),
            "settings": settings.SETTINGS_MODULE,
            "addr": '[%s]' % self.addr if self._raw_ipv6 else self.addr,
            "port": self.port,
            "vaultier": pkg_resources.get_distribution("Vaultier").version,
        })
        run(self.addr, int(self.port))
