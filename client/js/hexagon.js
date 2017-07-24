function hexagon(ctx,pos) {
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
}