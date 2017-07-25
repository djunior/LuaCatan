class ClientAPI {
    constructor(onReady) {
        this.socket = new SocketClient("127.0.0.1","1337",onReady);
    }

    newGame(callback) {
        this.socket.send("newGame",callback);
    }

    getBoard(callback) {
        this.socket.send("getBoard",callback);
    }
}