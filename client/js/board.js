class Board {
    constructor(tileList) {
        this.tiles = [];

        this.tiles[0] = new Tile({x: 125, y: 118, width: 50, height: 44}, tileList[0]);

        this.tiles[1] = new Tile({x: 75, y: 118, width: 50, height: 44}, tileList[1]);
        this.tiles[2] = new Tile({x: 150, y: 74, width: 50, height: 44}, tileList[2]);
        this.tiles[3] = new Tile({x: 175, y: 118, width: 50, height: 44}, tileList[3]);
        this.tiles[4] = new Tile({x: 150, y: 162, width: 50, height: 44}, tileList[4]);
        this.tiles[5] = new Tile({x: 100, y: 162, width: 50, height: 44}, tileList[5]);
        this.tiles[6] = new Tile({x: 100, y: 74, width: 50, height: 44}, tileList[6]);

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

        this.vertexs = [];
     
        this.vertexs[0] = new Vertex({x: 100, y: 103.5, radius: 10});
        this.vertexs[1] = new Vertex({x: 125, y: 90, radius: 10});
        this.vertexs[2] = new Vertex({x: 150, y: 103.5, radius: 10});

        this.vertexs[3] = new Vertex({x: 150, y: 132, radius: 10});
    }

    draw(ctx) {
        var i = 0;
        for (i = 0; i < this.tiles.length; i++) { 
            this.tiles[i].draw(ctx);
        }
        for (i = 0; i < this.vertexs.length; i++) {
            this.vertexs[i].draw(ctx);
        }
    }

    onMouseMove(pos) {
        var i = 0;
        for (i = 0; i < this.vertexs.length; i++) {
            var distance = Math.sqrt( Math.pow(this.vertexs[i].pos.x - pos.x,2) + Math.pow(this.vertexs[i].pos.y - pos.y,2));
            if (distance < this.vertexs[i].pos.radius) {
                this.vertexs[i].focus = true;
            } else {
                this.vertexs[i].focus = false;
            }
        }
    }

    onMouseClick() {
        var i = 0;
        for (i = 0; i < this.vertexs.length; i++) {
            if (this.vertexs[i].focus == true) {
                console.log("Editing vertex " + i);
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