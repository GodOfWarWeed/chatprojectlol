var express= require('express')();
var app= express();
var port= process.env.PORT || 3000;
var io = require('socket.io').listen(app.listen(port));


require('./routes')(app,io);
require('./config')(app,io);