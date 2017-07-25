function hexagon(ctx,pos, color, text) {
    // hexagon
    var numberOfSides = 6;
    
    var size = pos.width/Math.sqrt(3);

    ctx.beginPath();
    ctx.moveTo (pos.x +  size * Math.cos(Math.PI/2), pos.y +  size *  Math.sin(Math.PI/2));

    for (var i = 1; i <= numberOfSides;i += 1) {
        ctx.lineTo (pos.x + size * Math.cos(Math.PI/2 + i * 2 * Math.PI / numberOfSides), pos.y + size * Math.sin(Math.PI/2 + i * 2 * Math.PI / numberOfSides));
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();

    console.log("Writing " + text);
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text,pos.x,pos.y);
}

function circle(ctx,pos) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI, false);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';

    ctx.stroke();
}