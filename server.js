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

var names = [];

io.sockets.on("connection", function(socket){
	console.log("user connected");
	
	socket.emit("share names", names);
	
	socket.on("share name", function(name){
		socket.userId = name;
		names.push(name);
		
		socket.broadcast.emit("name update", name);
	});

	socket.on("chat message", function(msg){
		io.emit("message", msg);
	});

	socket.on("disconnect", function(){
		var name = socket.userId;
		var nameIndex = names.indexOf(name)
		names.splice(nameIndex, 1);
		socket.broadcast.emit("remove name", name);
	});

});

http.listen(8000);