class Tile {
    constructor(pos, type) {
        this.pos = pos;
        this.type = type;
    }

    draw (ctx) {
        hexagon(ctx, this.pos);
    }
}