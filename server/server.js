#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var shine = require('./moonshine.js')

var server = http.createServer(function(request, response) {
});

server.listen(1337, function() {
    console.log((new Date()) + ' Server is listening on port 1337');
});

wsServer = new WebSocketServer({
    httpServer: server,
});

var gameId = 0;

function newGame() {
    console.log("NewGame! loading vm");
    var vm = shine.VM();

    console.log("NewGame! loading script");
    vm.load("../game/main.lua.json");

    console.log("NewGame! done!");

    return ++gameId;
}

function parseRequest(message) {
    var obj = JSON.parse(message);

    var response = {id: obj.id};

    switch(obj.request) {
        case "getBoard":
            break;
        case "newGame":
            response.gameId = newGame();
            break;
        default:
            response.error = "Request not identified!";
            break;
    }

    return response;
}

wsServer.on('request', function(request) {

    console.log("Socket server received request");

    var connection = request.accept(null, request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);

            var response = parseRequest(message.utf8Data);

            var responseStr = JSON.stringify(response);
            console.log("Sending " + responseStr)

            connection.sendUTF(responseStr);
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});