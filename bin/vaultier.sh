#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

PROJDIR=$MY_PATH/../sources
PIDFILE="$PROJDIR/mysite.pid"
SOCKET="$PROJDIR/mysite.sock"
VENV="$PROJDIR/env/bin/activate"

echo "======================================"
echo "Vaultier start script"
echo "======================================"

start() {
        if [ -f $PIDFILE ]; then
            echo "Already running"
            exit 1
        fi
        echo "Activating virtual: env $VENV"
        source $VENV

        echo "Starting Vaultier"
        eval $PROJDIR/manage.py runfcgi maxchildren=10 maxspare=5 minspare=2 method=prefork socket=$SOCKET pidfile=$PIDFILE
        echo "started."
}

stop() {
        echo "Stopping Vaultier"
        cd $PROJDIR
        if [ -f $PIDFILE ]; then
            kill `cat -- $PIDFILE`
            rm -f -- $PIDFILE
        fi
        echo stopped.
}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  status)
        status FOO
        ;;
  restart|reload|condrestart)
        stop
        start
        ;;
  *)
        echo "Vaultier fastcgi control"
        echo "Usage: $0 {start|stop|restart|reload|status}"
        exit 1

esac
exit 0






