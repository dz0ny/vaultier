# Vaultier Dockerfile for building a Vaultier image

# Base this on Ubuntu LTS
FROM ubuntu:14.04
MAINTAINER info@rclick.cz

# Set locales
RUN DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales && \
    locale-gen en_US.UTF-8 && \
    /usr/sbin/update-locale LANG=en_US.UTF-8


ENV LC_ALL en_US.UTF-8

# Install Postgres, Htop, Uwsgi, Nginx & Supervisor
RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3 postgresql-server-dev-9.3 \
    python-virtualenv python-dev \
    nginx \
    uwsgi uwsgi-plugin-python \
    supervisor && \
    apt-get clean -y && \
    apt-get autoclean -y

# Postgres configuration
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf && \
    echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf

RUN /etc/init.d/postgresql start && \
    sudo -u postgres psql --command "CREATE USER vaultier WITH SUPERUSER PASSWORD 'vaultier';" && \
    sudo -u postgres createdb -O vaultier vaultier


# Vaultier installation
RUN mkdir -p /opt/vaultier/logs && mkdir -p /var/run/uwsgi/app/vaultier
WORKDIR /opt/vaultier
RUN useradd -d /opt/vaultier -s /bin/bash vaultier && \
    chown vaultier:www-data /var/run/uwsgi/app/vaultier
COPY Vaultier-latest.tar.gz /opt/vaultier/Vaultier-latest.tar.gz
RUN virtualenv venv && /opt/vaultier/venv/bin/pip install Vaultier-latest.tar.gz && rm /opt/vaultier/Vaultier-latest.tar.gz
ENV PYTHONPATH /opt/vaultier/venv/lib/python2.7/site-packages/vaultier
RUN /etc/init.d/postgresql start && /opt/vaultier/venv/bin/vaultier init --managed && \
    /opt/vaultier/venv/bin/vaultier setup --no_statistics && \
    chown -R vaultier:vaultier /opt/vaultier

# Setup configuration for services
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD nginx.conf /etc/nginx/nginx.conf
ADD nginx-vaultier /etc/nginx/sites-available/vaultier
ADD uwsgi.ini /etc/uwsgi/apps-available/vaultier.ini
RUN rm /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/vaultier /etc/nginx/sites-enabled && \
    ln -s /etc/uwsgi/apps-available/vaultier.ini /etc/uwsgi/apps-enabled

# We don't want SSH
RUN rm -rf /etc/service/sshd /etc/my_init.d/00_regen_ssh_host_keys.sh

# Volumes
VOLUME ["/var/log", "/var/lib/postgresql", "/opt/vaultier/logs", "/opt/vaultier/data"]

# Run supervisord on startup. Do not run with sh -c, so that SIGTERM works
# on docker stop <conatiner>
ENTRYPOINT ["/usr/bin/supervisord"]
