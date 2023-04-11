# SocketIO-Express-Unity.2020
An updated version of the Socket.io protocol for Unity (2020) compatible with WebGL builds

The history of SocketIO and Unity is a succession of incremental updates and small projects that somehow stopped when Unity decided to incorporate a cheap (but still not free) SocketIO plugin in their store.

Other repos exists, but I only found one which provided a tool compatible with WebGL (on top of other platforms):
https://github.com/KyleDulce/Unity-Socketio

Since that project is not actively maintained it required a workaround to make it work with new versions of Unity. My repo is also not actively maintained and relies largely on the work of KyleDulce (Socket methods are described in the Wiki of their repository), but it is updated and it contains a new WebGL template and additional tips that avoid to implement the workaround and help making the protocol work with newer versions of Unity.

## Requirements
- Have Unity 2020 (might work on 2021 too) installed and a starter project correctly configured (I used the microplatform template for the tests).
- Have Nodejs installed.

## Modify the Unity project

### General steps
1. Download this Github repository
2. Import Assets-SocketIO-Unity.unitypackage file in your Unity project
3. Go to Assets/Scripts/Demo/Demo.cs and change the following line to make it point to your server URL. It might be a localhost if you develop locally (you can check the server template app.js)
```
s = SocketIo.establishSocketConnection("URL of your server goes here");
```
4. Add the Demo script as a Component to a persistent Gameobject, for example the Camera. Alternatively, you can use the [https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html](DontDestroyOnLoad) approach.

### To enable WebGL use

1. Go to Edit / Project Settings / Player / WebGL settings / Publishing Settings and tick the "Decompression fallback" box
2. Import WebGLTemplate-SocketIO-Unity.unitypackage file in your Unity project
3. Go to Edit / Project Settings / Player / WebGL settings / Resolution and Presentation and chose the 'Custom' WebGL template that adds socketio functionality to your index.html game page.

Note that in WebGL mode, the socket won't work when you are in the editor. You need to build and run to make it work.

### To enable Standalone use
Go to Edit / Project Settings / Player / Settings for PC, MAC, Linux standalone / Other Settings and make sure that Api Compatibility Level is set to .NET 4.x in the Configuration section

Note that the Standalone use has only been tested under Windows.
Universal Windows Platform builds should also work.

## Run an ExpressJS server: WebGL builds

To run the game with an ExpressJS server, build your WebGL in a subfolder (e.g. 'game') of a folder that your will use for the webapp (e.g. 'server'), hence creating a hierarchy server/game.
Put the app.js file and the package.json files in the 'server' folder as shown here.
Open a command line and type
```
npm install
node app.js
```
Navigate to http://localhost:3000

You should see the game loading and a confirmation that the socket is well connected in your terminal.

You can start to mess around!

Note that the app.js file contains commented methods to send your data to MongoDB (either local or cloud as a function of NODE_ENV variable)