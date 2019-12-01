var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require("socket.io");

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/chat.html'));
});

app.use(express.static(path.join(__dirname, "public")));

var socket = io(http);

socket.on("connection", socket =>{
	console.log("user connected");

	socket.on("chat message", function(msg){

		console.log("chat message: " + msg);

		socket.emit("chat message", msg);
	});
});

http.listen(8000);