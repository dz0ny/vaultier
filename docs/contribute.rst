*****************
How to contribute
*****************

=========================
Install devel environment
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
Install required packages
-------------------------
::

    # install backend tools
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install python
    sudo apt-get install python-dev
    sudo apt-get install python-pip
    sudo pip install virtualenv


-----------
Create venv
-----------
::

    virtualenv ./env
    source ./env/bin/activate
    pip install -r sources/REQUIREMENTS


----------------------------------
install frontend development tools
----------------------------------
::

    # install frontend tools
    sudo apt-get install nodejs
    sudo apt-get install npm

    # install bower
    npm install -g bower

    # initialize sources and vendors
    cd sources/vaultier/scripts
    npm install
    bower install


========================
Run development instance
========================
::

    # run server
    cd sources
    ./manage.py runserver 127.0.0.0:8000
    http://127.0.0.0:8000

    # run frontend compiler
    cd sources/vaultier/scripts
    gulp watch