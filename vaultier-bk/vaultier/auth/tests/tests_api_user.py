from django.test import TestCase

class AnimalTestCase(TestCase):
    def setUp(self):
        pass
        # Animal.objects.create(name="lion", sound="roar")
        # Animal.objects.create(name="cat", sound="meow")

    def test_animals_can_speak(self):
        self.assertEqual(1,1, 'Lion speaks')

        raise Exception('a')

        # """Animals that can speak are correctly identified"""
        # lion = Animal.objects.get(name="lion")
        # cat = Animal.objects.get(name="cat")
        # self.assertEqual(lion.speak(), 'The lion says "roar"')
        # self.assertEqual(cat.speak(), 'The cat says "meow"')