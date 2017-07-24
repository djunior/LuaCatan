class Board {
    constructor() {
        this.tiles = [];

        this.tiles[0] = new Tile({x: 75, y: 30, width: 50, height: 44}, "");
        this.tiles[1] = new Tile({x: 125, y: 30, width: 50, height: 44}, "");
        this.tiles[2] = new Tile({x: 175, y: 30, width: 50, height: 44}, "");

        this.tiles[3] = new Tile({x: 50, y: 74, width: 50, height: 44}, "");
        this.tiles[4] = new Tile({x: 100, y: 74, width: 50, height: 44},"");
        this.tiles[5] = new Tile({x: 150, y: 74, width: 50, height: 44},"");
        this.tiles[6] = new Tile({x: 200, y: 74, width: 50, height: 44},"");

        this.tiles[7] = new Tile({x: 25, y: 118, width: 50, height: 44}, "");
        this.tiles[8] = new Tile({x: 75, y: 118, width: 50, height: 44}, "");
        this.tiles[9] = new Tile({x: 125, y: 118, width: 50, height: 44},"");
        this.tiles[10] = new Tile({x: 175, y: 118, width: 50, height: 44},"");
        this.tiles[11] = new Tile({x: 225, y: 118, width: 50, height: 44},"");

        this.tiles[12] = new Tile({x: 50, y: 162, width: 50, height: 44},"");
        this.tiles[13] = new Tile({x: 100, y: 162, width: 50, height: 44},"");
        this.tiles[14] = new Tile({x: 150, y: 162, width: 50, height: 44},"");
        this.tiles[15] = new Tile({x: 200, y: 162, width: 50, height: 44},"");

        this.tiles[16] = new Tile({x: 75, y: 206, width: 50, height: 44},"");
        this.tiles[17] = new Tile({x: 125, y: 206, width: 50, height: 44},"");
        this.tiles[18] = new Tile({x: 175, y: 206, width: 50, height: 44},"");


    }

    draw(ctx) {
        var i = 0;
        for (i = 0; i < this.tiles.length; i++) { 
            this.tiles[i].draw(ctx);
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