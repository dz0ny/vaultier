import os
import re
import time
import logging

from threading import Thread, Lock, current_thread
from Queue import Queue

from app import settings
from core.management.utils import NullConsole, ReadableError, is_outdated


class Compiler(object):
    def __init__(self, src_path=None, dest_path=None, src_mask=None,
                 num_threads=None, console=None):

        src_path = os.path.realpath(src_path or settings.EMBER_TPL_DIR)
        dest_path = os.path.realpath(dest_path or settings.EMBER_TPL_CMPDIR)

        if not os.access(src_path, os.R_OK):
            raise ReadableError('Compiler source path "%s" is not readable' % src_path)

        if not os.access(dest_path, os.W_OK):
            raise ReadableError('Compiler destination path "%s" is not writeable' % dest_path)

        self.src_dir = os.path.realpath(src_path)
        self.dest_dir = os.path.realpath(dest_path)

        if self.src_dir.endswith("/"):
            self.src_dir = self.src_dir[:-1]

        if self.dest_dir.endswith("/"):
            self.dest_dir = self.dest_dir[:-1]

        self.src_mask = re.compile(src_mask or settings.EMBER_TPL_MASK)
        self.threads = []
        self.queue = Queue()
        self.schedule = {}
        self.console = console or NullConsole()
        self.logger = logging.getLogger("vaultier_ember")

        num_threads = num_threads or 4

        for i in range(num_threads):
            thread = CompileWorker(self.queue, self.schedule, self.console)
            thread.setDaemon(True)
            thread.start()
            self.threads.append(thread)


    def check_source_path(self, path):
        path = os.path.realpath(path)
        if not path.startswith(self.src_dir):
            raise ReadableError('Path "%s" is outside of compiler.src_dir')


    def translate_path(self, src_path):
        src_path = os.path.realpath(src_path)
        dest_path = src_path[len(self.src_dir) + 1:]
        dest_path = os.path.join(self.dest_dir, dest_path)
        if os.path.splitext(src_path)[1]:
            dest_path = "%s.js" % os.path.splitext(dest_path)[0]
        return dest_path


    def cleanup(self):
        for root, dirs, files in os.walk(self.dest_dir, topdown=False):
            for file in files:
                os.remove(os.path.join(root, file))
            for dir in dirs:
                os.rmdir(os.path.join(root, dir))


    def build(self, src_path):
        self.check_source_path(src_path)

        dest_path = self.translate_path(src_path)
        if not is_outdated(src_path, dest_path):
            self.console.out("<color:yellow>Compiled<color:reset> %s" % dest_path.replace(self.dest_dir, ""))
            return

        if src_path not in self.schedule:
            self.schedule[src_path] = [0, Lock()]
        self.schedule[src_path][0] = time.time()

        msg = (src_path, dest_path, self.schedule[src_path][0])
        self.logger.debug('Enqueued "%s" --> %s @ %.5f' % msg)
        self.queue.put(msg)


    def add_path(self, src_path):
        if os.path.isfile(src_path) and not os.path.islink(src_path) and self.src_mask.search(src_path):
            self.logger.debug('path "%s" passed build()' % src_path)
            self.build(src_path)
        elif os.path.isdir(src_path):
            self.logger.debug('exploring dir "%s"' % src_path)
            for root, dirs, files in os.walk(src_path):
                for file in files:
                    self.add_path(os.path.join(root, file))
        self.logger.debug('path "%s" skipped' % src_path)

    def remove_path(self, src_path):
        self.check_source_path(src_path)

        dest_path = self.translate_path(src_path)
        if os.path.exists(dest_path):
            if os.path.isfile(dest_path) and not os.path.islink(dest_path) and self.src_mask.search(src_path):
                os.remove(dest_path)
            elif os.path.isdir(dest_path):
                for root, dirs, files in os.walk(dest_path, topdown=False):
                    for file in files:
                        os.remove(os.path.join(root, file))
                    for dir in dirs:
                        os.rmdir(os.path.join(root, dir))
                os.rmdir(dest_path)
            self.console.out('<color:green>Deleted<color:reset> %s' % dest_path.replace(self.dest_dir, ""))


    def terminate(self):
        for th in self.threads:
            self.logger.debug('Sending exit msg')
            self.queue.put(None)

        for th in self.threads:
            self.logger.debug('Joining %s' % th.name)
            th.join()

        self.console.out("Shutting down compiler...")
        # let if finish
        time.sleep(0.2)


class CompilerMock(object):
    stats = {}

    def hit(self, method, path):
        key = "%s-%s" % (method, path)
        self.stats[key] = self.stats.get(key, 0) + 1

    def stat(self, method, path):
        key = "%s-%s" % (method, path)
        return self.stats.get(key, 0)

    def add_path(self, path):
        self.hit("add_path", path)

    def remove_path(self, path):
        self.hit("remove_path", path)

    def terminate(self):
        pass


class CompileWorker(Thread):
    def __init__(self, queue, schedule, console):
        super(CompileWorker, self).__init__()

        self.thread = current_thread()
        self.queue = queue
        self.schedule = schedule
        self.console = console
        self.logger = logging.getLogger("django_ember")

    def handle(self, msg):
        self.logger.debug("Compile Worker got %s" % str(msg))
        if msg is None:
            self.logger.debug("Compile Worker terminated")
            return False

        src_path, dest_path, ts = msg
        short_path = os.path.relpath(dest_path)

        self.logger.debug("task: %s, %.10f < %.10f = %s" % (
        src_path, ts, self.schedule[src_path][0], ts < self.schedule[src_path][0]))
        if ts < self.schedule[src_path][0]:
            self.logger.debug('Compile task "%s" outdated. Skipped' % src_path)
            return False

        # lock on file writes
        with self.schedule[src_path][1]:
            dest_dir = os.path.dirname(dest_path)
            if not os.path.exists(dest_dir):
                os.makedirs(dest_dir)

            import subprocess
            cmd = 'ember-precompile '+src_path+' -b '+ os.path.normpath(settings.EMBER_TPL_DIR) + os.sep +' -f '+dest_path;
            subprocess.check_call(cmd,  stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=None, shell=True)

            stat = os.stat(src_path)
            os.utime(dest_path, (stat.st_atime, stat.st_mtime))

            self.logger.debug("Compile %s DONE" % src_path)
            self.console.out("<color:green>Compiled<color:reset> %s" % short_path)

        return True

    def run(self):
        self.logger.debug("Compile Worker started")
        while self.handle(self.queue.get()):
            # normal message
            self.queue.task_done()
            # exit message
        self.queue.task_done()
        self.logger.debug("Compile Worker exit")

