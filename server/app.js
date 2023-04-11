const express = require("express");
var compression = require('compression')
require('dotenv').config()

//var mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const app = express();
const port = 3000;

app.use(compression())

app.use(express.static(path.join(__dirname, 'game/')));

app.get('/', (req, res) => {
  res.header('Content-Encoding', 'gzip');
  res.sendFile(path.join(__dirname, + '/game/index.html'));
})

const server = require('http').Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ["Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time"],
    methods: ["GET, POST, OPTIONS"]
  }
});

///// DATABASE

/*
// loose schema for saving the data
var mainSchema = new mongoose.Schema({}, {
  strict: false,
  collection: 'main'
});
var mainModel = mongoose.model('Main', mainSchema);

// connect to MongoDB
if (process.env.NODE_ENV === 'development') {
  // Define the development db
  mongoose.connect('mongodb://127.0.0.1/YOURDBNAMEHERE');
} else if (process.env.NODE_ENV === 'production') {
  // Define the production db
  mongoose.connect(process.env.MONGODB_URI);
};

// open the database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('database opened');
});
*/

/// WEBSOCKET Socket.io

// open the socket 
io.on('connection', (socket) => {

  console.log("Connected Socket");
  // send back a confirmation to Unity (not useful in production)
  socket.emit("connectionstatus", "connected");

  // define a simple callback
  socket.on('ActionEvent', (data) => {
    console.log("ActionEvent received " + data);
    /*
    mainModel.create({
      "ActionEvent": data
    });
    */
  });

  socket.on('connectionstatus', (data) => {
    console.log('URL: ' + data);
  });

  //soc = socket;

});

/// LAUNCH SERVER

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
