*********************
Vaultier Installation
*********************

=================================
Prerequisites (Recommended Setup)
=================================
.. note:: We list a configuration, that is known to work properly and it is an
    environment we run Vaultier ourselves in. On the other hand, Vaultier is
    built on top of Django, so many other deployment setups should work. At
    minimum, you should be able to use other databases (mysql, orcale), or
    deploy using other WSGI wrappers (for example gUnicorn).

* Ubuntu server 14.04 or Debian 7
* uWSGI
* Nginx web server
* posgressql database
* Python 2.7.5
* Supervisord for running background workers

==========================================
How Does the Target Installation Look Like
==========================================

If you follow this guide to the letter, you will end up with a running instance
of Vaultier (obviously), setup like this:

* Vaultier is installed in `/opt/vaultier`
* The process runs under newly created `vaultier` user and group
* PostgreSQL is the underlying database
* uWSGI runs the application
* Nginx is used as a proxy server to the application
* Redis is used for brokering background tasks
* Supervisord runs the background processes

Many aspects of this can be configured differently. However, for the time
being, let's say this is the only one supported, save maybe for different
installation directory.

If you opt to configure the system in any different manner, you will be on your
own.

==========================
Setting up the Environment
==========================

First thig to do is obviously creating the installation directory and a
virtualenv_. We're installing in the `/opt/vaultier` directory. Create it now::

    mkdir -p /opt/vaultier
    cd /opt/vaultier

You will need to install some system libraries, so that once we get to
installing Vaultier, it can build it's dependencies::

    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install python
    sudo apt-get install python-dev
    sudo apt-get install python-pip

Now, create your new virtual environment::

    virtualenv venv

Finally, activate the virtualenv::

    source /opt/vaultier/venv/bin/activate

This ensures that all required libraries and dependencies are installed in the
virtualenv, instead of your system, thereby not polluting your OS with
libraries that may not be in your package manager.

.. _virtualenv: http://virtualenv.readthedocs.org/

================
Install Vaultier
================

.. warning:: Make sure that your virtualenv is activated at this point. You can
    check this by running `which python`. The result should be:
    `/opt/vaultier/venv/bin/python`. If not, check the `source` command in
    previous chapter.

We're going to use Python's package manager `pip` to install Vaultier. It's as
easy as this::

    pip install vaultier

The command will take a while to complete, since it installs all the
dependencies of the project, as well as compiles few thigs here and there. Do
not worry, just let it run its course.

If anything goes wrong -- say you did not have some library installed -- you
can correct the problem and run the `pip install vaultier` command again
without any consequences.

.. attention:: Docs fixed up to here.


=============
Create a User
=============
We need to create a user for Vaultier, so using normal OS procedures::

    useradd -d /opt/vaultier -s /bin/bash vaultier
    passwd vaultier



==============
Prepare config
==============

::

    cp vaultier/vaultier/dev.py vaultier/vaultier/dev_whatever.py
    export DJANGO_SETTINGS_MODULE=vaultier.settings.dev_whatever
    mcedit sources/app/settings.py

If you name your dev config dev_<varible>.py, you won't deal with gitignore

================
Prepare database
================
::

    su - postgres
    psql
    # create user and db
    create user "vaultier" with password "vaultier";
    create database "vaultier" owner "vaultier";
    \c vaultier

    # grant
    grant all on all tables in schema public to "vaultier";
    CTRL+] or \q
    exit

    # migrate
    cd vaultier
    ./manage.py syncdb
    ./manage.py migrate


===============
Configure nginx
===============
::

    cp cfg/nginx.conf-dist cfg/nginx.conf
    mcedit cfg/nginx.conf

    sudo ln -s /opt/vaultier/cfg/nginx.conf /etc/nginx/sites-enabled/vaultier
    sudo chmod 0777 -R /var/opt/vaultier/run/
    chmod -R 755 /opt/vaultier/sources/static



=============
Test vaultier
=============
::


    ./bin/vaultier_start <virtual_env_>/bin/activate
    CTRL+C



===================
Install supervisord
===================
::

    sudo apt-get install supervisor
    cp cfg/supervisord.conf-dist /etc/supervisor/conf.d/vaultier.conf
    supervisorctl reread
    supervisorctl update
    supervisorctl status vaultier:
    /etc/init.d/nginx restart


==================
Start stop restart
==================
::

    /etc/init.d/nginx restart

    supervisorctl status vaultier:
    supervisorctl restart vaultier:

================================================
To allow user vaultier to start restart and stop
================================================
::

    create file /etc/sudoers.d/vaultier
    echo "" > /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier: >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier-garbage-collector >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier-garbage-collector >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier-garbage-collector >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier-garbage-collector >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier-celerybeat >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier-web >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier-web >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier-web >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier-web >> /etc/sudoers.d/vaultier
