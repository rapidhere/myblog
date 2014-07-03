#!/bin/bash

DIST_DIR=/var/www/rapidhere.com
LOG_DIR=/var/log/rapidhere.com

# Create directories
echo Init ...
if [ ! -d $DIST_DIR ]; then
	mkdir -p $DIST_DIR
fi

if [ ! -d $LOG_DIR ]; then
	mkdir -p $LOG_DIR
fi

# Copy files
echo Copying ...
cp *.* $DIST_DIR -r
cp * $DIST_DIR -r

# Change directory
cd $DIST_DIR

# change config file
echo Configuring ...
mv config-prod.js config.js

# install modules
npm install 

# Remove unused files
rm .git .gitingore Gruntfile.js devd.js TODO package.json term doc log mainpage-canvas -rf

# Done
echo done
