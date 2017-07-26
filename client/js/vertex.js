class Vertex {
    constructor(cir,v) {
        this.circle = cir;
        this.focus = false;
        this.id = v.id;
        this.connections = v.connections;

        if (v.element) {
            if (v.element.elementType == "village")
                this.element = new Village(this, new Player(v.element.playerId));
            else if (v.element.elementType == "city")
                this.element = new City(this, new Player(v.element.playerId));
        }
    }

    addElement(obj) {
        this.element = obj;
    }

    draw(ctx) {
        if (this.element && this.element != undefined) {
            this.element.draw(ctx);
        } else
            if (this.focus == true)
                this.circle.draw(ctx);
    }

    isInside(pos) {
        if (this.element && this.element != undefined)
            return this.element.isInside(pos);
        else
            return this.circle.isInside(pos);
    }
}