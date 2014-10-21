Building Vaultier Distributions
===============================

Python Distribution
-------------------
The ``setup.py`` file is prepared to build the source distribution. To execute
the build, navigate to the root of the project (where ``setup.py`` is located)
and run::

    python setup.py sdist

This will generate distribution artifact in the ``dist`` directory. The file
is a tarball, that you will need for other distribution formats (see below).


Docker Image
------------

First, you need to navigate to ``packaging/docker`` directory. Then, copy the
tarball from the python distribution step into the directory. Because the name
of the tarball is influenced by the build version, check that your
``Dockerfile`` references this tarball. You need to look for this instruction::

    COPY Vaultier-0.7.0.tar.gz /opt/vaultier/Vaultier-0.7.0.tar.gz

If everything checks out, you may build the Docker image by running::

    sudo docker build -t rclick/vaultier-omni .

You can verify that you have a new image by running::

    sudo docker images

You should see a new image marged as ``rclick/vaultier-omni`` with tag
``latest`` created moments ago. You can now pack it, upload it to Docker Hub
or whatever you need.


Debian Package
--------------
First, you need to navigate to ``packaging/debian`` directory. Then, copy the
tarball from the python distribution step into sub-directory ``opt/vaultier``.
This places the tarball at the proper place for installing the package.
Now, open the ``DEBIAN/postinst`` script and check that the command that
actually installs the tarball references the correct name::

    /opt/vaultier/venv/bin/pip install Vaultier-0.7.0.tar.gz

Once checked, you can go back to the ``packaging`` directory and run::

    fakeroot dpkg-deb --build debian

This will create a new ``debian.deb`` package in place. You should test it in a
VM before submitting it to a repository or a mirror.
