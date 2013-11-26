import os

__all__ = ['Observer', ]

try:
    from vaultier.management.observer.inotify import Observer
except ImportError:
    raise RuntimeError("Filesystem observing functionality is not available")


