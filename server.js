var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var socket = require("socket.io");
var io = socket.listen(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/chat.html'));
});

app.use(express.static(path.join(__dirname, "public")));

var names = [""];

io.sockets.on("connection", function(socket){
	console.log("user connected");
	socket.emit("share names", names);
	socket.on("share name", function(name){
		names.push(name);
	});

	socket.on("chat message", function(msg){
		console.log("chat message: " + msg);

		io.emit("message", msg);
	});
});

http.listen(8000);