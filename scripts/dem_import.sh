#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 0.11
# CityApp module
# This module is or IAUAI project

# 2020. SZEPTEMBER 30.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

cd ~/cityapp

MODULES=~/cityapp/scripts/modules;
MODULE=~/cityapp/scripts/modules/module_10;
MODULE_NAME=cityapp_module_10;
VARIABLES=~/cityapp/scripts/shared/variables;
BROWSER=~/cityapp/data_from_browser;
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang);
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/module_10;
MESSAGE_SENT=~/cityapp/data_to_client;
GEOSERVER=~/cityapp/geoserver_data;
GRASS=~/cityapp/grass/global;
MAPSET=module_10;
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M)
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M)


    if [ ! -d $GEOSERVER/module_10 ]
        then
            zenity --info --text="nincs"
        else
            zenity --info --text="van"
    fi
