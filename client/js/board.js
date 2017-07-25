class Board {
    constructor(tileList) {
        this.tiles = [];

        var centralPos = new Hexagon(400, 300, 100, 88);

        var tileMap = [
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

        this.tiles[0] = new Tile(centralPos, tileList[0]);

        for (var i = 0; i < tileMap.length; i++) {
            this.tiles[i+1] = new Tile(centralPos.add(tileMap[i].x,tileMap[i].y),tileList[i+1]);
        }

        // this.tiles[1] = new Tile(centralPos.add( centralPos.width/2, -centralPos.height), tileList[1]);
        // this.tiles[2] = new Tile(centralPos.add( centralPos.width, 0), tileList[2]);
        // this.tiles[3] = new Tile(centralPos.add( centralPos.width/2, centralPos.height), tileList[3]);
        // this.tiles[4] = new Tile(centralPos.add(-centralPos.width/2, centralPos.height), tileList[4]);
        // this.tiles[5] = new Tile(centralPos.add(-centralPos.width/2, -centralPos.height), tileList[5]);
        // this.tiles[6] = new Tile(centralPos.add(-centralPos.width,0), tileList[6]);

        // this.tiles[0] = new Tile({x: 75, y: 30, width: 50, height: 44}, "");
        // this.tiles[1] = new Tile({x: 125, y: 30, width: 50, height: 44}, "");
            // this.tiles[2] = new Tile({x: 175, y: 30, width: 50, height: 44}, "");

        // this.tiles[3] = new Tile({x: 50, y: 74, width: 50, height: 44}, "");
        // this.tiles[6] = new Tile({x: 200, y: 74, width: 50, height: 44},"");

        // this.tiles[7] = new Tile({x: 25, y: 118, width: 50, height: 44}, "");
        
        
        // this.tiles[11] = new Tile({x: 225, y: 118, width: 50, height: 44},"");

        // this.tiles[12] = new Tile({x: 50, y: 162, width: 50, height: 44},"");
        // 
        // 
        // this.tiles[15] = new Tile({x: 200, y: 162, width: 50, height: 44},"");

        // this.tiles[16] = new Tile({x: 75, y: 206, width: 50, height: 44},"");
        // this.tiles[17] = new Tile({x: 125, y: 206, width: 50, height: 44},"");
        // this.tiles[18] = new Tile({x: 175, y: 206, width: 50, height: 44},"");

        var size = centralPos.width/Math.sqrt(3);
        var WSize = size*Math.sin(Math.PI/6);
        var hSize = size*Math.cos(Math.PI/6);

        this.vertex = [];

        for (var i = 0; i < tileList.length; i++) {
            for (var j = 0; j < tileList[i].boardTile.vertex.length; j++) {
                var vId = tileList[i].boardTile.vertex[j].id;
                var centralCircle = new Circle(this.tiles[i].hexagon.x, this.tiles[i].hexagon.y, 10);
                if (! this.vertex[vId-1] || this.vertex[vId-1] == undefined) {
                    switch(j) {
                        case 0:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(-this.tiles[i].hexagon.width/2,-this.tiles[i].hexagon.getWSize()),vId);
                            break;
                        case 1:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(0,-this.tiles[i].hexagon.getSide()),vId);
                            break;
                        case 2:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(this.tiles[i].hexagon.width/2,-this.tiles[i].hexagon.getWSize()),vId);
                            break;
                        case 3:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(this.tiles[i].hexagon.width/2,this.tiles[i].hexagon.getWSize()),vId);
                            break;
                        case 4:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(0,this.tiles[i].hexagon.getSide()),vId);
                            break;
                        case 5:
                            this.vertex[vId-1] = new Vertex(centralCircle.add(-this.tiles[i].hexagon.width/2,this.tiles[i].hexagon.getWSize()),vId);
                            break;
                    }
                }
            }
        }
        
        this.vertex[0] = new Vertex(new Circle(100, 103.5, 10));
        this.vertex[1] = new Vertex(new Circle(125, 90, 10));
        this.vertex[2] = new Vertex(new Circle(150, 103.5, 10));
        this.vertex[3] = new Vertex(new Circle(150, 132, 10));
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
        for (i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i] || this.vertex[i] != undefined)
                if (this.vertex[i].isInside(pos)) {
                    this.vertex[i].focus = true;
                } else {
                    this.vertex[i].focus = false;
                }
        }
    }

    onMouseClick() {
        var i = 0;
        for (i = 0; i < this.vertex.length; i++) {
            if (this.vertex[i] || this.vertex[i] != undefined)
                if (this.vertex[i].focus == true) {
                    console.log("Editing vertex " + i + " id = " + this.vertex[i].id);
                    break;
                }
        }
    }
}

// function Board(ctx) {
//     hexagon(ctx,{x: 75, y: 30, width: 50, height: 44})
//     hexagon(ctx,{x: 125, y: 30, width: 50, height: 44})
//     hexagon(ctx,{x: 175, y: 30, width: 50, height: 44})

//     hexagon(ctx,{x: 50, y: 74, width: 50, height: 44})
//     hexagon(ctx,{x: 100, y: 74, width: 50, height: 44})
//     hexagon(ctx,{x: 150, y: 74, width: 50, height: 44})
//     hexagon(ctx,{x: 200, y: 74, width: 50, height: 44})

//     hexagon(ctx,{x: 25, y: 118, width: 50, height: 44});
//     hexagon(ctx,{x: 75, y: 118, width: 50, height: 44});
//     hexagon(ctx,{x: 125, y: 118, width: 50, height: 44});
//     hexagon(ctx,{x: 175, y: 118, width: 50, height: 44});
//     hexagon(ctx,{x: 225, y: 118, width: 50, height: 44});

//     hexagon(ctx,{x: 50, y: 162, width: 50, height: 44});
//     hexagon(ctx,{x: 100, y: 162, width: 50, height: 44});
//     hexagon(ctx,{x: 150, y: 162, width: 50, height: 44});
//     hexagon(ctx,{x: 200, y: 162, width: 50, height: 44});

//     hexagon(ctx,{x: 75, y: 206, width: 50, height: 44});
//     hexagon(ctx,{x: 125, y: 206, width: 50, height: 44});
//     hexagon(ctx,{x: 175, y: 206, width: 50, height: 44});

// }