
# Introduction to CPR and SCI-FI
CPR is one of India's leading public policy think tanks since 1973 dedicated to conducting research that contributes to the production of high-quality scholarship, better policies, and a more robust public discourse about the structures and processes that shape life in India. The Scaling City Institutions for India(SCIFI) programme, nested at CPR since 2013, aims to better understand 'governance scale' in Indian cities in tandem with 'sector-specific socioeconomic scales'. Through research, the programme aims to inform stakeholders, including the three tiers of the government, to develop better-informed and innovative policies and programmes enabling improved governance and service delivery. 

# Introduction to CityApp
CityApp is an adaptation of the Open City Toolkit (OCT) by SCI-FI. It was developed with support from Foreign, Commonwealth & Development Office(FCDO) and Omidyar Network(ON) in consultation with Housing & Urban Development Department (HUDD), Odisha for geospatial analytics for decision-making. The underlying data has come from various sourced including HUDD, Odisha, Odisha Space Applications Centre (ORSAC), Central Groundwater Board (CGWB), Urban Local Bodies. The detailed list of data sources is mentioned below. In addition to the above, spatial analysis of the primary data from SCI-FI studies is also available through the CityApp.

# Open City Toolkit
The Open City Toolkit (OCT) was developed in cooperation between the CityScienceLab of the HafenCity University Hamburg (HCU) and Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH (GIZ) in India and Ecuador. It is an open source tool and the software for this project is based entirely on open source components. The Open City Toolkit is a web-based geographic information system (GIS) for multi-touch tables that is optimised for the use by non-GIS-experts. It supports integrated and participatory urban planning processes, fostering dialogue between governments and citizens and exchange of knowledge and data between government departments. The main functionality of the Open City Toolkit is to visualise and analyse complex urban data, jointly among local practitioners and with citizens.

**#Installation of the CityApp**

## Requirements

The Open City Toolkit is a framework connecting several external tools in order to implement a flexible and easy-to-use web GIS solution. A Linux system equipped with several applications is required as a base system:

1. GeoServer
1. GRASS GIS
1. Gnuplot
1. enscript
1. ghostscript
1. inotify-tools
1. Node.js

The following instructions provide guidance for the installation of all required components.

## Installation

### With Docker

You can quickly set up a running system via [Docker](https://docs.docker.com/).

Before building the image, environment variables need to be set in `webapp/.env`:
- `GEOSERVER_URL`: The base URL of the local GeoServer instance. This should normally be the public IP or domain of the server, port 8080.
- `INITIAL_LAT`, `INITIAL_LON`: Initial center coordinates for the map view.

It is also required to create these directories:
```
mkdir geoserver_data_dir/data
mkdir grass/global
```

Build the Docker image:
```
docker build -t oct .
```

Start a container using the newly created image.
```
docker run -dti -v `pwd`/geoserver_data_dir:/usr/share/geoserver/data_dir -v `pwd`/grass:/root/cityapp/grass -p 3000:3000 -p 8080:8080 --name oct oct
```

If you want to override any environment variables, you can do so using the `-e` option:
```
docker run -dti -e GEOSERVER_URL=... -e INITIAL_LAT=... -e INITIAL_LON=... -v `pwd`/geoserver_data_dir:/usr/share/geoserver/data_dir -v `pwd`/grass:/root/cityapp/grass -p 3000:3000 -p 8080:8080 --name oct oct
```

The `geoserver_data` and `grass` directories are mounted into the container as volumes in order to make their contents persistent.

While the container is running, the app is served at http://your-server:3000 and GeoServer is available at http://your-server:8080/geoserver/.

### Without Docker

#### Operating system

A Linux system is required. Neither the kernel version, nor the flavour has any significance. Nevertheless, a modern and up-to-date Linux environment is highly recommended.

#### Installation directory

It is recommended to install the app into a home directory of a dedicated user created for this purpose (e.g., `cityapp_user`). This is to clearly separate the data stored in the `cityapp` directory and to allow data management through file permissions. Here it is assumed that the dedicated user's home directory is `/home/cityapp_user`.

#### External components

##### Geoserver

Use a current stable version of GeoServer, at least version 2.15. The expected path of the GeoServer data directory on your system is `/usr/share/geoserver/data_dir/data`, therefore it is required to install GeoServer into `/usr/share/geoserver`.

1. Download a platform independent, fresh, binary version of GeoServer from geoserver.org. It is a zipped file, ready to run after unzip.

2. Create a GeoServer directory:
```
sudo mkdir /usr/share/geoserver
```
3. Allow `cityapp_user` to access that directory. First change owner, and set `cityapp_user` as owner of the GeoServer directory:
```
sudo chown cityapp_user /usr/share/geoserver
```
4. Copy zipped GeoServer to this new directory
```
cp Download/geoserver-2.17.0-bin.zip /usr/share/geoserver
```
5. Unzip:
```
cd /usr/share/geoserver
unzip ./geoserver-2.17.0-bin.zip
```
6. Set permissions of startup and shutdown script:
```
chmod 744 /usr/share/geoserver/bin/startup.sh
chmod 744 /usr/share/geoserver/bin/shutdown.sh
```

Geoserver is now ready to run, but not yet ready to use with the app.

7. Stylesheets are in CSS format, therefore it is required to install a CSS extension for GeoServer. For this end first download the extension from the Geoserver site: https://docs.geoserver.org/latest/en/user/styling/css/install.html

8. Copy the downloaded zip file:
```
cp ~/Download/geoserver-2.16.0-css-plugin.zip /usr/share/geoserver/webapps/geoserver/WEB-INF/lib/
```
9. Unzip copied file:
```
cd /usr/share/geoserver/webapps/geoserver/WEB-INF/lib/
unzip /usr/share/geoserver/webapps/geoserver/WEB-INF/lib/geoserver-2.16.0-css-plugin.zip
```
Geoserver is now able to interpret CSS stylesheets.

10. After installing Geoserver, it is required to create a symbolic link pointing to `~cityapp/geoserver_data`, because GRASS GIS will export the results to that directory.
```
ln -s ~/cityapp/geoserver_data /usr/share/geoserver/data_dir/data/cityapp
```

Maps generated by OCTK require an adequate symbology too, stored as “workspace” in GeoServer’s “workspaces” directory. This new symbology is prepared for OCTK, therefore it can’t be found in the default installation of Geoserver. The `~/cityapp/geoserver_workspaces` directory is used to store these settings in subdirectories named `raster` and `vector`. Those are predefined GeoServer workspaces that need to be linked to the workspaces directory of GeoServer.
```
ln -s ~/cityapp/geoserver_workspaces/raster /usr/share/geoserver/data_dir/workspaces/raster
ln -s ~/cityapp/geoserver_workspaces/vector /usr/share/geoserver/data_dir/workspaces/vector
```

##### GRASS GIS

GRASS GIS is the core component of the backend: a highly developed generic purpose, cross-platform GIS system. It is required to install GRASS GIS version 7.1 or newer. The GRASS GIS installation path has no importance. Download GRASS GIS from: https://grass.osgeo.org/

On a Debian-based system:
```
apt-get install grass
```

For other systems and for further info, please visit: https://grasswiki.osgeo.org/wiki/Installation_Guide

##### Gnuplot

Gnuplot is used to create various data visualizations and export them into PNG format, allowing the browser to display them. Gnuplot is a default component of most Linux distributions, but if your installed system does not contain it, it can be downloaded from http://www.gnuplot.info/.

On a Debian-based system:
```
apt-get install gnuplot
```

##### Node.js

Node.js is a crucial component to run the frontend, therefore it has to be installed properly. Version 12 or higher is required. The recommnded way of installing Node.js in Linux is via [NodeSource](https://github.com/nodesource/distributions) (follow the instructions for your distribution).

On a Debian system:
```
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```

Now change to the webapp directory:
```
cd ~/cityapp/webapp
```
and, before you start the server for the first time, you must run:
```
npm install
```

##### Enscript/Ghostscript

Enscript is a command line tool to convert text files to PostScript, HTML, RTF, ANSI. It is used to create statistical output. If not installed, then:
```
apt-get install enscript
```

Ghostscript is a package containing tools to manage postscript files, including a ps to pdf converter too. If not installed, then:
```
apt-get install ghostscript
```

## Running the app

### GIS backend

To start the backend, run:
```
~/cityapp/scripts/base/ca_starter.sh
```

To stop it:
```
~/cityapp/scripts/base/ca_shutdown.sh
```

### Web app

First change to the `webapp` directory. Before you start the server for the first time, you must run:
```
npm install
```

You must also set the environment variables in the `.env` file. The variables `DATA_FROM_BROWSER_DIR` and `DATA_TO_CLIENT_DIR` refer to the respective directories. The `GEOSERVER_URL` must point to the public URL of the GeoServer instance, which will be running on port 8080. If this is anything other than localhost, change the URL accordingly.

Now to start the server, run:
```
node app.js
```

Open a browser at http://localhost:3000 and you should see the app's user interface.

If you want to use the server in production, it is recommended to use the process manager [pm2](https://pm2.keymetrics.io/). To install it, run:
```
sudo npm install -g pm2
```
To start a process for Cityapp:
```
pm2 start ~/cityapp/webapp/app.js --name=cityapp
```
