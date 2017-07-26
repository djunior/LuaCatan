class ClientAPI {
    constructor(onReady) {
        var o = this
        this.callbackHandler = {};
        this.socket = new SocketClient("10.10.1.96","35465",onReady,(message) => {
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
            elementType: elementType,
            vertexId: vertexId,
        });
    }

    rollDice(callback) {
        this.socket.send("rollDice",callback);
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