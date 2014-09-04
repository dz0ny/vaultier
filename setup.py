# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

setup(
    name="Vaultier",
    install_requires=[
        'BeautifulSoup==3.2.1',
        'Django==1.6',
        'South==0.8.4',
        'argparse==1.2.1',
        'cssutils==1.0',
        'django-filter==0.7',
        'djangorestframework==2.3.12',
        'flup==1.0.2',
        'gunicorn==18.0',
        'html2text==3.200.3',
        'jsonfield==0.9.20',
        'psycopg2==2.5.1',
        'pycrypto==2.6.1',
        'pynliner==0.5.0',
        'six==1.4.1',
        'wsgiref==0.1.2',
        'raven==5.0.0',
        'dealer==1.1.1'
    ],
    packages=find_packages(),
    author=u"rclick s.r.o.",
    author_email='info@rclick.cz',
    zip_safe=True,
    description="Vaultier project backend",
    version="0.6.5"
)