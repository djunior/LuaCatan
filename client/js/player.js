class Player {
    constructor(playerId) {
        this.id = playerId;

        if (playerId == 1)
            this.color = '#002DB4';
        else if (playerId == 2)
            this.color = '#FF0000';
        else if (playerId == 3)
            this.color = '#FFFFFF';
        else if (playerId == 4)
            this.color = '#FF7F7F';
        else
            this.color = '#000000';
    }
}