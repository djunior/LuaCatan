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
            console.log("onMessageReceived");
            var obj = JSON.parse(msg.data);
            console.log("Received obj: " + obj.id + " " + obj.response);
            console.log("this.callbackMap: " + o.callbackMap);
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
        console.log("Sending " + request + " " + callback)
        var message = {
            id: (++this.callbackUniqueId).toString(),
            request: request
        }
        
        if (body != undefined)
            message.body = body;

        console.log("Message.id = " + message.id + " " + typeof message.id);
        this.callbackMap[message.id] = callback;

        console.log("callbackMap " + this.callbackMap);
        console.log("callbackMap[1] " + this.callbackMap[message.id]);
        this.socket.send(JSON.stringify(message));
    }
}