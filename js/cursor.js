var Cursor = function (options) {
    var self = this;

    this.row = options.row;
    this.col = options.col;

    this.place = function (coords) {
        // update the cursor's position
        this.row = coords.row;
        this.col = coords.col;
        // console.log('placing the cursor...');
        $(document).trigger('cursorPlaced', coords);
    };

    this.definePath = function (direction, distance) {
        var i, pitStops = [];

        switch (direction) {
            case 'n':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col,
                        row: this.row - i
                    });
                }
                break;
            case 's':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col,
                        row: this.row + i
                    });
                }
                break;
            case 'e':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col + i,
                        row: this.row
                    });
                }
                break;
            case 'w':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col - i,
                        row: this.row
                    });
                }
                break;
        }
        this.visitTiles(pitStops);
    };

    this.visitTiles = function(tilesToVisit) {
        tilesToVisit.forEach(function (tile) {
            self.place(tile);
        });
        $(document).trigger('cursorEnded', tilesToVisit[tilesToVisit.length - 1]);
    };
};

module.exports = Cursor;