#!/usr/bin/env python

import re
import sys

if len(sys.argv) < 3:
    print "Usage: " + sys.argv[0] + " <deploy directory> <log directory>"
    exit(1)

dist_dir = sys.argv[1]
log_dir = sys.argv[2]

print "Preparing to deploy to %s with log directory %s..." % (dist_dir, log_dir)

print "Configure script/deploy.sh ..."

print "Configure script/prod.sh ..."

print "Configure script/config-prod.sh ..."

print "Run script/deploy.sh to deploy"
print "Configure done"
