#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

PROJDIR=$MY_PATH/../sources
PIDFILE="$MY_PATH/../run/vaultier.pid"
SOCKET="$MY_PATH/../run/vaultier.sock"
VENV="$MY_PATH/../env/bin/activate"

echo "======================================"
echo "Vaultier start script"
echo "======================================"

start() {
        if [ -f $PIDFILE ]; then
            echo "Already running"
            exit 1
        fi

        echo "Starting Vaultier"
        eval  sudo -u www-data -s "source $VENV; $PROJDIR/manage.py runfcgi maxchildren=10 maxspare=5 minspare=2 method=prefork socket=$SOCKET pidfile=$PIDFILE; chmod 777 $SOCKET"
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

status() {
        if [ -f $PIDFILE ]; then
            ps -ef | grep `cat $PIDFILE`
            echo ''
            echo 'running.'
        else
            echo 'stopped.'
        fi

}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  status)
        status
        ;;
  restart|reload|condrestart)
        stop
        start
        ;;
  *)
        echo "Usage: $0 {start|stop|restart|reload|status}"
        exit 1

esac
exit 0






