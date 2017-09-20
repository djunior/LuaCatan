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

function onClick(board, e, state) {
    var pos = getMousePos(canvas, e);
    if (board.onMouseClick(pos,state)) {
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

    this.state = "";
    
    this.dice1Path = ko.observable("images/dice-six-faces-six.png");
    this.dice2Path = ko.observable("images/dice-six-faces-six.png");

    this.getDicePath = function(diceNumber) {
        switch(diceNumber) {
            case 1:
                return "images/dice-six-faces-one.png";
            case 2:
                return "images/dice-six-faces-two.png";
            case 3:
                return "images/dice-six-faces-three.png";
            case 4:
                return "images/dice-six-faces-four.png";
            case 5:
                return "images/dice-six-faces-five.png";
            case 6:
            default:
                return "images/dice-six-faces-six.png";
        }
    }

    this.updateDices = function(dice1,dice2) {
        this.dice1Path(this.getDicePath(dice1));
        this.dice2Path(this.getDicePath(dice2));
    }

    this.updateResources = function(resourceList) {
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
            this.updateDices(response.firstDice,response.secondDice);
            if (response.resources)
                this.updateResources(response.resources);
        });
    }

    this.addRoad = () => {
        this.state = "addRoad";
    }

    this.addVillage = () => {
        this.state = "addVillage";
    }

    this.addCity = () => {
        this.state = "addCity";
    }

    this.endTurn = () => {
        this.clientAPI.endTurn(this.player.id);
    }

    this.buyDevelopmentCard = () => {
        
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

            c.addEventListener('mousemove', (e) => { draw(board,e); }, false);
            c.addEventListener('click', 
                (e) => { 
                    console.log("Registered click, state = " + resourceTray.state);
                    onClick(board,e,resourceTray.state); 
                }
            ,false);

            clientAPI.registerHandler("addElement",(request) => {
                console.log("Received addElement: " + JSON.stringify(request));
                board.addElementToVertex(request.vertexId,new Player(request.playerId),request.elementType);
                board.draw(ctx);
            });

            clientAPI.registerHandler("addRoad",(request) => {
                console.log("Add Road callback:" + JSON.stringify(request));
                board.addRoad(request.vertexFromId,request.vertexToId,new Player(request.playerId));
                board.draw(ctx);
            });
        });

        clientAPI.registerHandler("diceRolled",(request) => {
            console.log("Dice rolled callback:" + JSON.stringify(request));
            resourceTray.updateDices(response.firstDice,response.secondDice);
            if ((request.firstDice + request.secondDice) == 7) {
            } else {
                if (request.resources)
                    resourceTray.updateResources(request.resources);

            }
        });
    });
}, function () {});

ko.applyBindings(resourceTray);
