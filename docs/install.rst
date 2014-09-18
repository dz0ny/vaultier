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

You will need to install some system libraries and software, so that once we
get to installing Vaultier, it can build it's dependencies. Also, we need tools
for deployment (Nginx, uWSGI and Supervisord)::

    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install nginx
    sudo apt-get install supervisord
    sudo apt-get install uwsgi
    sudo apt-get install python
    sudo apt-get install python-virtualenv
    sudo apt-get install python-dev


Chances are that some if not all of those things are on your system already.

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

===========================
Create a Configuration File
===========================

With everything installed, you can now create your setting file, where you can
fine-tune Vaultier configuration. To do this, change to the `/opt/vaultier`
directory. You will be prompted for two basic questions, the |FQDN| where you
plan to host the project, and the database type (PostgreSQL is recommended)::

    vaultier init

You can optionally specify a path to the setting file, if you wish to place
it elsewhere, like this::

    vaultier init /path/to/vaultier.conf.py


The command will create a file of name `vaultier.conf.py` by default. You can
change all settings in there (and all others supported by Django). The answers
you were asked for are used to generate settings in the configuration file, so
you don't have to deal with them manually, but you are able to change them of
course.

.. |FQDN| replace:: fully qualified domain name


=============================
Check and Update the Settings
=============================

Wherever you created the `vaultier.conf.py` file, you should now open it and
inspect it's contents. What you can configure:

*RAVEN_CONFIG*
  If you opt to use Sentry for monitoring your instance for _backend_ errors,
  you can set the DSN here

*ALLOWED_HOSTS*
  Set a list of domains, where the app will run. This should be preconfigured
  for you, if you filled in the FQDN during the `vaultier init` step.
  Otherwise, you will see an `www.example.com` entry that you should change to
  whatever your FQDN is.

*FT_FEATURES*
  This is a dictionary, in which you see the `raven_key` entry, set to empty
  string. Again, you can set this to your Sentry DSN, if you want to monitor
  _frontend_ errors

*DATABASES*
  Fill out the connection details for your DB. You should focus on _NAME_,
  _USER_, _PASSWORD_, _HOST_ and _PORT_ settings, the engine will be prefilled
  for you based on your answer during the `vaultier init` step.

*SITE_URL*
  Similarly to *ALLOWED_HOSTS*, this should list the full path to your Vaultier
  instance including protocol and shoul be prefilled. If you see
  `https://www.example.com`, then you need to adjust this accordingly.

*EMAIL_<key>*
 This configures settings to your mail server, which you should set up
 accordingly. Vaultier relies on sending invitations and such, so this is
 needed for production setup


==========================
Finish Up the Installation
==========================

Once you are done with configuration, you need to check that everything is set
up correctly, to do this, first run this command::

    vaultier check

There should be no output. If that is the case, the check succeeded. Next, try
to login to your database to verify, that your DB connection settings are
correct::

    vaultier dbshell

If you successfully connect, you are set to go. Otherwise, you may see an error
indicating that your DB settings are incorrect. Fix them and try again.
To exit the PostgreSQL shell, type `\q`.

Now, the only thing that remains is to create your database. To do this, simply
run::

    vaultier setup

This will complete the rest of the required steps and the application is ready
to be deployed to production.

To verify that everything is okay, you can run this command::

    vaultier runserver

After this, point your browser to `127.0.0.1` address and port `8000`. You will
see *blank* page. This is to be expected, because you did not setup your web
server yet. However, you should not see any error messages. If you do not, you
can proceed. After you're done checking, just CTRL^C.

=============
Create a User
=============

We want to run Vaultier under a unprivileged user. So using standard OS
tools::

    useradd -d /opt/vaultier -s /bin/bash vaultier


With this set, just `chown` the entire directory::

    chown -R vaultier:vaulter /opt/vaultier


.. warning:: Documenation fixed up here

===============
Configure Nginx
===============

::
    cp cfg/nginx.conf-dist cfg/nginx.conf
    mcedit cfg/nginx.conf

    sudo ln -s /opt/vaultier/cfg/nginx.conf /etc/nginx/sites-enabled/vaultier
    sudo chmod 0777 -R /var/opt/vaultier/run/
    chmod -R 755 /opt/vaultier/sources/static


======================
Configure Supervisord
======================
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

=================================================================
To Allow `vaultier` User to Start, Restart and Stop It's Services
=================================================================

You may consider this as a nice-to-have. Since we have a user under which
Vaultier runs, we may as well, enable him to restart all the related services.
To achieve this, we add him to sudoers for specific commands.::

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
