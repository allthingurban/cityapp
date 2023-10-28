#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 1.0
# CityApp module
# This module is to list available maps for module_2
#
# 2020. április 14.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

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
