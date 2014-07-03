#!/bin/bash

LOG_DIR=/var/log/rapidhere.com
APP_FILE=/var/www/rapidhere.com/prod.js

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
