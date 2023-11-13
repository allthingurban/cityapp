/* eslint-disable no-undef */


//  This map script containes Bhubaneshwar local layers too. Therefore it is not for generick purposes.

const map = new L.Map('map', {
    center: new L.LatLng(lat, lon),
    zoom: 5,
    minZoom: 4,
    zoomControl: false 
})

//Add base maps
var basemaps = [
    L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Toner Lite'  // optional label used for tooltip
    }),
    L.tileLayer('//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        label: 'Toner'
    }),
    L.tileLayer('//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        maxZoom: 16,
        minZoom: 1,
        label: 'Watercolor'
    }),
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        label: 'OSM'
    }),
    L.tileLayer('https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=lUBQykSzOMZD1cJ1yPzi',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true,
        label: 'Satelite'
    })
];

//add basemaps
map.addControl(L.control.basemaps({
    basemaps: basemaps,
    tileX: 0,  // tile X coordinate
    tileY: 0,  // tile Y coordinate
    tileZ: 1   // tile zoom level
}));
        
//India-wide layers
    
const india_states = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:india-states',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1
});


// added water stress
const wri_india = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:wri_india',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});


    // added water monitoring-2020       
const nwmp_monitoring = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:nwmp_monitoring',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1
});

 // adding major rivers csdms
const major_rivers_india_csdms = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:major_rivers_india_csdms',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1
});


//Added NASA EARTH SEDAC

const india_sedac = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:india_sedac',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom:1,
    legend_yes:true, 
});

                            
const india_districts = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:india_districts',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const india_towns = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:india_sts_class_up',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const india_town_heatmap = L.tileLayer.wms(geoserverUrl + 'geoserver/raster/wms', {
    layers:'raster:india_urban_heatmap',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom:1,
});
const ldv_heatmap = L.tileLayer.wms(geoserverUrl + 'geoserver/raster/wms', {
    layers:'raster:ldv_heatmap',
    format: 'image/png',
    transparent:true,
    legend_yes: false,
    maxZoom: 20,
    minZoom:1,
});

const ldv_geopoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ldv_geopoints',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});



const india_built = L.tileLayer.wms(geoserverUrl + 'geoserver/raster/wms', {
    layers: 'raster:india_built',
    format: 'geotiff',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const rural_sanitation_strategy = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
	layers: 'vector:rural_sanitation_strategy',
	format: 'image/png',
	transparent: true,
	legend_yes: true,
	maxZoom: 20,
	minZoom: 1,
});

const india_lulc_ghsl_ruraldensity = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_ruraldensity',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const india_lulc_ghsl_urbandensity = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_urbandensity',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const india_lulc_ghsl_urbanisation = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_urbanisation',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const india_lulc_ghsl_highdensity_settlement = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_highdensity_settlement',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_ghsl_mediumdensity_settlement = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_mediumdensity_settlement',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_ghsl_suburban_settlement = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_suburban_settlement',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_ghsl_rural_settlement = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:ghsl_rural_settlement',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_builtup = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:lulc_builtup',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_water = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:lulc_water',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const india_lulc_cultivation = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:lulc_cultivated',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const india_pop_density_2020 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:india_pop_density',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const nwmp_monitoring_settlement = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:nwmp_monitoring_settlement',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const nwmp_monitoring_bod = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:nwmp_monitoring_bod',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const nwmp_monitoring_fc = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:nwmp_monitoring_fc',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
      
// Odisha-wide  layers
                
const Odisha_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_population_1_sq_km',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});
    
const Dem = L.tileLayer.wms(geoserverUrl + 'geoserver/raster/wms', {
    layers: 'raster:odisha_dem',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const waterLines = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:water_lines_osm',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
});

const roads = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:lines_osm',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
});

const buildings = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:polygons_osm',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
});

                         

const Odisha_Waterlevel_3m = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_groundwater_3m',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});

const Odisha_Waterlevel_Orig = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_original_groundwater_map',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});
                            

const odisha_rivers = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_rivers',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1
});
                
const odisha_river_basins = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_river_basins',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});
                            
                            
const odisha_fstps_status = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_fstps_status_final',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
    });
    
        
const odisha_built = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_built',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
    });   
                            
                            
// Local layers for Dhenkanal District

const Dknl_District_Panchs = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_district_dknl_panch',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_District_Sanit_Survey = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:odisha_district_dknl_sanitation_survey',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});


const Dknl_Plugin = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_plugin',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Greenfield = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_greenfield',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

// Local layers (Dhenkanal)
    
const Dknl_Municipal_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_municipal_boundary',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Ward_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_ward_boundaries',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Road_Network = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_road_network',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});


const Dknl_Landuse = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_landuse',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});    

const Dknl_Water_Pipelines = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_water_pipelines',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Water_Supply_Infrastucture = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_water_supply_infrastructure',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});  

const Dknl_Drinking_Water_Souces = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_drinking_water_sources',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
        
const Dknl_Stormwater_Infrastructure = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_storm_water_infrastructure',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Solid_Waste_Hotspot = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_solid_waste_hotspot',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Waste_Water_Treatment_Hotspot = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_waste_water_treatment_hotspot',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
        
    const Dknl_fstp = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_fstp',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Public_Toilets = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_public_toilets',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Solid_Waste_Infrastucture = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_solid_waste_infrastucture',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Educational_Institutions = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_educational_institutions',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Marketplaces = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_marketplaces',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});
        
// Dhenkanal slum layers or slum-related layers
        
const Dknl_Slum_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_jaga_slum_boundary',
    format: 'image/png',
    transparent: true,
    legend_yes: false,
    maxZoom: 20,
    minZoom: 1,
});


const Dknl_Slum_House_Wall_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_jaga_slum_house_wall_types',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Slum_House_Avg_Income = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_jaga_slum_households_average_income',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Dknl_Slum_House_EWS_Proof = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_jaga_slum_households_EWS_proof',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});        

const Dknl_Revenue_Land_Tenancy_Status = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_lands_tenancy_status',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});        

const Dknl_Revenue_Land_Tenancy_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_area_tenancy_types',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});    

const Dknl_Revenue_Land_Definite_Tenancy_Areas = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_definite_areas',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});    

const Dknl_Slum_Houses_By_Tenancy = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:dknl_slum_houses_by_tenancy',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});    
// Local layers (Bhubaneshwar)
// Watch out the property 'legend_yes'. 
//t must be  true if you want to allow a second checckbox to display 
//(refer to views/launch/legend.js and views/index.pug)   
        
const Bbswr_Metropolitan_Area = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bubaneshwar_metropolitan_area',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Bbswr_City_Zone = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bubaneshwar_city_zone',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Slum_Areas = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slums',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
const Slum_Total_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_total_population_households',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Female_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_female_population_households',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Male_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_male_population_households',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

const Empty_Place_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_empty_place_types',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Empty_Place_Category= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_empty_places_category',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Land_Ownership = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:land_owners',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slums_Empty_Ownership = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:empty_places_ownership',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slum_Ownerhip = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: '	vector:bbswr_slum_ownership',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slum_Religions = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_religions',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Monthly_Incomes = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_average_incomes',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});            
    
const Animals = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_animals',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slums_Bathrooms = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_bathrooms',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slum_Tapwater = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_tapwater',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});
    
const Slum_Toilettes = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:bbswr_slum_toilettes',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1,
});

//Processed layers

const drawnItems = L.featureGroup().addTo(map);

const query_area_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_area_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
    });

    const query_result_area_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_result_area_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
    });


const query_result_point_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_result_point_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
});

    
// Time map layers
const Stricken_Area = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_stricken_area',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});

const TimeMap = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_time_map',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
});

const FromPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_from_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});

const ViaPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_via_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});

const AccessibilityMap = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1b_accessibility_map',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 3
});
    
const AccessibilityPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1b_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});
    
// Module_10 layers
    
const Module_10_Roads= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_calculated_roads',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 3
});

const Module_10_Endpoints= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_endpoints',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});    

const Module_10_Area= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_project_area',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
});


var indiaOverlayMaps={
    'Indian states': india_states,
    'Indian districts': india_districts,
    'India towns':india_towns,
    'Major Rivers(CSDMS)':major_rivers_india_csdms, //added MAjor Rivers csdms
    'Water Monitoring':nwmp_monitoring, //added water monitoring    
    'Water Stress': wri_india, // added wri_india
    'Large Dense Villages(LDV)': ldv_geopoints, // added Geopoints -pabitra    
    'LDV Heatmap':ldv_heatmap,
    'Urbanisation Heatmap':india_town_heatmap,
    'NASA EARTH(SEDAC)': india_sedac,// added NASA EARTH SEDAC
    'Rural Sanitation Strategy': rural_sanitation_strategy,
};

var OdishaOverlayMaps={
    'Odisha urban classification (SEDAC)':odisha_built,
    'Odisha population by 1 sq km': Odisha_Population,
    'Odisha original groundwater map':Odisha_Waterlevel_Orig,
    'Odisha water lines': waterLines,
    'Odisha river basins': odisha_river_basins,
    'Odisha FSTPs': odisha_fstps_status,
    'Odisha major rivers': odisha_rivers,
    'Odisha roads': roads,
    'Odisha buildings': buildings,
                         
};

var RUConvergenceOverlayMaps={
    'Panchs of Dhenkanal District':Dknl_District_Panchs,
    'Dhenkanal district sanitation survey':Dknl_District_Sanit_Survey,
    'Dhenkanal plug-in clusters':Dknl_Plugin,
    'Dhenkanal greenfield clusters':Dknl_Greenfield,
                         
};

var DhenkanalOverlayMaps={
    "Dhenkanal municipal boundary":Dknl_Municipal_Boundary,
    "Dhenkanal ward boundaries":Dknl_Ward_Boundary,
    "Dhenkanal road network":Dknl_Road_Network,
    "Dhenkanal landuse":Dknl_Landuse,
    "Dhenkanal water pipelines":Dknl_Water_Pipelines,
    "Dhenkanal water supply infrastructure":Dknl_Water_Supply_Infrastucture,
    //"Dhenkanal drinking water sources":Dknl_Drinking_Water_Souces,
    "Dhenkanal storm water infrastucture ":Dknl_Stormwater_Infrastructure,
    //"Dhenkanal solid waste hotspot":Dknl_Solid_Waste_Hotspot,
    "Dhenkanal wastewater hotspots":Dknl_Waste_Water_Treatment_Hotspot,
    "Dhenkanal FSTP":Dknl_fstp,
    "Dhenkanal public toilets":Dknl_Public_Toilets,
    "Dhenkanal solid waste infrastucture": Dknl_Solid_Waste_Infrastucture,
    "Dhenkanal educational institutions": Dknl_Educational_Institutions,
    "Dhenkanal commercial- and marketplaces": Dknl_Marketplaces,
    "Dhenkanal revenue tenancy status": Dknl_Revenue_Land_Tenancy_Status,
    "Dhenkanal revenue tenancy types": Dknl_Revenue_Land_Tenancy_Types,
    "Dhenkanal definite tenancy areas": Dknl_Revenue_Land_Definite_Tenancy_Areas,
    "Dhenkanal slums":Dknl_Slum_Boundary,
    "Dhenkanal slum house wall types":Dknl_Slum_House_Wall_Types,
    "Dhenkanal slum households average yearly income":Dknl_Slum_House_Avg_Income,
    "Dhenkanal slum households with EWS proof":Dknl_Slum_House_EWS_Proof,
    "Dhenkanal slum houses by tenancy": Dknl_Slum_Houses_By_Tenancy,                     
};

var BhubaneswarOverlayMaps={
    "Bubaneshwar metropolitan area":Bbswr_Metropolitan_Area,
    "Bubaneshwar city zone":Bbswr_City_Zone,
    "Slums of Bubaneshwar":Slum_Areas,
    "Total population by households":Slum_Total_Population,
    "Female habitanst by households":Female_Population,
    "Male habitanst by households":Male_Population,
    "Open/Vacant empty places":Empty_Place_Types,
    "Dry/Green empty places ":Empty_Place_Category,
    "Land ownership in Bubaneshwar":Land_Ownership,
    "Ownership of empty areas":Slums_Empty_Ownership,
    "Ownerhips of slum houses":Slum_Ownerhip,
    "Religions by households":Slum_Religions,
    "Monthly average incomes per household":Monthly_Incomes,
    "Household with/without livestocks":Animals,
    "Bathroom facilities in the slums":Slums_Bathrooms,
    "Water accessibility in slums":Slum_Tapwater,
    "Toilette facilities in the slums":Slum_Toilettes,               
};

var moduleMaps={
    'Query area 1': query_area_1,
    'Query results 1': query_result_area_1,
    'Query result points': query_result_point_1,
    "Road-level time map": TimeMap,
    "From-points": FromPoints,
    "Via-points": ViaPoints,
    "Stricken area": Stricken_Area,
    "Accessibility map": AccessibilityMap,
    "Accessing points": AccessibilityPoints,
    "Calculated road network": Module_10_Roads,
    "Endpoints of calculated road network":Module_10_Endpoints,
    "Project area":Module_10_Area,             
};

var indiaUrbanMaps={ 
    '% Area change: Rural Densification(1990-2020)':india_lulc_ghsl_ruraldensity,
    '% Area Change: Rural to Urban(1990-2020)':india_lulc_ghsl_urbanisation,
    '% Area Change: Urban Densification (1990-2020)':india_lulc_ghsl_urbandensity,
    '% High Density Settlement':india_lulc_ghsl_highdensity_settlement,
    '% Medium Density Settlement':india_lulc_ghsl_mediumdensity_settlement,
    '% Suburban Settlement':india_lulc_ghsl_suburban_settlement,
    '% Rural Settlement':india_lulc_ghsl_rural_settlement,
    '% Area: Builtup':india_lulc_builtup,
    '% Area: Water':india_lulc_water,
    '% Area: Cultivation':india_lulc_cultivation,
    'Avergae Population Density(2020)': india_pop_density_2020,
};

var IndiaWaterPollutionLayers={
    'Water Monitoring (Settlement Type)': nwmp_monitoring_settlement,
    'Water Pollution (BOD) Level': nwmp_monitoring_bod,
    'Water Pollution (FC) Level': nwmp_monitoring_fc,
}

var options_India = {
    position: ["topleft"],
};

var options_other = {
    position: ["topright"],
};

//Control for map legends. For those item, where the linked map has a "legend_yes: true," property, a second checkbox will displayed.
            
L.control.legend(
    {
        position:'bottomleft'
        
    }
).addTo(map);


var layercontrol=L.control.layers(null,indiaOverlayMaps,options_India).addTo(map);
var layercontrol=L.control.layers(null,OdishaOverlayMaps,options_other).addTo(map);
var layercontrol=L.control.layers(null,BhubaneswarOverlayMaps,options_other).addTo(map);
var layercontrol=L.control.layers(null,DhenkanalOverlayMaps,options_other).addTo(map);
var layercontrol=L.control.layers(null,RUConvergenceOverlayMaps,options_other).addTo(map);
var layercontrol=L.control.layers(null,indiaUrbanMaps,options_India).addTo(map);
//var layercontrol=L.control.layers(null,moduleMaps,options_other).addTo(map);



            
// others

    map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: { allowIntersection: false }
        },
    draw: {
        polygon: {
        allowIntersection: false,
        showArea: true,
        fill: '#FFFFFF',
            },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: true
        }
        }));

const featureGroup = L.featureGroup().addTo(map);
    map.on('draw:created', (saving_draw) => {
    /* Creating a new item (polygon, line ... ) will be added to the feature group */
    featureGroup.addLayer(saving_draw.layer);
    });

    map.on(L.Draw.Event.CREATED, (event) => {
    drawnItems.addLayer(event.layer);
    });

/* scale bar */
    L.control.scale({ maxWidth: 150, position:'bottomright'}).addTo(map);
