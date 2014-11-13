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
* PostgreSQL database 8.x or newer
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
    sudo apt-get install postgresql-server-dev-all
    sudo apt-get install nginx
    sudo apt-get install supervisor
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

When everything is ready, you need to update your environment for the setup
like so::

    export PYTHONPATH="${PYTHONPATH}:/opt/vaultier/venv/local/lib/python2.7/site-packages/vaultier"

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

*VAULTIER*
  This is a dictionary which contain all application settings
  (frontend and backend). By default you see the `raven_key` entry, set to
  empty string. Again, you can set this to your Sentry DSN, if you want to
  monitor _frontend_ errors

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

    chown -R vaultier:vaultier /opt/vaultier


.. warning:: Documenation fixed up here

===============
Configure uWSGI
===============

Okay, at this point, you want to configure to run Vaultier under uWSGI as a
WSGI wrapper. This is rather simple to do. Navigate to `apps-available`
directory of uWSGI and create a new config file and symlink it to
`apps-enabled`::

    cd /etc/uwsgi/apps-available
    touch vaultier.ini
    ln -s /etc/uwsgi/apps-available/vaultier.ini ../apps-enabled


.. note:: You can find the configuration template in
    ``/opt/vaultier/venv/vaultier-config-examples/uwsgi``, if you have your
    virtualenv in ``/opt/vaultier/venv`` directory

Now, you need to edit the configuration. Basically, just open the just created
file (`vaultier`) with your favorite editor and put this in it::

    [uwsgi]
    workers=4
    max-requests=1000
    chdir=/opt/vaultier
    module=vaultier.wsgi:application
    home=/opt/vaultier/venv
    pythonpath=/opt/vaultier
    pythonpath=/opt/vaultier/venv/lib/python2.7/site-packages/vaultier/
    env=DJANGO_SETTINGS_MODULE=vaultier_conf
    vacuum=true
    no-orphans=true
    uid=vaultier
    gid=vaultier
    chown-socket=vaultier:www-data
    listen=50
    logger = file:/opt/vaultier/logs/uwsgi.log

Safe the file and restart uwsgi::

    sudo service uwsgi restart

After this, consult your log files that uwsgi has started. You will find them
in `/opt/vaultier/logs/uwsgi.log`


===============
Configure Nginx
===============

.. warning:: If you already have a running webserver, you probably want to skip
    this step and configure it yourself.

In a similar fashion as uWSGI, we need to configure Nginx to work as a proxy
to our deployed uWSGI app. Navigate to nginx config directory and create and
enable the configuration file::

    cd /etc/nginx/sites-available
    sudo touch vaultier
    sudo ln -s /etc/nginx/sites-available/vaultier ../sites-enabled

.. note:: You can find the configuration template in
    ``/opt/vaultier/venv/vaultier-config-examples/nginx``, if you have your
    virtualenv in ``/opt/vaultier/venv`` directory

Now, edit the configuration file with your favorite editor. Put this in the
settings file::

    server {
            server_name www.example.com;
            listen   *:80;
            client_max_body_size 10M;

            access_log /opt/vaultier/logs/nginx-access.log;
            error_log /opt/vaultier/logs/nginx-error.log;

            location / {
                include uwsgi_params;
                uwsgi_pass unix:/run/uwsgi/app/vaultier/socket;
            }

            location /static {
                alias /opt/vaultier/venv/lib/python2.7/site-packages/vaultier/vaultier/static/;
            }

            location /media {
                alias /opt/vaultier/venv/lib/python2.7/site-packages/vaultier/vaultier/media/;
            }
    }

Mind that you need to adjust the `server_name` to reflect the domain where
Vaultier is going to be run. When you're done, you can restart nginx::

    sudo service nginx restart

Again, you can consult nginx logs to see, whether this worked properly, located
in `/opt/vaultier/logs` directory.

=======================
Verify the Installation
=======================

The Vaultier is basically installed, apart from background workers. To verify,
that the system is up, navigate with your browser to a domain or IP address
where Vaultier is deployed and check, you can see the welcome page. If so, the
installation is successful.

=====================
Configure Supervisord
=====================

Last thing that has to be setup is the background worker group, that handles
some of Vaultiers tasks. To do this, we will use `supervisord`. First, go to
supervisors configuration directory::

    cd /etc/supervisor/conf.d
    touch vaultier.conf

.. note:: You can find the configuration template in
    ``/opt/vaultier/venv/vaultier-config-examples/supervisord``, if you have
    your virtualenv in ``/opt/vaultier/venv`` directory

Now, open the ``vaultier.conf`` file in your editor of choice and put the
following contents inside::

    [program:vaultier-worker]
    command=/opt/vaultier/venv/bin/celery -A vaultier worker
    directory=/opt/vaultier
    environment=PATH="/opt/vaultier/venv/bin:",DJANGO_SETTINGS_MODULE="vaultier_conf"
    user=vaultier
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=1
    stopwaitsecs = 600

    [program:vaultier-celerybeat]
    command=/opt/vaultier/venv/bin/celery -A vaultier beat
    directory=/opt/vaultier
    environment=PATH="/opt/vaultier/venv/bin:",DJANGO_SETTINGS_MODULE="vaultier_conf"
    user=vaultier
    numprocs=1
    autostart=true
    autorestart=true
    startsecs=1
    stopwaitsecs = 600

    [group:vaultier]
    programs=vaultier-celerybeat,vaultier-worker

After you're done, save the file and run these commands to start those
background daemons::

    supervisorctl reread
    supervisorctl update
    supervisorctl status vaultier:

You should see two entries with a status of `RUNNING`. If not, please consult
supervisord logs.

Supervisor will take care of starting those daemons on machine startup.

With this, the installation is fully completed.

===============================
Start,  Stop & Restart Vaultier
===============================

To restart (or stop and start) the Vaultier application and it's associated
services, you may use these commands::

    sudo service uwsgi start/stop/restart
    sudo supervisorctl restart start/stop/vaultier

To check status of services managed by `supervisord`, you can also use this
command::

    supervisorctl status vaultier

If anything goes south, remember to check the logs available in
`/opt/vaultier/logs` directory.

==============================================================
Allow `vaultier` User to Start, Restart and Stop It's Services
==============================================================

.. note:: This step is optional and is up to you whether you want to allow such
    behavior

You may consider this as a nice-to-have. Since we have a user under which
Vaultier runs, we may as well, enable him to restart all the related services.
To achieve this, we add him to sudoers for specific commands.::

    create file /etc/sudoers.d/vaultier
    echo "" > /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier: >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier: >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier-worker >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier-worker >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier-worker >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier-worker >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier-celerybeat >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl status vaultier-celerybeat >> /etc/sudoers.d/vaultier

    echo vaultier ALL = (root) NOPASSWD:/usr/local/bin/uwsgi restart vaultier >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/local/bin/uwsgi  start vaultier >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/local/bin/uwsgi  stop vaultier >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/local/bin/uwsgi  status vaultier >> /etc/sudoers.d/vaultier

===============
Troubleshooting
===============

--------------------------------------------------------------------------
When I navigate to Vaultier, I see only text, but no images or theme/style
--------------------------------------------------------------------------

You have pointed nginx to a bad directory. The ``Location /static`` directive
has to be set to where Vaultiers static files reside, which is in
`/opt/vaultier/vaultier/vaultier/static`. Double check that this is the case.
Also, consult the nginx logs.