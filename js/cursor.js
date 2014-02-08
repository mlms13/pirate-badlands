var Cursor = function (options) {
    this.row = options.row;
    this.col = options.col;

    this.place = function (coords, tile) {
        $('.cursor').removeClass('cursor');
        tile.visited = true;
        tile.$el.addClass('cursor');

        // update the cursor's position
        this.row = coords.row;
        this.col = coords.col;
    };

    this.move = function (row, col, value, tiles) {
        // check to see if we're moving left
        if (this.col > col) {
            if (this.col - value < 0) {
                return false;
            } else {
                // move the cursor to the left
                this.place({row: this.row, col: this.col - value}, tiles[this.row][this.col - value]);
            }
        } else if (this.col < col) {
            if (this.col + value > tiles[0].length - 1) {
                return false;
            } else {
                // move the cursor to the right
                this.place({row: this.row, col: this.col + value}, tiles[this.row][this.col + value]);
            }
        }

        // check to see if we're moving up
        if (this.row > row) {
            if (this.row - value < 0) {
                return false;
            } else {
                // move the cursor up
                this.place({row: this.row - value, col: this.col}, tiles[this.row - value][this.col]);
            }
        } else if (this.row < row) {
            if (this.row + value > tiles.length - 1) {
                return false;
            } else {
                // move the cursor to the down
                this.place({row: this.row + value, col: this.col}, tiles[this.row + value][this.col]);
            }
        }
    };
};

module.exports = Cursor;