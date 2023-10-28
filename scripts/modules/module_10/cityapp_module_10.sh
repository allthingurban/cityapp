#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 0.1
# CityApp module
# Road structure prediction module: it is to predict a possible road structure, considering the terrain of the selected area.

# 2020. augusztus 19.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#



cd ~/cityapp

MODULES=~/cityapp/scripts/modules
MODULE=~/cityapp/scripts/modules/module_10
MODULE_NAME=cityapp_module_10
VARIABLES=~/cityapp/scripts/shared/variables
BROWSER=~/cityapp/data_from_browser
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang)
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/module_10
MESSAGE_SENT=~/cityapp/data_to_client
GEOSERVER=~/cityapp/geoserver_data
GRASS=~/cityapp/grass/global
MAPSET=module_10
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M)
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M)

# -- Preparation -------------------------

    Running_Check Stop
    
    grass $GRASS/$MAPSET --exec r.mask -r
    grass $GRASS/$MAPSET --exec g.region vector=selection@PERMANENT res=0.00009
    # check if module_10 mapset exist or not
        if [ ! -d $GRASS/$MAPSET ]
            then
                cp -r ~/cityapp/grass/skel ~/cityapp/grass/global/module_10
        fi
    Send_Message m 1 module_10.1 question actions [\"Yes\",\"Cancel\"]
        Request
            case $REQUEST_CONTENT in
                "draw")
                    Request_Map geojson GEOJSON
                        FRESH=$REQUEST_PATH                        
                        Process_Check start add_map
                        Add_Vector $FRESH project_area
                        grass -f $GRASS/$MAPSET --exec g.region vector=project_area res=0.00009
                        #Gpkg_Out m1_stricken_area m1_stricken_area
                        Process_Check stop add_map
                        ;;
                "cancel")
                    Running_Check Stop
                    Close_Process
                    exit
                    ;;
            esac
            
    Send_Message m 2 module_10.2 question actions [\"Ok\"]
        Request
            Request_Map geojson GEOJSON
                Process_Check start add_map
                Add_Vector $REQUEST_PATH points
                # Gpkg_Out m1_from_points m1_from_points
                Process_Check stop add_map
        

# -- Processing -------------------------
    Process_Check start map_calculations
        grass -f $GRASS/$MAPSET --exec $MODULE/cityapp_module_10_processing_1.1.sh
    Process_Check stop map_calculations        

        
        Send_Message m 3 module_10.3 question actions [\"OK\"]
            Request
                until [ "$REQUEST_CONTENT" == "ok" ]; do
                    rm -f $MESSAGE_SENT/*.message
                        Send_Message m 2 module_10.2 question actions [\"OK\"]
                        Request
                done

            Running_Check Stop
            Close_Process
exit
