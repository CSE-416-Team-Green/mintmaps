# MintMaps

![LOGO](public/logo-green.svg)
MintMaps is an application where users can create and share map graphics with an emphasis on community features

## Our Team

MintMaps was created by Jia Lin, Keli Chen, Ava Aloi, and Ramy Abdulazziz for CSE 416. 

# Our Deployment

MintMaps is running on an ubuntu EC2 Server at [mintmaps.site](https://mintmaps.site) - for any server issues during grading please contact ramy.abdulazziz@stonybrook.edu to restart. 

# Tests

## Front End
[Front End Tests](/cypress/e2e/)
## Back End
[Back End Tests](/__tests__/)

# Our Database

We are using MongoDB as our database for this application 

# Our FrontEnd

We are using React.js for our frontend along and MUI for components and styling

# Our Backend

Our backend works with Next.js api folder structure using Node.js and Express


# Using The Application 

## Account Creation and Log In

You may sign in with Google or create an account to create an account navigate to our [signup page](https://mintmaps.site/login) and click SIGN UP. Then you may go back and sign into the application.

![AccountCreate](/public/AccountCreate.png)

## Home Page and Searching

Once in the application you will be sent to the home page, where you can see recently uploaded and featured maps

![home](/public/home.png)

## Map Info

You can click on any map you see and go to our map info page where you can like, comment, download, and perform other social features

![mapinfo](/public/mapinfo.png)

The map info page also has all of our export and forking features

![export](/public/export.png)

In this area you can like and dislike, export as an image first selecting your desired format, share via a link, fork the application, download our custom .mintmaps file, and bookmark the map to save for later. You may also follow the user who created the map if you like. When viewing a map you created a special Pencil icon will be available if youd like to edit it further. 

## Creating a new map

To create a new map click the map icon in the header 

![creatmap](/public/newmap.png)

You will prompted to upload your map file, which can be a .geo.json, .kml, .shp, or our custom .mintmaps file. You may also use one of our default maps.

![upload](/public/upload.png)

You can then choose the map graphic type you wish to create. This cannot be changed once selected: 

![type](/public/maptype.png)

Then enter your title and tags. These can be changed later, and tags should be seperated by a comma.


![tags](/public/titleandtag.png)

Congrats! You have created a map and are taken to our map editing page: 

![edit](/public/beforeupload.png)

In the general tab you can update the title, description, and add tags: 

![general](/public/general.png)

In the overview tab you can select a map property to use as your data, and edit data and names (hit enter when done editing to update): 


![overview](/public/overview.png)

In the legend tab you can adjust the legend colors: 

![legend](/public/legend.png)

To undo or redo hover over the floating action button, and if you have a undo or redo available you may select to do so: 

![undo](/public/undo.png)

The third and topmost button is for adding new properties to the map that youd like to map against, upon selection a modal will appear to prompt you for the name and initial value:


![modal](/public/modal.png)

The new property will then be available in the Data to Map dropdown, and will have to be edited for every region. If you are creating a point map - and want to add a point afte this step, click on the map where you want to add your point. Now if you are satisfied with your map go back to the general tab and hit upload! Here you will be able to select if youd like the map to be public or private. When you're ready hit upload again and you're all done! If you want to make more changes, instead hit back: 

![complete](/public/whenupload.png)














