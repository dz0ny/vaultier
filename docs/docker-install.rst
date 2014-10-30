***************************************
Vaultier Installation from Docker Image
***************************************

=================
Running the Image
=================

To run the container, use this command::

    sudo docker run --name vaultier -p 80:80 rclick/vaultier-omni

Of course, you can bind the internal 80 port to whatever you deem necessary.
Mind, that you will probably want to run Vaultier on some domain, like
``vaultier.mycompany.net``. In this case, you need to set an environment
variable with this domain. To do so, run the container as such::

    sudo docker run --name vaultier -p 80:80 -e "VAULTIER_DOMAIN=vaultier.mycompany.net"

Other environment variables are available for setting up email server, which
you will need (see below).

==============
Docker Volumes
==============

.. warning:: You will need to handle at least ``/var/lib/postgresql`` for
    database backup (mount this in another container) and ``/opt/vaultier/data``

* /var/log
* /var/lib/postgresql
* /opt/vaultier/logs
* /opt/vaultier/data

=====================
Environment Variables
=====================

*VAULTIER_DOMAIN*
    Domain where is Vaultier accessible

*VAULTIER_EMAIL_HOST*
    Mailserver IP address or DNS

*VAULTIER_EMAIL_PORT*
    Mailserver port

*VAULTIER_EMAIL_USER*
    Mailserver user

*VAULTIER_EMAIL_PASSWORD*
    Mailserver password

*VAULTIER_EMAIL_TLS*
    Does mailserver use TLS (bool)

*VAULTIER_DATABASE_NAME*
    Database name

*VAULTIER_DATABASE_USER*
    Database user

*VAULTIER_DATABASE_PASSWORD*
    Database password

*VAULTIER_DATABASE_HOST*
    Database host

*VAULTIER_DATABASE_PORT*
    Database port

*VAULTIER_ALLOW_REGISTRATION*
    By default is registration allowed only for first user. Other people can
    become user by getting invitation

*VAULTIER_ALLOW_STATISTICS*
    Send anonymous usage statistic to vaultier.org REST API

*VAULTIER_FROM_EMAIL*
    Email address where are all emails sending from
