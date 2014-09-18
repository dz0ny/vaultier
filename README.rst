Vaultier
========
Easy and secure password and credentials sharing across teams.

.. image:: http://git.rclick.cz/rclick/vaultier/raw/master/docs/images/vaultier-secret-small.png
    :alt: Storing secrets
    :align: center

.. image:: http://git.rclick.cz/rclick/vaultier/raw/master/docs/images/vaultier-team-small.png
    :alt: Collaborate with team
    :align: center

Main features
=============
* Store secrets, passwords, cc numbers, keys
* Share with others
* Changes history and redo
* Security based on strong encryption

Absolutely Secure
-----------------
We use advanced security based on RSA encryption. All your data stored in our databases are cyphered and cannot be readed by anybody else than you and your team.

Team Productivity
-----------------
Invite and colaborate with your team. You can selectively grant access permission to any team member to share credentials.

Cloud Solution
--------------
Vaultier is online. It is always available from web browser or mobile. No need to install, works out of the box

Get Vaultier
============
* Download `here <http://git.rclick.cz/rclick/vaultier/repository/archive.zip?ref=stable>`_
* `Install documentation <./docs/install.rst>`_

Contribute
==========
* Information how to contribute `here <./docs/contribute.rst>`_
* Changelog `here <./changelog.rst>`_


OS Dependencies
===============

Production
----------

You need these packages:

 * postgresql, postgresql-contrib
 * python, python-dev, python-pip

Therefore, on Ubuntu/Debian, run this::

    sudo apt-get install postgresql postgresql-contrib python python-dev python-pip

Also, virtualenv is recommended, as per usual.

Development and testing
-----------------------

For development and running tests, we're using sqlite3::

    sudo apt-get install sqlite3 libsqlite3-dev


Development with Ember compilation
----------------------------------
Install nodejs from http://ariejan.net/2011/10/24/installing-node-js-and-npm-on-ubuntu-debian/ ::

    sudo apt-get install nodejs-legacy

Then, install nodejs package system npm::

    curl https://npmjs.org/install.sh | sudo sh

And last, you need to install ember-precompile Node package::

    sudo npm install -g ember-precompile
