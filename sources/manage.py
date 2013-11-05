#!/usr/bin/env python
import os
import sys

#from pydev import pydevd
#pydevd.settrace('192.168.65.1', port=9999, stdoutToServer=True, stderrToServer=True)

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vaultier.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
