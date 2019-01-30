# OSU Carbon Calculator
## NOTE: This is NOT the actual Carbon Calculator.
This repo is being used for temporary GitHub pages hosting. The real Carbon Calculator is [here.](https://github.com/OSU-Sustainability-Office/osu_carbon_calculator_update_project)

## Introduction
This carbon footprint calculator has been developed to help members of the Oregon State University community understand the connection between their everyday actions and their carbon emissions. This is an important step in [Oregon State University’s initiative to be carbon neutral by 2025](http://fa.oregonstate.edu/sustainability/planning-policy-assessment/institutional-carbon-neutrality/osu-carbon-planning). This calculator was originally created by OSU grad students, and was based on a calculator developed by Santa Clara University. For more information, please visit [their website](http://www.scu.edu/ethics/practicing/focusareas/environmental_ethics/carbon-footprint/create_calc.html).

This document aims to describe how our Carbon Calculator works. It's divided into the following sections:

  1. Repo File Structure & Deployment Information (Amazon EC2 Instance)
  2. Frontend Design (HTML/CSS)
  3. Carbon Footprint Calculation (Javascript)
  4. Backend (Javascript/NodeJS/MongoDB)
  5. Data Visualization (Javascript/Chartist)

## Repo File Structure & Deployment information
### File Structure
The file structure is left over from the original carbon calculator. In the root directory, you'll see the following folders:
  * BootFlat - This contains the required files for [BootFlat](http://bootflat.github.io/), an open-source Flat UI kit based on the Bootstrap 3.3.0 CSS framework.
  * CSS - This contains the cascading style sheets for the carbon calculator.
  * download - This folder contains the original "Math and Methodologies" document, describing how the calculator works. It has since been replaced by [this spreadsheet](https://docs.google.com/spreadsheets/u/1/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit?usp=drive_web&ouid=117439531674238196033). The spreadsheet is only viewable by users with ONID access.
  * fonts - This contains all of the font files used by the carbon calculator, in addition to fonts used by other projects hosted on the [carbon calculator's webserver](http://carbon.campusops.oregonstate.edu/).
  * img - This contains images currently (and previously) used by the carbon calculator.
  * js - This contains all of the javascript for the carbon calculator project, including the NodeJS server.
  * php - This contains php scripts used by the carbon calculator.
### Deployment information
The carbon calculator is currently deployed on two different servers. The first is an apache web server, and the second is an Amazon EC2 instance.

Our apache server is hosted through Capital Planning and Development at Oregon State University, and is not maintained by the Sustainability Office. Therefore, we do not have detailed technical information about the server. The carbon calculator is uploaded via FTP as updates/patches are completed.

The Amazon server is an Ubuntu Linux t2.micro EC2 instance hosted at ec2-52-35-112-51.us-west-2.compute.amazonaws.com. Code is manually deployed to the server using SFTP. A .pem keyfile is necessary to connect to the server, and it's located on our internal network drive. These are some useful commands for deploying software to the server:
 * 'forever list' - Lists all forever processes running on the EC2.
 * 'forever stop PID' - Replace PID with the id of a process you would like to stop. PIDs can be found using 'forever list'.
 * 'forever start nodeServer.js' - This starts the carbon calculator's node server. For this to work, make sure you are in the carbonCalculator directory on the EC2 instance.
New software can be uploaded to the server using FileZilla. [Here's a tutorial!](https://superuser.com/questions/322708/accessing-amazon-ec2-in-filezilla-sftp)

## Frontend Design
The carbon calculator was created using off-the-shelf elements from [BootFlat](http://bootflat.github.io/) and [Bootstrap](https://getbootstrap.com/docs/3.3/) APIs. The design was created by Jack Woods with help from Keava Campbell and Ragen Venti for use with laptops, tablets, and mobile devices. Moving forward, all design decisions should be made with accessibility in mind!

The CSS is kind of a mess. Jack originally began editing the Bootstrap.css file itself (he didn't know better at the time), but that has created maintenance issues. The CSS edits can be moved into a separate CSS file, however, finding every edit and copy/pasting it is labor intensive (maybe this can be automated).

## Carbon Footprint Calculation
The entire calculation is performed in [carbon_calculator.js](js/carbon_calculator.js).

Each section of the calculator corresponds to a section in the JS file, delineated by comments. These sections contain the various functions that calculate the impact generated by each question answered by the user.

These values are summed whenever showResult() is called, and are saved into global variables for use in other js files (such as [charts.js](js/charts.js)). For more information regarding the individual calculations, please refer to [this spreadsheet](https://docs.google.com/spreadsheets/u/1/d/1FbkcWkPXmCwyWeBAtjH0eaR_kPtbDcLa3SFdK2iswAY/edit?usp=drive_web&ouid=117439531674238196033) (only accessible by OSU community members with ONID).

## Backend
The carbon calculator is implemented using a RESTful structure comprized of four pieces: the client's machine, the apache webserver, the nodeJS server, and the database.

When the client views their results, the javascript creates an XMLHttpRequest object and GETs/POSTs to [getUserLocation.php](php/getUserLocation.php) and [userInfo.php](php/userInfo.php) respectively.

These PHP files are hosted on our apache webserver, and exist solely to circumvent Cross-Domain access errors. JSONP and CORS would be suitable alternatives, however, the Sustainability Office has limited resources and Jack decided to quickly create these php files instead.

[getUserLocation.php](php/getUserLocation.php) uses [freeGeoIP.net](http://freegeoip.net/) to retrieve simple location data using the user's IP address in JSON format. This information is collected so our office can better understand who is accessing the calculator.

[userInfo.php](php/userInfo.php) sends GET requests to the nodeJS server hosted on our EC2 instance. These requests retrieve/store user-specific data in JSON format.

ONID login capabilities are handled by OSU's Central Authentication Services (CAS), and are not processed by our backend. For more information, visit [the CAS website](http://onid.oregonstate.edu/docs/technical/cas.shtml).

## Data Visualization
Data visualization is all handled in [charts.js](js/charts.js) and is implemented using [Chartist](https://gionkunz.github.io/chartist-js/). The chartist API has been slightly modified to fix display-related bugs. Please consult the commit log for more information regarding tooltip display issues.

The graphs themselves are responsive SVG images, which are manipulated each time showResult() is called in [carbon_calculator.js](js/carbon_calculator.js). Their styling elements can be changed in [charts.css](CSS/charts.css), if needed.
