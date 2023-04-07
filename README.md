# SocketIO-Express-Unity.2020
An updated version of the Socket.io protocol for Unity (2020) compatible with WebGL builds

The history of SocketIO and Unity is a succession of incremental updates and small projects that somehow stopped when Unity decided to incorporate a cheap (but still not free) SocketIO plugin in their store.

Other repos exists, but I only found one which provided a tool compatible with WebGL (on top of other platforms):
https://github.com/KyleDulce/Unity-Socketio

Since that project is not actively maintained it required a workaround to make it work with new versions of Unity. 

Therefore, the present project is mainly a fork of Kyle's repo, and with a few improvements and more detailed/complete explanations.

## Requirements
- Have Unity 2020 (might work on 2021) installed and a starter project correctly configured (I used the microplatform template for the tests).
- Have Nodejs installed.

## Modify the Unity project

- first of all, if WebGL is to be used with Nodejs, it is easier to activate the "Decompression fallback" (Edit->Project Settings->Player->Publication Settings: tick the box)
- create (if it does not exist) a Plugins folder in Assets. Copy-paste the folder 'Unity-SocketIO' of this repository in it.
- in the folder Scripts (still in Assets), copy-paste the folder SocketIO-Scripts.
- copy the folder SocketIO-Demo directly in the Scripts folder itself. The Demo.cs contained in this folder is where you will setup the callbacks associated with socket events (both in and out)
- copy the folder WebGLTemplates directly in the Assets folder itself
- select the embedded template for use by the WebGL build process (Edit->Project Settings->Player->WebGL->Resolution and presentation: select 'Custom')

In theory Unity should be properly configured at this stage. You can run the command 'Build and Run' after switching to WebGL, to see whether everything works well. Unity will ask you to select an output folder. Create a folder for your webapp (e.g. 'WebApp') and inside create a folder with the name of your game (e.g. 'FirstWebGame'). Select this second folder for the build.

## Run the ExpressJS server

Copy app.js and package.json files into WebApp (or whatever name you chose for that top level folder).

If you have changed the name of your build folder, change 'FirstWebGame' accordingly in the following lines:

´´´
app.use(express.static(path.join(__dirname, 'FirstWebGame')));

app.get('/', (req, res) => {
  res.header('Content-Encoding', 'gzip');
  res.sendFile(path.join(__dirname, + '/FirstWebGame/index.html'));
})
´´´

Open a terminal and type

´´´
npm install
node app.js
´´´

Navigate to http://localhost:3000

You should see a confirmation that the socket is well connected in your terminal.

You can start to mess around!




