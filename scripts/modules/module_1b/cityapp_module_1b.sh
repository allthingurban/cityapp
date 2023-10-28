#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 0.1
# CityApp module
# A Latacunga edition: this module is designed for a latacunga usecase, calculating the are covered by safe points

# 2020. október 18.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#

cd ~/cityapp

MODULES=~/cityapp/scripts/modules;
MODULE=~/cityapp/scripts/modules/module_1b;
MODULE_NAME=cityapp_module_1b;
VARIABLES=~/cityapp/scripts/shared/variables;
BROWSER=~/cityapp/data_from_browser;
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang);
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/module_1b;
MESSAGE_SENT=~/cityapp/data_to_client;
GEOSERVER=~/cityapp/geoserver_data;
GRASS=~/cityapp/grass/global;
MAPSET=module_1;
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M); 
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M);


# User dialogue ----------------------------


Running_Check start

    if [ ! -d $GRASS/$MAPSET ]
        then
            mkdir $GRASS/$MAPSET
            cp ~/cityapp/grass/skel/* $GRASS/$MAPSET/
    fi


    # ----------------------------------------------------------------
    # ----------------------------------------------------------------
    
        # If you want upload an existing point map to define accessing points, click Map button. If you want to draw points directly on the map, click Darw. If you want to exit from the module now, click Exit.
        Send_Message m 1 module_1b.1 question actions [\"Map\",\"Draw\",\"Exit\"]
            Request
                case $REQUEST_CONTENT in
                    "map")
                        Send_Message m 2 module_1b.2 input actions [\"Submit\"]
                            Request_Map geojson GEOJSON gpkg GPKG
                                Add_Vector $REQUEST_PATH m1b_input_points
                        ;;
                    "draw")
                        Send_Message m 3 module_1b.3 input actions [\"Submit\"]
                            Request_Map geojson
                                Add_Vector $REQUEST_PATH m1b_input_points
                        ;;
                    "exit")
                        # To process exit, click OK.
                            Running_Check stop
                            Close_Process
                            exit
                        ;;
                esac
                
    # Add a time limit value in minutes (integer numbers only)
        Send_Message m 4 module_1b.4 input action [\"Ok\"]
            Request
                MINUTES=$REQUEST_CONTENT
                echo $MINUTES > $MODULE/variable_values

    # Stricken area is optional. If you want to add an already existing map as stricken area, click Map button. If you want to draw one or more area directly on the screen now, click Draw button. To skip Stricken area, click Skip.
    Send_Message m 5 module_1b.5 question actions [\"Map\",\"Draw\",\"Skip\"]
            Request
                case $REQUEST_CONTENT in
                    "map")
                        AREA=1
                        Send_Message m 2 module_1b.6 input actions [\"Submit\"]
                            Request_Map geojson GEOJSON gpkg GPKG
                                Add_Vector $REQUEST_PATH m1_stricken_area
                                Gpkg_Out m1_stricken_area m1_stricken_area
                        ;;
                    "draw")
                        AREA=1
                        Send_Message m 3 module_1b.7 input actions [\"Submit\"]
                            Request_Map geojson
                                Add_Vector $REQUEST_PATH m1b_input_points
                                Gpkg_Out m1_stricken_area m1_stricken_area
                        ;;
                    "skip")
                        AREA=0
                        grass $GRASS/$MAPSET --exec v.edit map=m1_stricken_area tool=create --overwrite
                        grass $GRASS/$MAPSET --exec v.edit map=m1_stricken_area_line tool=create 
                        rm -f $GEOSERVER/m1_stricken_area".gpkg"
                        ;;
                esac

                if [ $AREA -eq 1 ]
                    then
                        Send_Message m 6 module_1b.8 input action [\"Submit\"]
                            Request
                                #speed reduction ratio value
                                REDUCE=$REQUEST_CONTENT
                                REDUCE=$(echo "$REDUCE/100" | calc -dp)
                                    echo $AREA >> $MODULE/variable_values
                                    echo $REDUCE >> $MODULE/variable_values
                fi
                    
        # Message 9 is to show the sped values on the road network.
        # If the user want to cohnge those, then here that would be possible
        # Later has to implement this function
            # Average speed values on road types of the area. Do you want to change them?If you want to change, then change values then click Save. If you don't want to change, click Save without changing any value.

                #Send_Message l 5 module_1b.5 question actions [\"Yes\",\"No\"] $VARIABLES/roads_speed
                #    Request
                #        case $REQUEST_CONTENT in
                #            "yes")
                #                Request
                #                    echo $REQUEST_CONTENT | sed s'/\[//'g | sed s'/\]//'g | sed s'/,/\n/'g | sed s'/ \"//'g | sed s'/"//'g > $VARIABLES/roads_speed
                #                ;;
                #            "no")
                #                SPEED=0
                #                ;;
                #        esac
        
            
# Processing ----------------------------------------


    Process_Check start map_calculations
        
    grass $GRASS/$MAPSET --exec ~/cityapp/scripts/modules/module_1b/cityapp_module_1b_processing.sh
        
    Process_Check stop map_calculations

    Send_Message m 10 module_1b.10 question actions [\"OK\"]
        Request
            until [ "$REQUEST_CONTENT" == "ok" ]; do
                rm -f $MESSAGE_SENT/*.message
                Send_Message m 9 module_1a.10 question actions [\"OK\"]
                    Request
            done

        Running_Check Stop
        Close_Process
exit

#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------


       # If you want use an existing map to add points, click Map button, select a map, then save. If you want to draw points directly on the map, click Darw, then save. To exit now, click Exit.
        Send_Message m 1 module_1b.1 question actions [\"Map\",\"Cancel\"]
            Request
                case $REQUEST_CONTENT in
                    "cancel"|"Cancel"|"CANCEL")
                        # To process exit, click OK.
                        Send_Message m 7 module_1b.2 question actions [\"OK\"]
                            Request
                                until [ "$REQUEST_CONTENT" == "ok" ]; do
                                    rm -f $MESSAGE_SENT/*.message
                                    Send_Message m 7 module_1b.2 question actions [\"OK\"]
                                        Request
                                done
                            Running_Check stop
                            Close_Process
                        exit
                        ;;
                    "map"|"draw")
                        Request_Map
                            Add_Vector $REQUEST_PATH m1b_input_points
                        ;;
                esac
                
    # Add a time limit value in minutes (integer numbers only)
        Send_Message m 2 module_1b.3 input action [\"Ok\"]
            Request
                MINUTES=$REQUEST_CONTENT
                echo $MINUTES > $MODULE/variable_values
    
    # Stricken area is optional. If you want to add a stricken area, click Area, then draw one or more area and click Save button. If you do not want to add an area, click Cancel.
        Send_Message m 3 module_1b.4 question actions [\"Yes\",\"Cancel\"]
            Request
                case $REQUEST_CONTENT in
                    "area")
                        AREA=1
                        Request_Map geojson GEOJSON
                            Process_Check start add_map
                            Add_Vector $REQUEST_PATH m1_stricken_area
                            Gpkg_Out m1_stricken_area m1_stricken_area
                            Process_Check stop add_map
                    
                        Send_Message m 4 module_1b.5 input action [\"OK\"]
                            Request
                                #speed duction ratio value
                                REDUCE=$REQUEST_CONTENT
                                REDUCE=$(echo "$REDUCE/100" | calc -dp)
                            ;;
                    "cancel"|"Cancel"|"CANCEL")
                        AREA=0
                        grass $GRASS/$MAPSET --exec v.edit map=m1_stricken_area tool=create --overwrite
                        grass $GRASS/$MAPSET --exec v.edit map=m1_stricken_area_line tool=create 
                        rm -f $GEOSERVER/m1_stricken_area".gpkg"
                        ;;
                esac
                
                echo $AREA >> $MODULE/variable_values
                echo $REDUCE >> $MODULE/variable_values














    # If you want use a map, click Map button, select a map, then save. If you want to draw points directly on the map, click Darw, draw a poligon thes save. To exit now, click Exit.
    Send_Message m 1 module_1b.1 input action [\"Map\",\"Draw\",\Cancel\"]
        Request
            case $REQUEST_CONTENT in
                "map"|"draw")
                    Request_Map geojson GEOJSON gpkg GPKG
                        Add_Vector $REQUEST_PATH m1b_input_points
                    ;;
                "cancel")
                    Send_Message m 7 module_1b.7 question action [\"Ok\"]
                        Request
                            Running_Check stop
                            # Close_Process
                            exit
                    ;;
            esac
