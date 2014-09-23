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
    database backup (mount this in another container)

* /var/log
* /var/lib/postgresql
* /opt/vaultier/logs

=====================
Environment Variables
=====================

*VAULTIER_DOMAIN*
    Lipsum

*VAULTIER_EMAIL_HOST*
    Lipsum

*VAULTIER_EMAIL_PORT*
    Lipsum

*VAULTIER_EMAIL_USER*
    Lipsum

*VAULTIER_EMAIL_PASSWORD*
    Lipsum

*VAULTIER_EMAIL_TLS*
    Lipsum