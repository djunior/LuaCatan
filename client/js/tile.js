class Tile {
    constructor(hex, info) {
        console.log("info:" + JSON.stringify(info));
        this.hexagon = hex;
        this.info = info;
    }

    draw (ctx) {
        var color = ""
        switch(this.info.tileType) {
            case "Ore":
                color = "#7D7F86";
                break;
            case "Wheat":
                color = "#FFD600";
                break;
            case "Wood":
                color = "#055F00";
                break;
            case "Clay":
                color = "#D35E00";
                break;
            case "Sheep":
                color = "#599532";
                break;
            case "Desert":
                color = "#AFAC63";
                break;
        }
        this.hexagon.draw(ctx, color, this.info.tileNumber);
    }
}