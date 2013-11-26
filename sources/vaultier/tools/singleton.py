class Singleton(object):
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(
                cls, *args, **kwargs)
        return cls._instance

from django.test.testcases import TestCase
class SingletonTest(TestCase):
    def test_singleton(self):

        class Bar(Singleton):
            test = None
            pass


        class Foo(Singleton):
            test = None
            pass

        b1 = Bar()
        b2 = Bar()

        b1.test = 'same'

        f = Foo()

        self.assertEqual(b1.test, b2.test)
        self.assertEqual(f.test, None)
