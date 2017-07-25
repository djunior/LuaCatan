class ClientAPI {
    constructor(onReady) {
        this.socket = new SocketClient("10.10.1.96","1337",onReady);
    }

    newGame(callback) {
        this.socket.send("newGame",callback);
    }

    getBoard(callback) {
        this.socket.send("getBoard",callback);
    }
}