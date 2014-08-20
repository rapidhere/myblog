#!/usr/bin/env python

import re
import sys

if len(sys.argv) < 3:
    print "Usage: " + sys.argv[0] + " <deploy directory> <log directory>"
    exit(1)

dist_dir = sys.argv[1]
log_dir = sys.argv[2]

print "Preparing to deploy to:\n\t%s\nwith log directory:\n\t%s\n" % (dist_dir, log_dir)

file("_config", "w").write("%s\n%s\n" % (dist_dir, log_dir))

print "done't forget to change the log dir path in config.js ..."

print "Configurin done ..."
