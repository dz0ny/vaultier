*****************
How To Contribute
*****************

=========================
Install Devel Environment
=========================

-----
Clone
-----
::

    cd /www
    mkdir /www/vaultier
    cd vaultier
    git clone git@git.rclick.cz:rclick/vaultier.git .
    git checkout stable


-------------------------
Install Required Packages
-------------------------
::

    # install backend tools
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install python
    sudo apt-get install python-dev
    sudo apt-get install python-pip
    sudo pip install virtualenv


---------------------------------
Create Venv and setup Environment
---------------------------------
::

    virtualenv ./env
    source ./env/bin/activate
    pip install -r REQUIREMENTS
    python setup.py develop
    ./vaultier/manage.py setup

----------------------------------
Install Frontend Development Tools
----------------------------------
::

    # install frontend tools
    sudo apt-get install nodejs
    sudo apt-get install npm

    # install bower
    sudo npm install -g bower

    # initialize sources and vendors
    cd vaultier/vaultier/scripts
    npm install
    bower install

    # install gulp
    sudo npm install -g gulp


========================
Run Development Instance
========================
::

    # run server
    cd vaultier
    ./manage.py setup
    ./manage.py runserver 127.0.0.0:8000
    http://127.0.0.0:8000

    # run frontend compiler
    cd vaultier/scripts
    gulp watch
