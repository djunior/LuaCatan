class Hexagon {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    add(x,y) {

        return new Hexagon(this.x + x,this.y + y,this.width,this.height);

    }

    getSide() {
        return this.width/Math.sqrt(3);
    }

    getWSize() {
        return this.getSide()*Math.sin(Math.PI/6);
    }

    getHSize() {
        return this.getSide()*Math.cos(Math.PI/6);
    }

    draw(ctx, color, text) {
        // hexagon
        var numberOfSides = 6;
        
        var side = this.getSide();

        ctx.beginPath();
        ctx.moveTo (this.x +  side * Math.cos(Math.PI/2), this.y +  side *  Math.sin(Math.PI/2));

        for (var i = 1; i <= numberOfSides;i += 1) {
            ctx.lineTo (this.x + side * Math.cos(Math.PI/2 + i * 2 * Math.PI / numberOfSides), this.y + side * Math.sin(Math.PI/2 + i * 2 * Math.PI / numberOfSides));
        }

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(text,this.x,this.y);
    }
}

class Circle {
    constructor(x,y,r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }

    add(x,y) {

        var obj = new Circle(this.x,this.y,this.radius);
        obj.x += x;
        obj.y += y;

        return obj;

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';

        ctx.stroke();
    }
}
