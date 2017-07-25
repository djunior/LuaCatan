class Vertex {
    constructor(cir,vertexId) {
        this.circle = cir;
        this.focus = false;
        this.id = vertexId
    }

    draw(ctx) {
        if (this.focus == true)
            this.circle.draw(ctx);
    }

    isInside(pos) {
        var distance = Math.sqrt( Math.pow(this.circle.x - pos.x,2) + Math.pow(this.circle.y - pos.y,2));
        return distance < this.circle.radius;
    }
}