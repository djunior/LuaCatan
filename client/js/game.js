var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function draw(board, e) {
    var pos = getMousePos(canvas, e);
    if (board.onMouseMove(pos)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        board.draw(ctx);
    }
}

function onClick(board, e) {
    var pos = getMousePos(canvas, e);
    if (board.onMouseClick(pos)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        board.draw(ctx);
    }
}

function ResourceTray(clientAPI){
    this.clientAPI = clientAPI;
    this.oreCount = ko.observable(0);
    this.clayCount = ko.observable(0);
    this.wheatCount = ko.observable(0);
    this.sheepCount = ko.observable(0);
    this.woodCount = ko.observable(0);

    this.updateResources = function(resourceList) {
        console.log("Updating resources " + JSON.stringify(resourceList));
        if (resourceList) {
            if (resourceList.Wheat)
                this.wheatCount(resourceList.Wheat);

            if (resourceList.Wood)
                this.woodCount(resourceList.Wood);

            if (resourceList.Clay)
                this.clayCount(resourceList.Clay);

            if (resourceList.Sheep)
                this.sheepCount(resourceList.Sheep);

            if (resourceList.Ore)
                this.oreCount(resourceList.Ore);
        }
    }
    
    this.setPlayer = (player) => { 
        this.player = player; 
    }

    this.rollDice = () => {
        this.clientAPI.rollDice(this.player.id,(response) => {
            console.log("Response: " + JSON.stringify(response));
            if (response.resources)
                this.updateResources(response.resources);
        });
    }

}

var clientAPI = new ClientAPI();
var resourceTray = new ResourceTray(clientAPI);

clientAPI.connect(() => {
    clientAPI.newGame(function(gameInfo){
        console.log("GameInfo:" + JSON.stringify(gameInfo));
        var player = new Player(gameInfo.playerId);

        resourceTray.setPlayer(player);

        clientAPI.getBoard(function (tileList) {
            var board = new Board(clientAPI,player,tileList,resourceTray);
            board.draw(ctx);

            window.addEventListener('mousemove', (e) => { draw(board,e); }, false);
            window.addEventListener('click', (e) => { onClick(board,e); }, false);

            clientAPI.registerHandler("addElement",(request) => {
                console.log("Received request " + JSON.stringify(request));
                board.addElementToVertex(request.vertexId,new Player(request.playerId));
                board.draw(ctx);
            });
        });

        clientAPI.registerHandler("diceRolled",(request) => {
            console.log("Received request " + JSON.stringify(request));
            
            if ((request.firstDice + request.secondDice) == 7) {
                // player.
            } else {
                // player.addResources(request.resources);

                if (request.resources)
                    resourceTray.updateResources(request.resources);

            }
        });
    });
}, function () {});

ko.applyBindings(resourceTray);
