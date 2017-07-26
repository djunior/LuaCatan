class Board {
    constructor(clientAPI,player,tileList) {
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

        // this.clientAPI.registerHandler("addElement",this.)
    }

    draw(ctx) {
        var i = 0;
        for (i = 0; i < this.tiles.length; i++) { 
            this.tiles[i].draw(ctx);
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

    addElementToVertex(vertexId,player) {
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
            if (! vertex.element ) {
                vertex.addElement(new Village(vertex,player));
            } else if(vertex.element.getType() == "village") {
                vertex.addElement(new City(vertex,player));
            }
        }
    }

    onMouseClick(pos) {
        var i = 0;
        for (i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i] || this.vertex[i] != undefined) {
                if (this.vertex[i].isInside(pos)) {
                    this.addElementToVertex(this.vertex[i].id,this.player);
                    if (this.vertex[i].element)
                        clientAPI.addElement(this.player.id,this.vertex[i].id,this.vertex[i].element.getType());
                    return true;
                }
            }
        }
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
