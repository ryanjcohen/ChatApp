var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require("path");
var io = require("socket.io")(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/chat.html'));
});

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket){
	console.log("user connected");
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
});

http.listen(8000);