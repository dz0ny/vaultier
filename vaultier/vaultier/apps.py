from django.apps import AppConfig
from vaultier.signals import init_signals


class VaultierConfig(AppConfig):
    name = 'vaultier'
    verbose_name = 'Vaultier'

    def ready(self):
        init_signals()
