class Village {
    constructor(obj,player) {
        this.x = obj.circle.x;
        this.y = obj.circle.y;
        this.focus = false;
        this.player = player;
        this.circle = new Circle(this.x,this.y,15);
    }

    getType() {
        return "village";
    }

    isInside(pos) {
        return this.circle.isInside(pos);
    }

    draw(ctx) {
        this.circle.draw(ctx,this.player.color);
    }
}

class City {
    constructor(obj,player) {
        this.x = obj.circle.x;
        this.y = obj.circle.y;
        this.focus = false;
        this.player = player;
        this.circle = new Circle(this.x,this.y,20);
        this.innerCircle = new Circle(this.x,this.y,10);
    }

    getType() {
        return "city";
    }

    isInside(pos) {
        return this.circle.isInside(pos);
    }

    draw(ctx) {
        this.circle.draw(ctx,this.player.color);
        this.innerCircle.draw(ctx);
    }
}

class Road {

}