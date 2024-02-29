import sys
import os
import geopandas as gpd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import numpy as np
from pandas.plotting import table
import glob
import pandas as pd
from pypdf import PdfWriter


STATE_LGD_CODE=sys.argv[1]
FILE_NAME=sys.argv[2]
HOME_DIR=os.path.expanduser("~")

print("district:"+STATE_LGD_CODE)
print("file name:"+FILE_NAME)

#print(os.path.isdir("~/cityapp_temp"))

#Import URC map
india_dist_map = gpd.read_parquet(HOME_DIR+"/cityapp/geoserver_data/india/urc_strategy_final.parquet")

#Filter the map for the selected state 
dist_map =  india_dist_map[india_dist_map.State_LGD == int(STATE_LGD_CODE)]

#Drop geometry and filter relevant columns
df2 = pd.DataFrame(dist_map.drop(columns='geometry')).filter(items=['State_Name','District.Name..In.English.','fsm_req','urc_strategy','Flush_Septic_nfhs','prop_min','plugin_percent'])
#df2 = df1.loc[df1["fsm_req"].isin(["Yes"]),['District Name (In English)','fsm_req']]

#Rename columns
df2.rename(columns={"State_Name":"State Name",
                    "District.Name..In.English.":"District Name",
                    "fsm_req":"FSM Priority",
                    "urc_strategy":"URC Priority",
                    "Flush_Septic_nfhs":"% Rural HH with Septic Tank",
                    "prop_min":"% Area with GW (0-5m)",
                    "plugin_percent":"% Rural covered by URC"},inplace=True)
#Name of the state
STATE_NAME=df2.values[0][0]

#Reset the index from 1
df2.index = np.arange(1,len(df2)+1)

#Number of pdf pages required for the tables
if(len(df2)<=30):
    n_page=1
else:
    n_page=round(len(df2)/30)+1

#Save tables as pdf
i=1
print_map=False
while(i<=n_page):
    fig, ax = plt.subplots(1,1, figsize=(15, 10))
    ax.xaxis.set_visible(False)  # hide the x axis
    ax.yaxis.set_visible(False)
    ax.set_frame_on(False)
    #ax.set_title("Fecal Sludge Management Priority: "+STATE_NAME)
    ax.annotate('Source: % Rural HH with Septic Tank - NFHS, 2019-20;% Area with GW (0-5m) - WRIS; % Rural covered by URC - Census 2011 ',xy=(0.1, .08),xycoords="figure fraction", 
            horizontalalignment="left", verticalalignment="top", fontsize=8, color="#555555")
    if(i==1):
        table(ax, df2[0:30], loc="center")
        plt.suptitle("Rural Sanitation Strategy for URC: "+STATE_NAME)
        plt.title("List of Districts:"+STATE_NAME)
        plt.savefig(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/"+"page_"+str(i)+".pdf")
        plt.close()
    elif(i==n_page):
        
        table(ax, df2[30*(i-1):len(df2)], loc="center",cellLoc="center")
        plt.suptitle("Rural Sanitation Strategy for URC: "+STATE_NAME)
        plt.title("List of Districts:"+STATE_NAME)
        plt.savefig(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/"+"page_"+str(i)+".pdf")
        plt.close()
    else:
        table(ax, df2[30*(i-1):30*i], loc="center")
        plt.suptitle("Rural Sanitation Strategy for URC: "+STATE_NAME)
        plt.title("List of Districts:"+STATE_NAME)
        plt.savefig(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/"+"page_"+str(i)+".pdf")
        plt.close()
    i=i+1

#Save FSM Map as pdf
fig, ax = plt.subplots(1, figsize=(15, 10))
ax.set_title("Fecal Sludge Management Priority: "+STATE_NAME)
ax.annotate('Source: State and District Boundary: Survey of India',xy=(0.1, .08),xycoords="figure fraction", 
            horizontalalignment="left", verticalalignment="top", fontsize=8, color="#555555")
dist_map.plot(column="fsm_req", categorical=True,linewidth=0.8, ax=ax, edgecolor='0.8',cmap="tab10", legend=True)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1.15,0.5))
ax.axis('off')
plt.savefig(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/"+"map_1.pdf")
plt.close()

#Save URC Map as pdf
fig, ax = plt.subplots(1, figsize=(15, 10))
ax.set_title("Urban Rural Convergence Priority: "+STATE_NAME)
ax.annotate('Source: State and District Boundary: Survey of India',xy=(0.1, .08),xycoords="figure fraction", 
            horizontalalignment="left", verticalalignment="top", fontsize=8, color="#555555")
dist_map.plot(column="urc_strategy", categorical=True,linewidth=0.8, ax=ax, edgecolor='0.8',legend=True,cmap="tab10")
leg = ax.get_legend()
leg.set_bbox_to_anchor((1.15,0.5))
ax.axis('off')

plt.savefig(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/"+"map_2.pdf")
plt.close()


#Merge the table and map pdf
filelist=glob.glob(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/*.pdf")
print(filelist.sort())

merger = PdfWriter()

for pdf in filelist:
    print(pdf)
    merger.append(pdf)

merger.write(HOME_DIR+"/cityapp/webapp/public/download_file/merged-pdf.pdf")
merger.close()

#Delete all single page pdf 
filelist_temp=glob.glob(HOME_DIR+"/cityapp/saved_results/sanitation_strategy/temp/*.pdf")
for f in filelist_temp:
   os.remove(f)

 