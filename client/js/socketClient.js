class SocketClient {
    
    constructor(server,port,onReady, onMessageReceived) {
        this.server = server;
        this.port = port;

        this.callbackMap = {};
        this.callbackUniqueId = 0;

        this.openConnection(onReady,onMessageReceived);
    }

    openConnection (onReady,onMessageReceived) {
        this.socket = new WebSocket("ws://" + this.server + ":" + this.port,"luacatan");
        this.socket.onopen = onReady;
        var o = this;
        this.socket.onmessage = function (msg) {
            var obj = JSON.parse(msg.data);
            if (obj)
                if (o.callbackMap[obj.id] != undefined) {
                    o.callbackMap[obj.id](obj.response);
                    o.callbackMap[obj.id] = undefined;
                } else {
                    if (onMessageReceived != undefined)
                        onMessageReceived(obj);
                }
        }
    }

    onMessageReceived(msg) {

    }

    send (request, callback, body) {
        var message = {
            id: (++this.callbackUniqueId).toString(),
            request: request
        }
        
        if (body != undefined)
            message.body = body;

        this.callbackMap[message.id] = callback;
        this.socket.send(JSON.stringify(message));
    }
}