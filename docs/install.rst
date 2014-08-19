*********************
Vaultier installation
*********************

=============
Prerequisites
=============
* Ubuntu server 14.04 or Debian 7
* Nginx web server / psql database (also mysql is available)
* Running under supervisord utilizing gunicorn
* Python 2.7.5

=====
Clone
=====
::

    cd /opt
    mkdir /opt/vaultier
    cd vaultier
    git clone git@git.rclick.cz:rclick/vaultier.git .
    git checkout stable


=========================
Install required packages
=========================
::

    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install python
    sudo apt-get install python-dev
    sudo apt-get install python-pip
    sudo pip install virtualenv

===========
create user
===========
::

    useradd -d /opt/vaultier -s /bin/bash vaultier
    passwd vaultier
    chown -R vaultier:www-data /opt/vaultier


===========
Create venv
===========
::

    virtualenv ./env
    source ./env/bin/activate
    pip install -r sources/REQUIREMENTS


==============
Prepare config
==============
::

    cp sources/app/settings.py-prod-dist sources/app/settings.py
    mcedit sources/app/settings.py


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
    cd sources
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
