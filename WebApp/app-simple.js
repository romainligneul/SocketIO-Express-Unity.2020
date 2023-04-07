const express = require("express");
var compression = require('compression')
const path = require('path');
const app = express();
const port = 3000;


const server = require('http').Server(app);

const io = require("socket.io")(server, {
	cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
	console.log("Got connection!");
	
	socket.on('testEvent', (data) => {
		console.log("Received test Event " + data);
	});
	
	soc = socket;
	socket.emit("testEvent", "Sending");
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
