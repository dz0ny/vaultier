#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

if [ -z "$1" ] ; then
  echo please provide virtual environment. eg: /env/bin/activate
  exit 1  # fail
fi


PROJDIR=$MY_PATH/../sources
PIDFILE="$MY_PATH/../run/vaultier.pid"
SOCKET="$MY_PATH/../run/vaultier.sock"
LOGSDIR="$MY_PATH/../logs"
VENV="$1"
NAME="Vaultier"
NUM_WORKERS=4
DJANGO_SETTINGS_MODULE=app.settings
DJANGO_WSGI_MODULE=app.wsgi


echo "Starting $NAME as `whoami`"
# prepare environment
cd $PROJDIR
source $VENV
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$PROJDIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKET)
test -d $RUNDIR || mkdir -p $RUNDIR

# Create the logs directory if it doesn't exist
test -d $LOGSDIR || mkdir -p $LOGSDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --log-level=debug \
  --bind=unix:$SOCKET




