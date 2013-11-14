import os

__all__ = ['Observer', ]

try:
    from core.management.observer.inotify import Observer
except ImportError:
    raise RuntimeError("Filesystem observing functionality is not available")


