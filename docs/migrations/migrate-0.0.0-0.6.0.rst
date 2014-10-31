Migrate 0.0.0 to 0.6.0
**********************


Before you start
================
* Migration has to be done as vaultier user ``vaultier``
* Before migration switch to vaultier dir

Stop vaultier
=============
::

    sudo supervisorctl stop vaultier
    sudo service uwsgi stop vaultier


Backup database
===============
::

    pg_dump vaultier --column-inserts --disable-triggers > ./vaultier.sql


Migrate
=======
::

    # activate virtualenv
    source ./env/bin/activate

    # pull latest stable
    git checkout stable
    git pull

    # install updated requirements
    pip install -r ./sources/REQUIREMENTS

    # migrate db
    ./sources/manage.py migrate

    # rebuild acl
    ./sources/manage.py rematerializeacl

Start vaultier
==============
::

    sudo service uwsgi start vaultier
    sudo supervisorctl start vaultier

