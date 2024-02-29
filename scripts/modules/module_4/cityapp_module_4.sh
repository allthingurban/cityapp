#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 0.4
# CityApp module
# This module is to launch Rural Sanitation Strategy Module, and process user communication
# 2020. július 26.
# Author: Abhinav Kumar, Scaling City Institutions for Asia and India

#
#-- Initial settings -------------------
#

cd ~/cityapp

MODULES=~/cityapp/scripts/modules
MODULE=~/cityapp/scripts/modules/module_4
MODULE_NAME=module_4
VARIABLES=~/cityapp/scripts/shared/variables
BROWSER=~/cityapp/data_from_browser
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang)
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/module_4
MESSAGE_SENT=~/cityapp/data_to_client
GEOSERVER=~/cityapp/geoserver_data
GRASS=~/cityapp/grass/global
MAPSET=module_4
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M)
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M)
PUBLIC=~/cityapp/webapp/public
PYTHON_MODULE=~/cityapp/scripts/module/module_3/python_module_4
#FILE_HASH=$(RANDOM | md5sum | head -c 15)

QUERY_RESOLUTION=0.00002

Running_Check start

##############
# Preprocess, 
##############
    
    rm -f $MODULE/ward_id
    rm -f $MODULE/draw
    rm -f $MESSAGE_SENT/*
    rm -f $BROWSER/*

    

#############
# User input
#############

    # If you want to select a ward, then type its number (between 1 and 67) and click WARD button. 
    # If you want to draw an arbitrary area to query, click Draw button, draw the area, then click Save. Click Exit to exit now. 

        Send_Message m 1 module_4.1 question actions [\"Ok\",\"Cancel\"] # Send_message function is in function.sh
            Request
                IFS=";" read -r -a request_array <<< "$REQUEST_CONTENT"
                echo "First value"
                echo "${request_array[1]}"

                case "${request_array[0]}" in #Request content is the content of the file request that is created in the data_from_browser folder
                    "ok"|"Ok"|"OK")
                        STATE_LGD_CODE="${request_array[1]}"
                        #DIST_LGD_CODE="${request_array[2]}"
                        FILE_NAME="${request_array[2]}"
                         # The ward number is written in the file request in the folder data_from_browser
                        echo "$DIST_LGD_CODE" > $MODULE/state_lgd_code
                        #Request content is the content of the file request that is created in the data_from_browser folder
                    ;;
                    "cancel"|"Cancel"|"CANCEL") # Check if the user has selected Cancel
                        Running_Check stop # If the user has selected cancel then executed the function Running_check with the parameter Stop
                        Close_Process # Executed the function Close_Process in function.sh
                        exit
                        ;;
                esac
                
##############
#  Processing 
##############

        
        ~/cityapp/pycityapp/bin/python3 ~/cityapp/scripts/modules/module_4/cityapp_module4.py $STATE_LGD_CODE $FILE_NAME
        
        Send_Message m 2 module_4.2 question actions [\"Ok\ Cancel\"] # 


    
    # Query is finished, to process exit, click OK.
            Request
                until [ "$REQUEST_CONTENT" == "downloaded" ]; do
                   
                    rm -f $MESSAGE_SENT/*.message
                    Send_Message m 2 module_4.2 question actions [\"Ok\ Cancel\"] # 
                        Request
                    
                done
        Running_Check stop
        Close_Process
    exit