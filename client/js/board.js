class Board {
    constructor(clientAPI,player,tileList,resourceTray) {

        this.resourceTray = resourceTray;

        this.clientAPI = clientAPI;

        this.player = player;

        this.tiles = [];

        var centralPos = new Hexagon(400, 300, 100, 88);

        this.thiefIndex = 0;

        var tileMap = [
            //Central
            {x: 0, y: 0},

            // Inner circle
            {x: -centralPos.width/2, y: -centralPos.height},
            {x: centralPos.width/2, y: -centralPos.height},
            {x: centralPos.width, y: 0},
            {x: centralPos.width/2, y: centralPos.height},
            {x: -centralPos.width/2, y: centralPos.height},
            {x: -centralPos.width, y: 0},

            // Outer circle
            {x: -3*centralPos.width/2, y: -centralPos.height},
            {x: -centralPos.width, y: -2*centralPos.height},
            {x: 0, y: -2*centralPos.height},
            {x: centralPos.width, y: -2*centralPos.height},
            {x: 3*centralPos.width/2, y: -centralPos.height},
            {x: 2*centralPos.width, y: 0},
            {x: 3*centralPos.width/2, y: centralPos.height},
            {x: centralPos.width, y: 2*centralPos.height},
            {x: 0, y: 2*centralPos.height},
            {x: -centralPos.width, y: 2*centralPos.height},
            {x: -3*centralPos.width/2, y: centralPos.height},
            {x: -2*centralPos.width, y: 0},

        ];

        for (var i = 0; i < tileMap.length; i++) {
            this.tiles[i] = new Tile(centralPos.add(tileMap[i].x,tileMap[i].y),tileList[i]);
            if (tileList[i].tileType == "Desert") {
                this.thiefIndex = i;
            }
        }

        var size = centralPos.width/Math.sqrt(3);
        var WSize = size*Math.sin(Math.PI/6);
        var hSize = size*Math.cos(Math.PI/6);

        this.vertex = [];

        for (var i = 0; i < tileList.length; i++) {
            for (var j = 0; j < tileList[i].boardTile.vertex.length; j++) {
                var v = tileList[i].boardTile.vertex[j];
                var centralCircle = new Circle(this.tiles[i].hexagon.x, this.tiles[i].hexagon.y, 10);
                if (! this.vertex[v.id-1] || this.vertex[v.id-1] == undefined) {
                    switch(j) {
                        case 0:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(-this.tiles[i].hexagon.width/2,-this.tiles[i].hexagon.getWSize()),v);
                            break;
                        case 1:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(0,-this.tiles[i].hexagon.getSide()),v);
                            break;
                        case 2:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(this.tiles[i].hexagon.width/2,-this.tiles[i].hexagon.getWSize()),v);
                            break;
                        case 3:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(this.tiles[i].hexagon.width/2,this.tiles[i].hexagon.getWSize()),v);
                            break;
                        case 4:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(0,this.tiles[i].hexagon.getSide()),v);
                            break;
                        case 5:
                            this.vertex[v.id-1] = new Vertex(centralCircle.add(-this.tiles[i].hexagon.width/2,this.tiles[i].hexagon.getWSize()),v);
                            break;
                    }
                }
            }
        }

        this.roads = [];
    }

    draw(ctx) {
        var i = 0;
        for (i = 0; i < this.tiles.length; i++) { 
            this.tiles[i].draw(ctx);
        }

        for (i = 0; i< this.roads.length; i++) {
            this.roads[i].draw(ctx);
        }

        for (i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i] || this.vertex[i] != undefined)
                this.vertex[i].draw(ctx);
        }
    }

    onMouseMove(pos) {
        var i = 0;
        var found = false;
        for (i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i] || this.vertex[i] != undefined) {
                if (this.vertex[i].isInside(pos)) {
                    this.vertex[i].focus = true;
                    found = true;
                } else {
                    if (this.vertex[i].focus == true)
                        found = true;
                    this.vertex[i].focus = false;
                }
            }
        }
        return found;
    }

    addElementToVertex(vertexId,player,elementType) {
        console.log("Board addElementToVertex:(" + vertexId + "," + player.id + "," + elementType + ")");
        var add = true;
        var vertex = this.vertex[vertexId-1];
        for (var i = 0; i < vertex.connections.length; i++) {
            var connectedVertex = this.vertex[vertex.connections[i]-1];
            if (connectedVertex.element && connectedVertex.element != undefined) {
                add = false;
                break;
            }
        }

        if (add) {
            if (elementType == "village" ) {
                vertex.addElement(new Village(vertex,player));
            } else if(elementType == "city") {
                vertex.addElement(new City(vertex,player));
            }
        }
    }

    addRoad(vertexIdFrom,vertexIdTo,player) {
        var vertexFrom = this.vertex[vertexIdFrom-1];
        var vertexTo = this.vertex[vertexIdTo-1];

        for (var i = 0; i < vertexFrom.connections.length; i++) {
            var connectedVertex = this.vertex[vertexFrom.connections[i]-1];

            if (connectedVertex.id == vertexTo.id) {
                this.roads[this.roads.length] = new Road(vertexFrom,vertexTo,player,this.roads.length);
                return true;
            }
        }
        return false;
    }

    handleAddRoad(vertexId) {
        if (this.selectedRoadVertexId && this.selectedRoadVertexId != undefined) {
            this.addRoad(this.selectedRoadVertexId, vertexId, this.player);
            this.clientAPI.addRoad(this.player.id,this.selectedRoadVertexId,vertexId);
            this.selectedRoadVertexId = undefined;
        } else {
            this.selectedRoadVertexId = vertexId;
        }
    }

    handleAddVillage(vertexId) {
        var v = this.vertex[vertexId-1];
        if (! v.element || v.element == undefined) {
            this.addElementToVertex(vertexId,this.player,"village");
            this.clientAPI.addElement(this.player.id,vertexId,v.element.getType());
        }
    }

    handleAddCity(vertexId) {
        var  v = this.vertex[vertexId-1];
        if (v.element && v.element != undefined && 
            v.element.getType() == "village" && 
            v.element.player.id == this.player.id) {

            this.addElementToVertex(vertexId,this.player,"city");
            this.clientAPI.addElement(this.player.id,vertexId,v.element.getType());
        }
    }

    onMouseClick(pos,state) {
        var i = 0;

        if (state == "addRoad" || state == "addVillage" || state == "addCity") {
            for (i = 0; i < this.vertex.length; i++) {
                if (this.vertex[i] || this.vertex[i] != undefined) {
                    if (this.vertex[i].isInside(pos)) {

                        if (state == "addVillage") {
                            this.handleAddVillage(this.vertex[i].id);
                        } else if (state == "addCity") {
                            this.handleAddCity(this.vertex[i].id);
                        } else if (state == "addRoad") {
                            this.handleAddRoad(this.vertex[i].id);
                        }
                        return true;
                    }
                }
            }
        }
        else if(state == "moveThief") {
            for (i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].isInside(pos)) {
                    console.log("Clicked on tile " + i);
                    this.tiles[this.thiefIndex].info.hasThief = false;
                    this.tiles[i].info.hasThief = true;
                    this.thiefIndex = i;

                    return true;
                }
            }
        }
    }
}
