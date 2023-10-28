#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 1.4
# CityApp module
# This module is to start cityapp system
#
# Core module, do not modify!
#
# 2021. február 25.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#

MODULES=~/cityapp/scripts/modules
MODULE=~/cityapp/scripts/base
MODULE_NAME=ca_starter
VARIABLES=~/cityapp/scripts/shared/variables
BROWSER=~/cityapp/data_from_browser
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang)
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/ca_starter
MESSAGE_SENT=~/cityapp/data_to_client


#
#-- Process -------------------
#

# Setting IP adress for geoserver availability

   ##HOSTNAME=$(curl http://checkip.amazonaws.com) change this for hosting on aws
   HOSTNAME=$(hostname -i)
    
        echo "DATA_FROM_BROWSER_DIR=../data_from_browser" > ~/cityapp/webapp/.env
        echo "DATA_TO_CLIENT_DIR=../data_to_client" >> ~/cityapp/webapp/.env
        echo "GEOSERVER_URL=http://$HOSTNAME:8080/" >> ~/cityapp/webapp/.env
        echo "INITIAL_LAT=20.29" >> ~/cityapp/webapp/.env
        echo "INITIAL_LON=85.82" >> ~/cityapp/webapp/.env


# Restart Geoserver -- first stop, then start. xterm is only for testing purpose
    cd /usr/share/geoserver/bin/
    ./shutdown.sh &
    ./startup.sh &

# Starting the node.js
    cd ~/cityapp/webapp
     node app.js &

cd ~/cityapp

# Killing any previous version of cityapp, avoiding to run a non-expected copy of inotifywait
    for i in $(ps -a | grep cityapp | sed s'/[a-z _]//'g | cut -d"/" -f1);do
        echo $i
        kill -9 $i
    done

    for i in $(ps -a | grep inotifywait | sed s'/[a-z _]//'g | cut -d"/" -f1);do
        echo $i
        kill -9 $i
    done
    
    
# Starting the onesecond app -- this is to touch the "running" file (requested by nod.js) in data_to_client 
    ~/cityapp/scripts/base/cityapp_onesecond.sh &

# Finally, launching the module_launcher
    ~/cityapp/scripts/base/cityapp_module_launcher.sh

exit
