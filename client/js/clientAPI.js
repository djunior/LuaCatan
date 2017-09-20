class ClientAPI {
    constructor() {
        this.callbackHandler = {};
    }

    connect(onReady) {
        var o = this
        this.socket = new SocketClient("127.0.0.1","35465",onReady,(message) => {
            if (o.callbackHandler[message.command] && o.callbackHandler[message.command] != undefined) {
                o.callbackHandler[message.command](message);
            }
        });
    }

    newGame(callback) {
        this.socket.send("newGame",callback);
    }

    getBoard(callback) {
        this.socket.send("getBoard",callback);
    }

    addElement(playerId,vertexId,elementType) {
        this.socket.send("addElement",null,{
            playerId: playerId,
            vertexId: vertexId,
            elementType: elementType,
        });
    }

    addRoad(playerId,vertexFromId,vertexToId) {
        this.socket.send("addRoad",null,{
            playerId: playerId,
            vertexFromId: vertexFromId,
            vertexToId: vertexToId
        });
    }

    rollDice(playerId,callback) {
        this.socket.send("rollDice",callback,{playerId: playerId});
    }

    endTurn(playerId) {
        this.socket.send("endTurn",null,{playerId: playerId});
    }

    moveThief(playerId,callback) {
        this.socket.send("moveThief",callback,{playerId: playerId});
    }

    registerHandler(command,callback) {
        this.callbackHandler[command] = callback;
    }

}