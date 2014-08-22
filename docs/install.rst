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
    pip install -r REQUIREMENTS


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
    supervisorctl status vaultier
    /etc/init.d/nginx restart


==================
Start stop restart
==================
::

    /etc/init.d/nginx restart

    supervisorctl status vaultier
    supervisorctl start vaultier
    supervisorctl stop vaultier

================================================
To allow user vaultier to start restart and stop
================================================
::

    create file /etc/sudoers.d/vaultier
    echo "" > /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl restart vaultier >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl start vaultier >> /etc/sudoers.d/vaultier
    echo vaultier ALL = (root) NOPASSWD:/usr/bin/supervisorctl stop vaultier >> /etc/sudoers.d/vaultier

