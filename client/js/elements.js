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
    constructor(vertexFrom,vertexTo,player,roadId) {
        this.x = vertexFrom.circle.x;
        this.y = vertexFrom.circle.y;

        this.vertex = [vertexFrom.id,vertexTo.id];

        this.roadId = roadId;

        this.player = player;

        var width = Math.sqrt(Math.pow(this.x - vertexTo.circle.x,2) + Math.pow(this.y - vertexTo.circle.y,2));
        var height = 10;

        var x_diff = this.x - vertexTo.circle.x;

        var rad = Math.acos((this.x - vertexTo.circle.x) / width);

        if (this.y < vertexTo.circle.y) {
            rad *= -1;
        }

        this.rect = new Rect(this.x,this.y,width,height,rad);
    }

    getType() {
        return "road";
    }

    draw(ctx) {
        this.rect.draw(ctx,this.player.color);
    }
}