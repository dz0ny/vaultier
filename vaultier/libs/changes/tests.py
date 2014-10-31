import collections
import types
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from libs.changes.changes import post_change, INSERT, UPDATE, DELETE
from libs.models import Garage


class ChangesMixinTest(TransactionTestCase):
    def assertDictEqual(self, d1, d2, msg=None):  # assertEqual uses for dicts
        for k, v1 in d1.iteritems():
            self.assertIn(k, d2, msg)
            v2 = d2[k]
            if (isinstance(v1, collections.Iterable) and
                    not isinstance(v1, basestring)):
                self.assertItemsEqual(v1, v2, msg)
            else:
                self.assertEqual(v1, v2, msg)
        return True

    def test_dirtiness(self):
        g = Garage(car1='skoda')

        # no dirty fields there
        v = g.dirty_values()
        self.assertEqual(0, len(v.keys()))

        #one dirty field should be there
        g.car2 = 'lada'
        v = g.dirty_values()
        self.assertDictEqual({'car2': ''}, v)

        #no dirty fields should be there
        g.save()
        v = g.dirty_values()
        self.assertDictEqual({}, v)

        #no dirty field should be there because we did not do any change
        g.car2 = 'lada'
        v = g.dirty_values()
        self.assertDictEqual({}, v)

        #one dirty field should be there because we did not do any change
        g.car2 = 'porche'
        v = g.dirty_values()
        self.assertDictEqual({'car2': 'lada'}, v)

    def test_previous(self):
        g = Garage(car1='skoda')
        g.save()

        # assert previous values
        v = g.previous_values()
        self.assertDictEqual({'car1': 'skoda', 'car2': '', 'id': None}, v)

        # assert overwritten values
        g.car2 = 'lada'
        g.save()
        v = g.overwritten_values()
        self.assertDictEqual({'car2': ''}, v)

    def test_signals(self):

        def on_change(sender=None, instance=None, overwritten_values=None,
                      event_type=None, **kwargs):
            self.signal_overwritten_values = overwritten_values
            self.signal_event_type = event_type
        post_change.connect(on_change, sender=Garage)

        g = Garage(car1='skoda')
        g.save()

        self.assertDictEqual({'id': None}, self.signal_overwritten_values)
        self.assertEquals(self.signal_event_type, INSERT)

        g.car1 = 'fiat'
        g.save()

        self.assertDictEqual({'car1': 'skoda'}, self.signal_overwritten_values)
        self.assertEquals(self.signal_event_type, UPDATE)

        g.delete()

        self.assertDictEqual({}, self.signal_overwritten_values)
        self.assertEquals(self.signal_event_type, DELETE)

    def test_hooks(self):

        g = Garage(car1='skoda')
        g.pre_save_hook = None
        g.post_change_hook = None

        def pre_save(self, **kwargs):
            self.pre_save_hook = 'ok'

        def post_change(self, **kwargs):
            self.post_change_hook = 'ok'

        g.on_pre_save = types.MethodType(pre_save, g)
        g.on_post_change = types.MethodType(post_change, g)

        g.save()
        self.assertEqual(g.post_change_hook, 'ok')
        self.assertEqual(g.pre_save_hook, 'ok')


def changes_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        ChangesMixinTest))
    return suite
