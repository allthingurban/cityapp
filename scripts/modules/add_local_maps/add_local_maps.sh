#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 1.0
# CityApp module
# This module is to add local maps to PERMANENT mapset
#
# 2020. szeptember 9.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany






# There is no graphical interface: this is a "service" script: it is only to add bhubaneshwar maps to PERMANENT.


#
#-- Initial settings -------------------
#

cd ~/cityapp

MODULES=~/cityapp/scripts/modules
MODULE=~/cityapp/scripts/modules/module_2
MODULE_NAME=cityapp_module_2_listing
VARIABLES=~/cityapp/scripts/shared/variables
GRASS=~/cityapp/grass/global
MAPSET=PERMANENT

IMPORT_DIR=~/cityapp/geoserver_data/bhubaneshwar
# -- processing -----

for i in $(ls $IMPORT_DIR);
    do
        grass -f $GRASS/$MAPSET --exec v.in.ogr input=$IMPORT_DIR/$i output=$(echo $i | cut -d"." -f1) --overwrite
done

exit
