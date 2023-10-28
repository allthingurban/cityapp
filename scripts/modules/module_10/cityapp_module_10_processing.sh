#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 0.1
# CityApp module
# This module is or IAUAI project

# 2020. augusztus 19.
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


#
#-- Initial settings -------------------
#

MARGIN_DISTANCE=-0.001;
POINT_ZONE=$(echo "$MARGIN_DISTANCE*2" | calc -ps)
    
    # A másodlagos utak nem lehetnek közelebb a proect area segélyéhez, mint adott távolság, mondjuk, 50m


# there are files for reclass:
    # reclass_1: gemorphology -- surface forms and ist relative cost
    # reclass_2: setting flat values -- setting what slope values are considered as null (plain)
    # reclass_3: river and other water bodies costs
    # reclass_4: 
    
    # r.stream.extract --overwrite elevation=terrain@module_10 threshold=1000 d8cut=1 stream_length=100 stream_vector=stream
    
    # connect streams endpoint to least_cost_route map:
    # v.distance -pa from=least_cost_route to=stream upload=dist output=connect to_type=line --overwrite


    #g.region vector=project_area res=0.00009
    
    
    v.extract --overwrite input=points cats=2 output=start_point
    v.extract --overwrite input=points cats=3 output=stop_point
    
    # Az elsődleges és a másodlagos utak nem lehetnek közelebb a project area segélyéhez, mint adott távolság, mondjuk, 100m, kivéve -- nyilván -- a start point és a stop point. Ezért a projet area területéből kivágjuk (pufferzóna) az adott feltételeknek megfelelő részt és ezen folyik a számolás: ez lesz a MASK területe
    
        v.buffer input=project_area output=project_area_buffer distance=$MARGIN_DISTANCE --overwrite
        v.buffer input=start_point output=start_buffer distance=$POINT_ZONE --overwrite
        v.buffer input=stop_point output=stop_buffer distance=$POINT_ZONE --overwrite
    
            v.overlay -t --overwrite ainput=project_area_buffer atype=area,auto binput=project_area operator=xor output=project_area_buffer_only
            v.overlay -t --overwrite ainput=project_area_buffer atype=area,auto binput=project_area operator=xor output=project_area_buffer_only
            v.overlay -t --overwrite ainput=start_project_area_buffer_only atype=area,auto binput=stop_buffer operator=not output=project_area_buffer_only_end


        
        v.to.rast input=project_area output=project_area use=val value=1 --overwrite
        r.mask vector=project_area
    
    if [ ! $(g.list type=raster mapset=$MAPSET | grep bbswr_dem) ]
        then
            g.copy raster=bbswr_dem@PERMANENT,bbswr_dem --overwrite
    fi
    
    DEM=bbswr_dem #@PERMANENT
    
    CELLTYPE=$(r.info -g map=$DEM | grep datatype | cut -d"=" -f2 )
        if [ "$CELLTYPE" != "fcell" ]
            then 
                r.mapcalc expression="$DEM"_float"=float($DEM)" --overwrite
            elsex0
                g.copy raster=$DEM"@PERMANENT",$DEM"_float" --overwrite
        fi

    DEM=$DEM"_float"
    r.mapcalc expression="terrain=$DEM*project_area" --overwrite
    
    r.geomorphon elevation=terrain forms=geomorf search=12 skip=0 flat=1 dist=0 --overwrite
    r.neighbors input=geomorf output=geomorf_conv method=mode size=9 --overwrite
    r.reclass input=geomorf_conv output=geomorf_conv_reclassed rules=$MODULE/reclass_1 --overwrite

    r.slope.aspect elevation=terrain slope=slope --overwrite

    # Setting random points for sampling slope mapset
    v.random --overwrite output=random npoints=10000 --overwrite
    v.to.rast --overwrite input=random@module_10 output=random use=val value=1 --overwrite
    r.mapcalc expression="slope_sample=random*slope" --overwrite
    r.to.vect input=slope_sample output=slope_sample type=point column=slope --overwrite 

    v.surf.bspline input=slope_sample raster_output=slope_interpolated column=slope ew_step=0.003 ns_step=0.003 --overwrite
    r.mapcalc expression="specific_costs=(1+tan(slope_interpolated))*geomorf_conv_reclassed" --overwrite
       
    
    r.walk -k elevation=terrain@module_10 friction=specific_costs  output=walking outdir=movement_directions start_points=start_point stop_points=stop_point --overwrite 
    r.drain -d input=walking direction=movement_directions output=least_cost_route_temp drain=least_cost_route_temp start_points=stop_point --overwrite 
    v.generalize --overwrite input=least_cost_route_temp output=least_cost_route method=sliding_averaging threshold=1 slide=1 angle_thresh=180 alpha=2 beta=2 iterations=10

    
    
    
    # --------------------------------------------
    
    # Ha a másodlagos főutak közelebb lennének a főtengelyhez, mint egy adott távolság, akkor azokat a szegmeneket ki kell vágni és csak a maradékot összekötni a főtengellyel.
    # A távolság alapértlmezett értéke: 100 m
        
        MAIN_ROAD_BUFFER=0.001
        v.buffer input=least_cost_route output=least_cost_route_buffer distance=$MAIN_ROAD_BUFFER --overwrite
        v.overlay -t ainput=stream atype=line,auto binput=least_cost_route_buffer operator=not output=stream_not_in_buffer --overwrite

    
    
        

    
    # --------------------------------------------
    
    r.stream.extract elevation=$DEM threshold=1000 d8cut=1 stream_length=100 stream_vector=stream --overwrite
    # connect streams endpoint to least_cost_route map:
    v.distance -pa from=least_cost_route to=stream upload=dist output=connect to_type=line --overwrite
    
    
    v.db.droptable -f map=least_cost_route
    v.db.droptable -f map=connect
    v.db.droptable -f map=stream
    
    v.db.addtable map=least_cost_route columns="level INT"
    v.db.update map=least_cost_route column=level value=1
    
    v.db.addtable map=connect columns="level INT"
    v.db.update map=connect column=level value=2
    
    v.db.addtable map=stream columns="level INT"
    v.db.update map=stream column=level value=2
    
    v.patch -e input=connect,least_cost_route,stream output=iauai_calculated_roads --overwrite 

    
    v.out.ogr input=least_cost_route output=$GEOSERVER/iauai/iauai_least_cost_route.gpkg format=GPKG --overwrite
    v.out.ogr input=project_area output=$GEOSERVER/iauai/iauai_project_area.gpkg format=GPKG --overwrite
    v.out.ogr input=points type=point output=$GEOSERVER/iauai/iauai_endpoints.gpkg format=GPKG --overwrite
    v.out.ogr input=iauai_calculated_roads output=$GEOSERVER/iauai/iauai_calculated_roads.gpkg format=GPKG --overwrite
    
    # r.cost input=specific_costs output=cost_map start_points=start_point stop_points=stop_point --overwrite
    # r.drain input=cost_map output=least_cost_route drain=least_cost_route start_points=stop_point --overwrite
exit
    
    START_N=$(v.info -g map=start_point | head -n1 | cut -d"=" -f2);
    START_E=$(v.info -g map=start_point | head -n3 | tail -n1 | cut -d"=" -f2);
    STOP_N=$(v.info -g map=stop_point | head -n1 | cut -d"=" -f2);
    STOP_E=$(v.info -g map=stop_point | head -n3 | tail -n1 | cut -d"=" -f2);

    echo "---------------------------"
    echo $START_N;
    echo $START_E;
    echo $STOP_N;
    echo $STOP_E;
    echo "---------------------------"
    
