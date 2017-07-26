class ClientAPI {
    constructor(onReady,onMessageReceived) {
        this.socket = new SocketClient("127.0.0.1","35465",onReady,onMessageReceived);
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
}