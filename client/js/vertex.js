class Vertex {
    constructor(pos) {
        this.pos = pos;
        this.focus = false;
    }

    draw(ctx) {
        if (this.focus == true)
            circle(ctx,this.pos);
    }
}