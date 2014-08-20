#!/bin/bash

LOG_DIR=`tail -1 _config`
APP_FILE=`head -1 _config`/prod.js

echo $LOG_DIR, $APP_FILE
exit 0

case $1 in 
	start)
		forever start -l $LOG_DIR/forever.log -a $APP_FILE
		;;
	restart)
		forever restart -l $LOG_DIR/forever.log -a $APP_FILE
		;;
	stop)
		forever stop $APP_FILE
		;;
	*)
		echo 'Usage: prod.sh start | restart | stop'
		exit 1
esac
