/*var express= require('express');
var app=express();
var server = require('http').createServer(app);
var io=require('socket.io').listen(server);
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT || 3000);
require('./config')(app,io);
require('./routes')(app,io);
